import { Injectable } from '@angular/core';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";

import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

import { users } from '../models/user.model';
import { FileUpload } from "../../../core/models/fileUpload";

@Injectable({
  providedIn: "root",
})


export class UsersService {

  private userRef = "/users";
  //public basePath = "USERS/";
  users: AngularFireList<users>;
 

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  getAllUsers(): AngularFireList<users> {
    this.users = this.db.list(
      this.userRef
    ) as AngularFireList<users>;
    return this.users;
  }

//   newCategory(category: Category) {
//     const categoryObj: Category = {
//       id: category.id,
//       nombre: category.nombre,
//       url_image: category.url_image,
//     };
//     this.categories.push(categoryObj);
//   }

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

//   executeActioncategory(action: string, category) {
//     if (action === "new") {
//       this.newCategory(category);
//     } else if (action === "update") {
//       this.updateCategory(category);
//     }
//   }

//   pushCategoryStorage(
//     fileUpload: FileUpload,
//     category: Category,
//     typeAccion: string
//   ): Observable<number> {
//     const filePath = `${this.basePath}${Date.now()}_${fileUpload.file.name}`;
//     const storageRef = this.storage.ref(filePath);
//     const uploadTask = this.storage.upload(filePath, fileUpload.file);

//     uploadTask
//       .snapshotChanges()
//       .pipe(
//         finalize(() => {
//           storageRef.getDownloadURL().subscribe((downloadURL) => {
//             fileUpload.url = downloadURL;
//             fileUpload.name = fileUpload.file.name;
//             const data: Category = {
//               id: category.id,
//               key: category.key,
//               nombre: category.nombre,
//               url_image: fileUpload.url,
//             };
//             this.executeActioncategory(typeAccion, data);
//           });
//         })
//       )
//       .subscribe();

//     return uploadTask.percentageChanges();
//     // }
//   }

//   deleteFileStorage(downloadUrl) {
//     console.log("entro a borrar la imagen con esta url", downloadUrl);
//     return this.storage.storage.refFromURL(downloadUrl).delete();
//   }
 }
 