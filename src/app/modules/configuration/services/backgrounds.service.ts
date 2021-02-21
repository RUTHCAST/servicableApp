import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";

import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { FileUpload } from "../../../core/models/fileUpload";
import { Background } from "../models/background.model";

@Injectable({
  providedIn: "root",
})
export class BackgroundsService {
  private confRef = "/backgrounds";
  public backgrounds: AngularFireList<Background>;
  public basePath = "BACKGROUNDS/";
  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  getAllBackground(): AngularFireList<Background> {
    this.backgrounds = this.db.list(
      this.confRef
    ) as AngularFireList<Background>;
    return this.backgrounds;
  }

  updateBackground(background: Background) {
    return this.backgrounds.update(background.key, background);
  }

  deleteBackgroundDatabase(key: any) {
    return this.backgrounds.remove(key);
  }

  deleteFileStorage(downloadUrl) {
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }

  deleteCategory(background: Background) {
    return this.deleteBackgroundDatabase(background.key)
      .then(() => {
        this.deleteFileStorage(background.url_image);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  pushBackgroundStorage(
    fileUpload: FileUpload,
    background: Background
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
            const data: Background = {
              id: background.id,
              key: background.key,
              nombre: background.nombre,
              url_image: fileUpload.url,
              createdAt: background.createdAt
            };
            this.updateBackground(data);
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
    // }
  }
}
