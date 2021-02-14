import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";

import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

import { Category } from "../models/categoy.model";
import { TypeProduct } from "../models/types.model";
import { FileUpload } from "../../../core/models/fileUpload";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  private categoryRef = "/categoria_productos";
  private typeRef = "/tipos_producto";
  public basePath = "CATEGORIAS_PRODUCTOS/";

  categories: AngularFireList<Category>;
  category: AngularFireList<Category>;

  typesProducts: AngularFireList<TypeProduct>;

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

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

  newCategory(category: Category) {
    const categoryObj: Category = {
      id: category.id,
      nombre: category.nombre,
      url_image: category.url_image,
    };
    this.categories.push(categoryObj);
  }

  pushCategoryStorage(
    fileUpload: FileUpload,
    categoryName,
    id
  ): Observable<number> {
    const filePath = `${this.basePath}${Date.now()}_${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    // let uploadTask = storageRef.child(filePath).put(fileUpload.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            const category: Category = {
              id,
              nombre: categoryName,
              url_image: fileUpload.url,
            };
            this.newCategory(category);
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
  }

  // Tipos
  getAllTypes(): AngularFireList<TypeProduct> {
    this.typesProducts = this.db.list(
      this.typeRef
    ) as AngularFireList<TypeProduct>;
    return this.typesProducts;
  }
}
