import { Injectable } from "@angular/core";

import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";

import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { FileUpload } from "../../../core/models/fileUpload";

@Injectable({
  providedIn: "root",
})
export class UploadsService {
  private basePath = "/CATEGORIAS_PRODUCTOS";

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  pushFileToStorage(fileUpload: FileUpload): Observable<number> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            // this.saveFileData(fileUpload);
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
  }
}
