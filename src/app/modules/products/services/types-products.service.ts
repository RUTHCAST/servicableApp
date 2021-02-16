import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";

import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { TypeProduct } from "../models/types.model";

@Injectable({
  providedIn: "root",
})
export class TypesProductsService {
  private typeRef = "/tipos_producto";
  typesProducts: AngularFireList<TypeProduct>;

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  getAllTypes(): AngularFireList<TypeProduct> {
    this.typesProducts = this.db.list(
      this.typeRef
    ) as AngularFireList<TypeProduct>;
    return this.typesProducts;
  }
}
