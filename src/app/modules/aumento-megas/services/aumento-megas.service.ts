import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

import { ProductoAumentoMegas } from "../models/productoAumentoMegas.model";
import { PlanAumentoMegas } from "../models/planAumentoMegas.model";

@Injectable({
  providedIn: "root",
})
export class AumentoMegasService {
  private aumMegRef = "/productos_formulario_aumentodemegas";
  public productos: AngularFireList<ProductoAumentoMegas>;

  private planesAumMegRef = "/planes_producto_formulario_aumentodemegas";
  public planes: AngularFireList<PlanAumentoMegas>;

  constructor(private db: AngularFireDatabase) {}

  getAllProductos(): AngularFireList<ProductoAumentoMegas> {
    this.productos = this.db.list(
      this.aumMegRef
    ) as AngularFireList<ProductoAumentoMegas>;
    return this.productos;
  }

  newProducto(producto: ProductoAumentoMegas) {
    const productoObj: ProductoAumentoMegas = {
      id: producto.id,
      key: producto.key,
      nombre: producto.nombre,
    };
    return this.productos.push(productoObj);
  }

  updateProducto(producto: ProductoAumentoMegas) {
    return this.productos.update(producto.key, producto);
  }

  deleteBackgroundDepartment(key: any) {
    return this.productos.remove(key);
  }

  getAllPlan(): AngularFireList<PlanAumentoMegas> {
    this.planes = this.db.list(
      this.planesAumMegRef
    ) as AngularFireList<PlanAumentoMegas>;
    return this.planes;
  }

  newPlan(plan: PlanAumentoMegas) {
    const planObj: PlanAumentoMegas = {
      key: plan.key,
      producto_id: plan.producto_id,
      nombre: plan.nombre,
    };
    return this.planes.push(planObj);
  }

  updatePlanes(plan: PlanAumentoMegas) {
    return this.planes.update(plan.key, plan);
  }

  deletePlanes(key: any) {
    console.log(key);
    return this.planes.remove(key);
  }

  deleteProduct(key: any) {
    console.log(key);
    return this.productos.remove(key);
  }
}
