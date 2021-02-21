import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { FileUpload } from "../../../core/models/fileUpload";
import { Carrusel } from "../models/carrusel.model";

@Injectable({
  providedIn: "root",
})
export class CarruselService {
  private carrRef = "/carrusel_imagenes";
  public carrusel: AngularFireList<Carrusel>;
  public basePath = "CARRUSEL_IMAGES/";

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  getAllCarruselImages(): AngularFireList<Carrusel> {
    this.carrusel = this.db.list(this.carrRef) as AngularFireList<Carrusel>;
    return this.carrusel;
  }

  newCarrusel(carrusel: Carrusel) {
    const carruselObj: Carrusel = {
      id: carrusel.id,
      nombre: carrusel.nombre,
      url_image: carrusel.url_image + "_" + (carrusel.id + 1),
      createdAt: carrusel.createdAt,
    };
    this.carrusel.push(carruselObj);
  }

  updateCarrusel(carrusel: Carrusel) {
    return this.carrusel.update(carrusel.key, carrusel);
  }

  deleteCarruselDatabase(key: any) {
    return this.carrusel.remove(key);
  }

  deleteFileStorage(downloadUrl) {
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }

  deleteCarrusel(carrusel: Carrusel) {
    return this.deleteCarruselDatabase(carrusel.key)
      .then(() => {
        this.deleteFileStorage(carrusel.url_image);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  pushCarruselStorage(
    fileUpload: FileUpload,
    carrusel: Carrusel,
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
            const data: Carrusel = {
              id: carrusel.id,
              key: carrusel.key,
              nombre: carrusel.nombre,
              url_image: fileUpload.url,
              createdAt: carrusel.createdAt,
            };
            this.executeActioncategory(typeAccion, data);
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
    // }
  }

  executeActioncategory(action: string, carrusel) {
    if (action === "new") {
      this.newCarrusel(carrusel);
    } else if (action === "update") {
      this.updateCarrusel(carrusel);
    }
  }
}
