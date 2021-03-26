import { Component, OnInit } from "@angular/core";
import { navItems } from "../../_nav";

// Store
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import * as actions from "../../store/actions";
import { Usuario } from "../../modules/auth/models/usuario.model";
import { AppState } from "../../store/app.reducer";

@Component({
  selector: "app-dashboard",
  templateUrl: "./default-layout.component.html",
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;
  user: Usuario;
  onSubscription: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.onSubscription = this.store.subscribe((state) => {
      this.user = state.user.user;
      console.log(this.user);
    });
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
