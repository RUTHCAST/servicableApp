import { Injectable } from "@angular/core";

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";

import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

import { FileUpload } from "../../../core/models/fileUpload";
import { Usuario } from "../models/usuario.model";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private userRef = "/usuario";
  public basePath = "USERS_PICTURES/";
  users: AngularFireList<Usuario>;

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  getAllUsers(): AngularFireList<Usuario> {
    this.users = this.db.list(this.userRef) as AngularFireList<Usuario>;
    return this.users;
  }

  newUser(user: Usuario) {
    console.log(this.users);
    console.log(user);
    const usuarioObj: Usuario = {
      // id: user.key,
      key: user.key,
      nombre: user.nombre,
      apellido: user.apellido,
      correo: user.correo,
      clave: user.clave,
      confirm_password: user.clave,
      createdAt: user.createdAt,
      url_imagen: user.url_imagen,
    };
    this.users.push(usuarioObj);
  }

  //   updateCategory(category: Category) {
  //     return this.categories.update(category.key, category);
  //   }

  //   deleteCategory(category: Category) {
  //     return this.deleteCategoryDatabase(category.key)
  //       .then(() => {
  //         this.deleteFileStorage(category.url_image);
  //       })
  //       .catch((err: any) => {
  //         console.log(err);
  //       });
  //   }

  //   deleteCategoryDatabase(key: any) {
  //     return this.categories.remove(key);
  //   }

  executeAction(action: string, category) {
    if (action === "new") {
      this.newUser(category);
    } else if (action === "update") {
      console.log("Arreglar usuarios");
      // this.updateCategory(category);
    }
  }

  pushUserStorage(
    fileUpload: FileUpload,
    user: Usuario,
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
            const data: Usuario = {
              key: user.key,
              nombre: user.nombre,
              apellido: user.apellido,
              correo: user.correo,
              clave: user.clave,
              confirm_password: user.clave,
              createdAt: new Date(),
              url_imagen: fileUpload.url,
            };
            this.executeAction(typeAccion, data);
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
    // }
  }

  //   deleteFileStorage(downloadUrl) {
  //     console.log("entro a borrar la imagen con esta url", downloadUrl);
  //     return this.storage.storage.refFromURL(downloadUrl).delete();
  //   }
}
