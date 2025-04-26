"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import imageBase from "../../../../public/image-placeholder-base.webp"
import Image from "next/image";
import Header from "../../../components/Header"

interface Producto {
    id: number;
    nombre: string;
    precio: number;
    imagen: string | null;
    empresa_id: number;
    descripcion: string;
    plazoDuracionEstimadoMinutos: number;
    disponible: boolean;
  }

interface EmpresaData {
    id: number;
    nombre: string;
    db_name: string;
    logo: string | null;
    descripcion: string | null;
    menu: string | null;
    abierto: boolean;
    hora_cierre: string;
    hora_apertura: string;
    notificarReservaHoras: boolean;
    greenApiInstance: string;
    greenApiInstanceToken: string;
    remaindersHorsRemainder: number;
    apiConfigured: boolean;
    deploy: boolean;
    greenApiConfigured: boolean;
    direccion: string;
    intervaloTiempoCalendario: number;
    timeZone: string;
}

interface EmpresaResponse {
    ok: boolean;
    data: EmpresaData;
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params)
    const router = useRouter()
    const [product, setProduct] = useState<null | Producto>(null)
    const [empresaInfo, setEmpresaInfo] = useState<EmpresaResponse | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchEmpresaInfo = async () => {
            try {
                const response = await fetch('/api/empresa')
                if (!response.ok) {
                    throw new Error('Error al obtener información de la empresa')
                }
                const data = await response.json()
                setEmpresaInfo(data)
            } catch (error) {
                console.error("Error al obtener información de la empresa:", error)
            }
        }

        try {
            const savedProduct = localStorage.getItem("selectedProduct")
            if (savedProduct) {
                const parsedProduct = JSON.parse(savedProduct)
                if (parsedProduct.id == id) {
                    setProduct(parsedProduct)
                    fetchEmpresaInfo()
                } else {
                    router.push("/")
                }
            } else {
                router.push("/")
            }
        } catch (error) {
            console.error("Error al recuperar el producto:", error)
            router.push("/")
        } finally {
            setLoading(false)
        }
    }, [id, router])

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <p className="text-lg text-gray-700">Producto no encontrado</p>
                <Link
                    href="/"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-4 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a productos
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header empresaNombre={empresaInfo?.data.nombre} productoNombre={product?.nombre} />
            
            <div className="container mx-auto px-4 py-8">
                <Link
                    href="/"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a productos
                </Link>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <Image 
                            src={product.imagen || imageBase.src}
                            alt={product.nombre}
                            objectFit="cover"
                            width={300}
                            height={300}
                            className="w-full  object-cover rounded-md"
                        />
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="mb-4">
                            {!product.disponible && (
                                <span className="inline-block bg-red-500 text-white px-3 py-1 text-sm font-medium rounded-full mb-4">
                                    No disponible
                                </span>
                            )}
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.nombre}</h1>
                            <div className="text-2xl font-bold text-gray-800 mb-4">
                                ${product.precio}
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mb-6">
                            <h2 className="text-xl font-semibold mb-2">Descripción</h2>
                            <p className="text-gray-700 mb-4">{product.descripcion}</p>
                        </div>

                        {/* {product.detalles && product.detalles.length > 0 && (
                            <div className="border-t border-gray-200 pt-4">
                                <h2 className="text-xl font-semibold mb-2">Características</h2>
                                <ul className="list-disc pl-5 space-y-1">
                                    {product.detalles.map((detalle, index) => (
                                        <li key={index} className="text-gray-700">
                                            {detalle}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )} */}

                        <div className="mt-8">
                            <button
                                className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
                                    product.disponible ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                                } transition-colors`}
                                disabled={!product.disponible}
                            >
                                {product.disponible ? "Añadir al carrito" : "No disponible"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

