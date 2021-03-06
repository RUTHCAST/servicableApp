import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { ProductoSolicitudServicio } from "../modules/productoSolicitudServicio.model";
import { ServicioSolServicio } from "../modules/servicioSolServicios.model";

@Injectable({
  providedIn: "root",
})
export class SolicitudServiciosService {
  private prodRef = "/productos_formulario_solicituddeservicios";
  public productos: AngularFireList<ProductoSolicitudServicio>;

  private serRef = "/servicios_producto_formulario_solicituddeservicios";
  public servicios: AngularFireList<ServicioSolServicio>;

  constructor(private db: AngularFireDatabase) {}

  getAllProductos(): AngularFireList<ProductoSolicitudServicio> {
    this.productos = this.db.list(
      this.prodRef
    ) as AngularFireList<ProductoSolicitudServicio>;
    return this.productos;
  }

  newProducto(producto: ProductoSolicitudServicio) {
    const productoObj: ProductoSolicitudServicio = {
      id: producto.id,
      key: producto.key,
      nombre: producto.nombre,
    };
    return this.productos.push(productoObj);
  }

  updateProducto(producto: ProductoSolicitudServicio) {
    return this.productos.update(producto.key, producto);
  }

  deleteBackgroundDepartment(key: any) {
    return this.productos.remove(key);
  }

  getAllServicios(): AngularFireList<ServicioSolServicio> {
    this.servicios = this.db.list(
      this.serRef
    ) as AngularFireList<ServicioSolServicio>;
    return this.servicios;
  }

  newServicio(servicio: ServicioSolServicio) {
    const servicioObj: ServicioSolServicio = {
      key: servicio.key,
      producto_id: servicio.producto_id,
      nombre: servicio.nombre,
    };
    return this.servicios.push(servicioObj);
  }

  updateServicio(servicio: ServicioSolServicio) {
    return this.servicios.update(servicio.key, servicio);
  }

  deleteServicios(key: any) {
    return this.servicios.remove(key);
  }
}
