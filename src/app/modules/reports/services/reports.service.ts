import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Stadistics } from "../models/stadictis.model";

@Injectable({
  providedIn: "root",
})
export class ReportsService {
  private estadistRef = "/estadistica";
  public staditics: AngularFireList<Stadistics>;

  constructor(private db: AngularFireDatabase) {}

  getAllStadistics(): AngularFireList<Stadistics> {
    this.staditics = this.db.list(
      this.estadistRef
    ) as AngularFireList<Stadistics>;
    return this.staditics;
  }
}
