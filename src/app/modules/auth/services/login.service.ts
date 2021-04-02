import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Usuario } from "../models/usuario.model";
import { Router } from "@angular/router";
// Store
import { Store } from "@ngrx/store";
import { AppState } from "../../../store/app.reducer";
import * as actions from "../../../store/actions";
import { Subscription, Observable, from, of, pipe } from "rxjs";
import { delay, map } from "rxjs/operators";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
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
  user: Usuario;
  onSubscription: Subscription;

  constructor(
    private db: AngularFireDatabase,
    private route: Router,
    private store: Store<AppState>
  ) {
    this.onSubscription = this.store.subscribe((state) => {
      this.user = state.user.user;
      // console.log(this.user);
    });
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

  logout() {
    localStorage.clear();
    this.store.dispatch(actions.unsetUser());
    this.route.navigate(["login"]);
  }

  validateToken() {
    const token = localStorage.getItem("token");
    return token || this.user != null ? true : false;
  }

  // doesEmailExist(email: string): Observable<boolean> {
  //   const obs$ = new Observable<boolean>((subs) => {
  //     const exists = this.users.some((value) => value.correo === email);
  //   });
  //   return obs$;
  // }

  checkIfUsernameExists(email: string): Observable<boolean> {
    return of(this.users.some((value) => value.correo === email)).pipe(
      delay(1000)
    );
  }

  usernameValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfUsernameExists(control.value).pipe(
        map((res) => {
          // if res is true, username exists, return true
          return res ? { usernameExists: true } : null;
          // NB: Return null if there is no error
        })
      );
    };
  }
}
