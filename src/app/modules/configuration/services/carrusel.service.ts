import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { Carrusel } from "../models/carrusel.model";

@Injectable({
  providedIn: "root",
})
export class CarruselService {
  private carrRef = "/carrusel_imagenes";
  public carrusel: AngularFireList<Carrusel>;
  public basePath = "CARRUSEL_IMAGES/";

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  getAllCarruselImages(): AngularFireList<Carrusel> {
    this.carrusel = this.db.list(this.carrRef) as AngularFireList<Carrusel>;
    return this.carrusel;
  }
}
