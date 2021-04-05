import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from "@angular/fire/database";
import { Usuario } from "../../modules/auth/models/usuario.model";

@Injectable({
  providedIn: "root",
})
export class ValidatorService {
  private userRef = "/usuario";
  usuarios: AngularFireList<Usuario>;

  constructor() {}
}
