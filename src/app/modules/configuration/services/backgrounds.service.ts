import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { AngularFireStorage } from "@angular/fire/storage";

import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
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
}
