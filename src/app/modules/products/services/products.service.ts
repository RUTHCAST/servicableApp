import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { Observable } from "rxjs";
import { Category } from "../models/categoy.model";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private dbPath = "/categoria_productos";
  categories: AngularFireList<Category>;
  // categories: Observable<Category[]>;

  constructor(private db: AngularFireDatabase) {}

  getAll(): AngularFireList<Category> {
    this.categories = this.db.list(this.dbPath) as AngularFireList<Category>;
    return this.categories;
  }
}
