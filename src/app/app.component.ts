import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

import { IconSetService } from "@coreui/icons-angular";
import { freeSet } from "@coreui/icons";

// Store
import { Store } from "@ngrx/store";
import { AppState } from "./store/app.reducer";
import * as actions from "./store/actions";

import { Subscription } from "rxjs";
@Component({
  // tslint:disable-next-line
  selector: "body",
  template: "<router-outlet></router-outlet>",
  providers: [IconSetService],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    public iconSet: IconSetService,
    private store: Store<AppState>
  ) {
    // iconSet singleton
    iconSet.icons = { ...freeSet };
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.updateStore();
  }

  updateStore() {
    // this.clearStorage();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user != null) {
      this.store.dispatch(
        actions.setUser({
          user,
        })
      );
    }
  }
}
