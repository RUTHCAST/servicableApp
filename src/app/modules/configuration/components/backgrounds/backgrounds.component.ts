import { Component, OnInit } from "@angular/core";
import { Background } from "../../models/background.model";
import { BackgroundsService } from "../../services/backgrounds.service";

@Component({
  selector: "app-backgrounds",
  templateUrl: "./backgrounds.component.html",
  styleUrls: ["./backgrounds.component.scss"],
})
export class BackgroundsComponent implements OnInit {
  backgrounds: Background[] = [];

  constructor(private BackgroundSrv: BackgroundsService) {}

  ngOnInit(): void {
    this.getBackgrounds();
  }

  getBackgrounds(): void {
    this.BackgroundSrv.getAllBackground()
      .snapshotChanges()
      .subscribe((res) => {
        const size = this.backgrounds.length;
        console.log(size);
        this.backgrounds.splice(0, size);

        res.forEach((t) => {
          const backgrounds = t.payload.toJSON();
          backgrounds["key"] = t.key;
          this.backgrounds.push(backgrounds as Background);
        });
        // console.log(this.backgrounds);
      });
  }
}
