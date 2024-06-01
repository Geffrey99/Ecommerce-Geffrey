export interface usuario {

    id?: number;
    nombre?: string;
    apellido?: string;
    email?: string;
    password?: string;
    direccionEnvio?: string;
    metodoPago?: string;
    localidad?: Localidad;
    rol?: string;
  }
  
  export interface Localidad {
    id?: number;
    nombre?: string;
    provincia?: Provincia;
  }
  
  export interface Provincia {
    id?: number;
    nombre?: string;
  }
  