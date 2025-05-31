"use client";

import { useEffect, useState } from 'react';
import { EmpresaResponse, Producto, Reseña } from '../types';
import DeliveryPage from '@/components/RenderDeloveryPage';
import ReservaPage from '@/components/RenderReservaPage';
import Header from '@/components/Header';
import { FaLocationDot } from 'react-icons/fa6';
import { IoIosPhonePortrait } from 'react-icons/io';
import { MdSchedule } from 'react-icons/md';
import { SiGmail } from 'react-icons/si';
import { useCart } from '@/context/CartContext';
export default function Home() {
  const [empresaInfo, setEmpresaInfo] = useState<EmpresaResponse | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    fetch('/api/empresa')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Error al obtener información');
        }
        return res.json();
      })
      .then((data: EmpresaResponse) => {
        setEmpresaInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    loading ?
      <div className='flex-1 w-full h-screen flex flex-row items-center'>
        <p className='text-center m-auto text-white animate-pulse'>CARGANDO INFORMACIÓN DE LA EMPRESA</p>
      </div>
      :
      empresaInfo?.data ?
        <div className='flex-1 h-screen bg-[#030508] flex flex-col'>
          <Header
            empresaNombre={empresaInfo?.data.nombre}
            logo={empresaInfo?.data.logo}
            abierto={empresaInfo?.data.abierto}
          />
          {
            empresaInfo?.data.tipoServicioId === 1 ?
              <DeliveryPage empresaInfo={empresaInfo} />
              :
              <ReservaPage empresaInfo={empresaInfo} />
          }

          <footer className="bg-black py-4 text-gray-200">
            <div className='w-full my-[100px] bg-black'>
              <div className='w-[60%] m-auto flex md:flex-row flex-col md:justify-between justify-center md:gap-0 gap-[40px]'>
                <div className='flex flex-col md:items-start items-center gap-4'>
                  <p className='font-bold'>
                    SOBRE NOSOTROS
                  </p>
                  <div className='flex flex-row items-center gap-2'>
                    <FaLocationDot size={20} color='white' />
                    <p>{empresaInfo?.data.direccion ?? "No hay direccion"}</p>
                  </div>
                  <div className='flex flex-row items-center gap-2'>
                    <IoIosPhonePortrait size={20} color='white' />
                    <p>59891664536</p>
                  </div>
                </div>
                <div className='flex flex-col md:items-start items-center gap-4'>
                  <p className='font-bold'>
                    HORARIOS
                  </p>
                  <div className='flex flex-row items-center gap-2'>
                    <MdSchedule size={20} color='white' />
                    <p>{empresaInfo?.data.hora_apertura}</p>
                  </div>
                  <div className='flex flex-row items-center gap-2'>
                    <MdSchedule size={20} color='white' />
                    <p>{empresaInfo?.data.hora_cierre}</p>
                  </div>

                </div>
                <div className='flex flex-col md:items-start items-center gap-4'>
                  <p>
                    CONTACTANOS
                  </p>
                  <div className='flex flex-row items-center gap-2'>
                    <SiGmail size={20} color='white' />
                    <p>{empresaInfo?.data.userContact}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container mx-auto text-center px-4">
              <p className="text-sm ">
                © {new Date().getFullYear()} {empresaInfo ? empresaInfo.data.nombre : 'Measy'}. Todos los derechos reservados.
              </p>
            </div>
          </footer>

        </div>
        :
        <div className='w-full h-screen bg-transparent text-white flex justify-center items-center'>No data</div>
  );
}