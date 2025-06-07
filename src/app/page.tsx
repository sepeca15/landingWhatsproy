"use client";

import { useEffect, useMemo, useState } from 'react';
import { EmpresaResponse, Producto, Reseña } from '../types';
import DeliveryPage from '@/components/RenderDeloveryPage';
import ReservaPage from '@/components/RenderReservaPage';
import Header from '@/components/Header';
import { FaLocationDot } from 'react-icons/fa6';
import { IoIosPhonePortrait } from 'react-icons/io';
import { MdSchedule } from 'react-icons/md';
import { SiGmail } from 'react-icons/si';

const diasSemana: Record<number, string> = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
  7: "Domingo"
};

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

  const horarios = useMemo(() => {
    if (!empresaInfo?.horario) return [];

    const horariosPorDia: Record<string, string[]> = {};

    empresaInfo.horario.forEach(item => {
      const dia = diasSemana[item.dayOfWeek];
      const horarioTexto = `${item.hora_inicio} - ${item.hora_fin}`;

      if (!horariosPorDia[dia]) {
        horariosPorDia[dia] = [];
      }

      horariosPorDia[dia].push(horarioTexto);
    });

    // Ordenar días de la semana
    const resultado = Object.entries(horariosPorDia)
      .sort((a, b) => {
        const diaA = Object.entries(diasSemana).find(([_, val]) => val === a[0]);
        const diaB = Object.entries(diasSemana).find(([_, val]) => val === b[0]);
        return (parseInt(diaA?.[0] || '0') - parseInt(diaB?.[0] || '0'));
      })
      .map(([dia, horarios]) => `${dia}: ${horarios.join(", ")}`);

    return resultado;
  }, [empresaInfo?.horario]);



  return (
    loading ?
      <div className='flex-1  w-full h-screen flex flex-row items-center'>
        <p className='text-center m-auto text-white animate-pulse'>CARGANDO INFORMACIÓN DE LA EMPRESA</p>
      </div>
      :
      empresaInfo?.data ?
        <div className="flex-1 h-screen flex flex-col">
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

          <footer className="bg-black text-gray-200 py-10">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex flex-col md:flex-row md:justify-between gap-10">
                <div className="flex-1 flex flex-col gap-4">
                  <p className="font-bold text-lg">SOBRE NOSOTROS</p>
                  <div className="flex items-center gap-2">
                    <FaLocationDot size={20} />
                    <p>{empresaInfo?.data.direccion ?? "No hay dirección"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <IoIosPhonePortrait size={20} />
                    <p>{empresaInfo.data.numero}</p>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-4">
                  <p className="font-bold text-lg">CONTACTANOS</p>
                  <div className="flex items-center gap-2">
                    <SiGmail size={20} />
                    <p>{empresaInfo?.data.userContact ?? "No disponible"}</p>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-4">
                  <p className="font-bold text-lg">HORARIOS</p>
                  <div className="flex flex-col gap-2 pr-1">
                    {horarios?.map((hour, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="min-w-[20px] mt-1">
                          <MdSchedule size={20} />
                        </div>
                        <p className="break-words">{hour}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 my-6 mt-[50px]" />

              <div className="text-center text-sm">
                <p>
                  © {new Date().getFullYear()} {empresaInfo?.data.nombre ?? "Measy"}. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </footer>


        </div>
        :
        <div className='w-full h-screen bg-transparent text-white flex justify-center items-center'>No data</div>
  );
}