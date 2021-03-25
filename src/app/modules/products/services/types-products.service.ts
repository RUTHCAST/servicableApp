import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";

import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { FileUpload } from "../../../core/models/fileUpload";
import { Category } from "../models/categoy.model";
import { TypeProduct } from "../models/types.model";

@Injectable({
  providedIn: "root",
})
export class TypesProductsService {
  private typeRef = "/tipos_producto";
  typesProducts: AngularFireList<TypeProduct>;
  public basePath = "TIPOS_PRODUCTOS/";
  public basePathBack = "TIPOS_PRODUCTOS/";

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

  pushBackgroundImage(
    fileUploadBack: FileUpload,
    fileUploadImg: FileUpload,
    type: TypeProduct,
    action = null
  ): Observable<number> {
    const filePath = `${this.basePathBack}${Date.now()}_${
      fileUploadBack.file.name
    }`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUploadBack.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUploadBack.url = downloadURL;
            fileUploadBack.name = fileUploadBack.file.name;
            const data: TypeProduct = {
              id: type.id,
              id_categoria: type.id_categoria,
              nombre: type.nombre,
              descripcion: type.descripcion,
              precio: type.precio,
              url_image: type.url_image ? type.url_image : "",
              url_background: fileUploadBack.url,
            };
            if (action === null) {
              this.pushImageAndSave(fileUploadImg, data);
            } else {
              this.executeActionType(action, data);
            }
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
    // }
  }

  pushImageAndSave(
    fileUploadImg: FileUpload,
    type: TypeProduct,
    action = null
  ): Observable<number> {
    const filePath = `${this.basePath}${Date.now()}_${fileUploadImg.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUploadImg.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUploadImg.url = downloadURL;
            fileUploadImg.name = fileUploadImg.file.name;
            const data: TypeProduct = {
              id: type.id,
              key: type.key,
              id_categoria: type.id_categoria,
              nombre: type.nombre,
              descripcion: type.descripcion,
              precio: type.precio,
              url_image: fileUploadImg.url,
              url_background: type.url_background,
            };
            if (action === null) {
              this.newType(data);
            } else {
              this.executeActionType(action, data);
            }
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
  }

  newType(type: TypeProduct) {
    const typeObj: TypeProduct = {
      id: type.id,
      id_categoria: type.id_categoria,
      nombre: type.nombre,
      descripcion: type.descripcion,
      precio: type.precio,
      url_image: type.url_image,
      url_background: type.url_background,
    };
    this.typesProducts.push(typeObj);
  }

  updateType(type: TypeProduct) {
    console.log("Entro a actualizar");
    console.log(type.key);
    console.log(type);

    return this.typesProducts.update(type.key, type);
  }

  deleteFileStorage(downloadUrl) {
    console.log("entro a borrar la imagen con esta url", downloadUrl);
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }

  deleteTypeDatabase(key: any) {
    return this.typesProducts.remove(key);
  }

  deleteType(type: TypeProduct) {
    console.log(type);
    return this.deleteTypeDatabase(type.key)
      .then(() => {
        this.deleteFileStorage(type.url_image);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  executeActionType(action: string, type: TypeProduct) {
    if (action === "new") {
      this.newType(type);
    } else if (action === "update") {
      this.updateType(type);
    }
  }
}
