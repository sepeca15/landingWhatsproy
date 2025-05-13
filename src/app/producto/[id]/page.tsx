"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import imageBase from "../../../../public/image-placeholder-base.webp"
import Image from "next/image";
import Header from "../../../components/Header"
import Cart from "../../../components/Cart"
import { useCart } from "../../../context/CartContext"

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
    const [cantidad, setCantidad] = useState(1)
    const { addToCart, items } = useCart()

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

    const handleAddToCart = () => {
        if (!product) return;
        addToCart(product, cantidad);
        setCantidad(1);
    };

    const handleCheckout = () => {
        if (!empresaInfo?.data.greenApiInstance || !empresaInfo?.data.greenApiInstanceToken) {
            alert('No se puede procesar el pedido en este momento. Por favor, intente más tarde.');
            return;
        }

        const message = items.map(item => 
            `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`
        ).join('\n');

        const total = items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        const fullMessage = `¡Hola! Me gustaría hacer el siguiente pedido:\n\n${message}\n\nTotal: $${total}`;

        const whatsappUrl = `https://wa.me/${empresaInfo.data.greenApiInstance}?text=${encodeURIComponent(fullMessage)}`;
        window.open(whatsappUrl, '_blank');
    };

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
            <Header empresaNombre={empresaInfo?.data.nombre} productoNombre={product?.nombre} logo={empresaInfo?.data.logo} abierto={empresaInfo?.data.abierto}/>
            
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
                            className="w-full object-cover rounded-md"
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

                        {product.disponible && (
                            <div className="mt-8 space-y-4">
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-700">Cantidad:</span>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setCantidad(prev => Math.max(1, prev - 1))}
                                            className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
                                        >
                                            -
                                        </button>
                                        <span className="w-8 text-center">{cantidad}</span>
                                        <button
                                            onClick={() => setCantidad(prev => prev + 1)}
                                            className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full py-3 px-4 rounded-lg text-white font-medium bg-blue-600 hover:bg-blue-700 transition-colors"
                                >
                                    Agregar al carrito
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Cart onCheckout={handleCheckout} />
        </div>
    )
}

