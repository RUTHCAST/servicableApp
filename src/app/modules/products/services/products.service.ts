import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { Category } from "../models/categoy.model";
import { TypeProduct } from "../models/types.model";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private categoryRef = "/categoria_productos";
  private typeRef = "/tipos_producto";

  categories: AngularFireList<Category>;
  category: AngularFireList<Category>;

  typesProducts: AngularFireList<TypeProduct>;

  constructor(private db: AngularFireDatabase) {}

  // Categorias
  getAllCategories(): AngularFireList<Category> {
    this.categories = this.db.list(
      this.categoryRef
    ) as AngularFireList<Category>;
    return this.categories;
  }

  getCategoryById(key: string): AngularFireList<Category> {
    this.category = this.db.list(
      this.categoryRef + key
    ) as AngularFireList<Category>;
    return this.category;
  }

  // Tipos
  getAllTypes(): AngularFireList<TypeProduct> {
    this.typesProducts = this.db.list(
      this.typeRef
    ) as AngularFireList<TypeProduct>;
    return this.typesProducts;
  }
}
