export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string | null;
  empresa_id: number;
  descripcion: string;
  plazoDuracionEstimadoMinutos: number;
  disponible: boolean;
}

export interface EmpresaData {
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
  numero: string;
  userContact: string;
  tipoServicioId: number;
  apiUrl: string
}

export interface EmpresaResponse {
  ok: boolean;
  data: EmpresaData;
  products: Category[];
  infoLines: IInfoLine[]
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  producto: Producto[]
}

export interface Reseña {
  id: number;
  nombre: string;
  comentario: string;
  calificacion: number;
  fecha: string;
  imagen?: string;
}

export interface IInfoLine {
  id: number;
  nombre: string;
  requerido: boolean;
  es_defecto: boolean;
  tipo: TipoInfoLine;
  show?: boolean;
  id_tipo_servicio: number;
}

export enum TipoInfoLine {
  "string" = "string",
  "number" = "number",
  "boolean" = "boolean",
  "date" = "date",
}