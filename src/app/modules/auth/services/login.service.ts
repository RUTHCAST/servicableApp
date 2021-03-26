import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Usuario } from "../models/usuario.model";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  private usuarioRef = "/usuario";
  public usuarios: AngularFireList<Usuario>;
  public users: Usuario[] = [];
  public response = {
    user: null,
    error: null,
  };
  constructor(private db: AngularFireDatabase) {
    this.getUserArray();
  }

  getAllUsersLists(): AngularFireList<Usuario> {
    this.usuarios = this.db.list(this.usuarioRef) as AngularFireList<Usuario>;
    return this.usuarios;
  }

  getUserArray(): void {
    this.getAllUsersLists()
      .snapshotChanges()
      .subscribe((res) => {
        const size = this.users.length;
        this.users.splice(0, size);

        res.forEach((t) => {
          const user = t.payload.toJSON();
          user["key"] = t.key;
          this.users.push(user as Usuario);
        });
        console.log(this.users);
      });
  }

  login(email: string, password: string) {
    const exist = this.users.some(
      (value) =>
        value.correo === email && value.clave.toString() === password.toString()
    );

    if (exist) {
      this.response.user = this.users.filter((user) => user.correo === email);
    } else {
      this.response.error = "Usuario no encontrado";
    }
    return this.response;
  }
}
