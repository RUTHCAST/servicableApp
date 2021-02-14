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

  updateCategory(category: Category) {
    return this.categories.update(category.id, category);
  }

  deleteCategory(category: Category) {
    return this.deleteCategoryDatabase(category.key)
      .then(() => {
        this.deleteFileStorage(category.url_image);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  deleteCategoryDatabase(key: any) {
    return this.categories.remove(key);
  }

  // executeActioncategory(action: string, category) {
  //   if (action === "new") {
  //     this.newCategory(category);
  //   } else if (action === "update") {
  //     this.updateCategory(category);
  //   }
  // }

  // Storage

  pushCategoryStorage(
    fileUpload: FileUpload,
    category: Category,
    typeAccion: string
  ): Observable<number> {
    const filePath = `${this.basePath}${Date.now()}_${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            const data: Category = {
              id: category.id,
              nombre: category.nombre,
              url_image: fileUpload.url,
            };
            this.newCategory(data);
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
    // }
  }

  deleteFileStorage(downloadUrl) {
    console.log("entro a borrar la imagen con esta url", downloadUrl);
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }

  // Tipos
  getAllTypes(): AngularFireList<TypeProduct> {
    this.typesProducts = this.db.list(
      this.typeRef
    ) as AngularFireList<TypeProduct>;
    return this.typesProducts;
  }
}
