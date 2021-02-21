import { Component, OnInit } from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { Background } from "../../models/background.model";
import { BackgroundsService } from "../../services/backgrounds.service";
import { EditComponent } from "./edit/edit.component";

@Component({
  selector: "app-backgrounds",
  templateUrl: "./backgrounds.component.html",
  styleUrls: ["./backgrounds.component.scss"],
})
export class BackgroundsComponent implements OnInit {
  backgrounds: Background[] = [];

  constructor(
    private BackgroundSrv: BackgroundsService,
    private modalService: NgbModal
  ) {}

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

  change(background: Background, id: number): void {
    const modalRef: NgbModalRef = this.modalService.open(EditComponent, {
      size: "lg",
    });
    const props = {
      id,
      background: background,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }
}
