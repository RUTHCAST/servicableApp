export interface Usuario {
  id: number;
  key?: string;
  id_user_authorized: number;
  nombre: string;
  apellido: string;
  correo: string;
  clave: string;
  confirm_password?: string;
  createdAt?: Date;
  url_imagen?: string;
}
