import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Usuario } from "../models/usuario.model";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private usuarioRef = "/usuario";
  public usuarios: AngularFireList<Usuario>;
  public users: any;

  constructor(private db: AngularFireDatabase) {
    this.users = this.getAllUsers();
  }

  getAllUsers(): AngularFireList<Usuario> {
    this.usuarios = this.db.list(this.usuarioRef) as AngularFireList<Usuario>;
    return this.usuarios;
  }

  login(email: string, password: string) {
    this.users.some((value) => {
      value.correo == email && value.clave == password;
    });
  }
}
