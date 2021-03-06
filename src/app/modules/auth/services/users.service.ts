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
  usuarios: AngularFireList<Usuario>;

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  getAllUsers(): AngularFireList<Usuario> {
    this.usuarios = this.db.list(this.userRef) as AngularFireList<Usuario>;
    return this.usuarios;
  }

  newUser(user: Usuario) {
    this.usuarios = this.db.list(this.userRef) as AngularFireList<Usuario>;
    const usuarioObj: Usuario = {
      key: user.key,
      nombre: user.nombre,
      apellido: user.apellido,
      correo: user.correo,
      clave: user.clave,
      confirm_password: user.clave,
      createdAt: user.createdAt,
      url_imagen: user.url_imagen,
    };
    this.usuarios.push(usuarioObj);
  }

     updateUser(user: Usuario) {
       return this.usuarios.update(user.key, user);
    }

    deleteUser(user: Usuario) {
      return this.deleteUserDatabase(user.key)
      .then(() => {
           this.deleteFileStorage(user.url_imagen);
         })
         .catch((err: any) => {
           console.log(err);
         });
     }

     deleteFileStorage(downloadUrl) {
      
      return this.storage.storage.refFromURL(downloadUrl).delete();
    }

    deleteUserDatabase(key: any) {
      return this.usuarios.remove(key);
    }

  executeAction(action: string, user) {
    if (action === "new") {
      this.newUser(user);
    } else if (action === "update") {
      this.updateUser(user);
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
          storageRef
            .getDownloadURL()
            .subscribe((downloadURL) => {
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

  // deleteFileStorage(downloadUrl) {
  //   console.log("entro a borrar la imagen con esta url", downloadUrl);
  //   return this.storage.storage.refFromURL(downloadUrl).delete();
  // }

  sendEmailVerication() {}
}
