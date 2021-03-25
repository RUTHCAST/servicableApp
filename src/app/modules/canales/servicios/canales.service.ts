import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { FileUpload } from "../../../core/models/fileUpload";
import { canales } from '../modelos/canales.model';

@Injectable({
  providedIn: 'root'
})
export class CanalesService {

  private carrRef = "/programacion";
  public canales: AngularFireList<canales>;
  public basePath = "/";

  constructor(

    private db: AngularFireDatabase,
    private storage: AngularFireStorage


  ) { }

  getAllCanal(): AngularFireList<canales> {
    this.canales = this.db.list(this.carrRef) as AngularFireList<canales>;
    return this.canales;
  }

  newCanal(canal: canales) {
    const canalObj: canales = {

    categoria: canal.categoria,
    nombre: canal.nombre,
    url: canal.url,
    key: canal.key,
    createdAt: new Date(),

    };
    // console.log(carruselObj);
    this.canales.push(canalObj);
  }

  updateCanal(canal: canales) {
    return this.canales.update(canal.key, canal);
  }

  deleteCanalDatabase(key: any) {
    console.log(key);
    return this.canales.remove(key);
  }

  deleteFileStorage(downloadUrl) {
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }

  deleteCanal(canal: canales) {
    console.log(canal.key);
    return this.deleteCanalDatabase(canal.key)
      .then(() => {
        this.deleteFileStorage(canal.url);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  pushCanalesStorage(
    fileUpload: FileUpload,
    canal: canales,
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
            const data: canales = {
              
              key: canal.key,
              nombre: canal.nombre,
              url: fileUpload.url,
              createdAt: new Date(),
              categoria: canal.categoria,
            };
            console.log(data);
            this.executeActioncategory(typeAccion, data);
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
    // }
  }

  executeActioncategory(action: string, canal: canales) {
    console.log(canal);
    if (action === "new") {
      this.newCanal(canal);
    } else if (action === "update") {
      this.updateCanal(canal);
    }
  }

}
