import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";

import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { FileUpload } from "../../../core/models/fileUpload";
import { PlanProduct } from "../models/plans.model";

@Injectable({
  providedIn: "root",
})
export class PlansService {
  private planRef = "/planes_producto";
  public plansProducts: AngularFireList<PlanProduct>;
  public basePath = "PLANES/";

  constructor(
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}

  getAllTypes(): AngularFireList<PlanProduct> {
    this.plansProducts = this.db.list(
      this.planRef
    ) as AngularFireList<PlanProduct>;
    return this.plansProducts;
  }

  pushImageAndSave(
    fileUploadImg: FileUpload,
    plan: PlanProduct,
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
            const data: PlanProduct = {
              id: plan.id,
              id_tipo: plan.id_tipo,
              nombre: plan.nombre,
              precio: plan.precio,
              url_image: fileUploadImg.url,
            };
            this.executeActionType(action, data);
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
  }

  executeActionType(action: string, plan: PlanProduct) {
    if (action === "new") {
      this.newPlan(plan);
    } else if (action === "update") {
      this.updatePlan(plan);
    }
  }

  newPlan(plan: PlanProduct) {
    const planObj: PlanProduct = {
      id: plan.id,
      id_tipo: plan.id_tipo,
      nombre: plan.nombre,
      precio: plan.precio,
      url_image: plan.url_image,
    };
    this.plansProducts.push(planObj);
  }

  updatePlan(plan: PlanProduct) {
    return this.plansProducts.update(plan.key, plan);
  }

  deleteFileStorage(downloadUrl) {
    console.log("entro a borrar la imagen con esta url", downloadUrl);
    return this.storage.storage.refFromURL(downloadUrl).delete();
  }

  deletePlanesDatabase(key: any) {
    return this.plansProducts.remove(key);
  }

  deletePlan(plan: PlanProduct) {
    return this.deletePlanesDatabase(plan.key)
      .then(() => {
        this.deleteFileStorage(plan.url_image);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
