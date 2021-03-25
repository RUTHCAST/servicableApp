import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Departamento } from "../models/departamento.model";
import { Distrito } from "../models/distrito.model";

@Injectable({
  providedIn: "root",
})
export class DepartamentosService {
  private dbRef = "/departamentos";
  private distritosRef = "/distritos";
  public departamentos: AngularFireList<Departamento>;
  public distritos: AngularFireList<Distrito>;

  constructor(private db: AngularFireDatabase) {}

  getAllDepartamentos(): AngularFireList<Departamento> {
    this.departamentos = this.db.list(
      this.dbRef
    ) as AngularFireList<Departamento>;
    return this.departamentos;
  }

  getAllDistritos(): AngularFireList<Distrito> {
    this.distritos = this.db.list(
      this.distritosRef
    ) as AngularFireList<Distrito>;
    return this.distritos;
  }

  newDepartament(departamento: Departamento) {
    const departamentoObj: Departamento = {
      id: departamento.id,
      key: departamento.key,
      nombre: departamento.nombre,
    };
    return this.departamentos.push(departamentoObj);
  }

  updateDepartament(departamento: Departamento) {
    return this.departamentos.update(departamento.key, departamento);
  }

  deleteBackgroundDepartment(key: any) {
    return this.departamentos.remove(key);
  }

  newDistrito(distrito: Distrito) {
    const distritoObj: Distrito = {
      key: distrito.key,
      departamento_id: distrito.departamento_id,
      nombre: distrito.nombre,
    };
    return this.distritos.push(distritoObj);
  }

  updateDistrito(distrito: Distrito) {
    console.log(distrito);
    return this.distritos.update(distrito.key, distrito);
  }

  deleteDistrito(key: any) {
    return this.distritos.remove(key);
  }

  deleteDepartamento(key: any) {
    return this.departamentos.remove(key);
  }
}
