import { NextRequest, NextResponse } from 'next/server';

interface EmpresaData {
  createdAt: string;
  updatedAt: string;
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

interface EmpresaResponse {
  ok: boolean;
  data: EmpresaData;
  products: Producto[];
}

export async function GET(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const subdomain = hostname.split('.')[0];

  if (!subdomain) {
    return NextResponse.json({ error: 'Subdominio no encontrado' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://app.whatsproy.com/empresa/info/getInfoByDomain?domain=${subdomain}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener información');
    }

    const data: EmpresaResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error desconocido' },
      { status: 500 }
    );
  }
} 