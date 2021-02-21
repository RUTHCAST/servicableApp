import { Component, OnInit } from "@angular/core";
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { Carrusel } from "../../models/carrusel.model";
import { CarruselService } from "../../services/carrusel.service";
import { EditComponent } from "./edit/edit.component";

@Component({
  selector: "app-carrusel",
  templateUrl: "./carrusel.component.html",
  styleUrls: ["./carrusel.component.scss"],
})
export class CarruselComponent implements OnInit {
  carruselImages: Carrusel[] = [];

  constructor(
    private carruselSrv: CarruselService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getCarruselImages();
  }

  getCarruselImages(): void {
    this.carruselSrv
      .getAllCarruselImages()
      .snapshotChanges()
      .subscribe((res) => {
        const size = this.carruselImages.length;
        console.log(size);
        this.carruselImages.splice(0, size);

        res.forEach((t) => {
          const carruselImages = t.payload.toJSON();
          carruselImages["key"] = t.key;
          this.carruselImages.push(carruselImages as Carrusel);
        });
      });
  }

  change(carrusel: Carrusel): void {
    const modalRef: NgbModalRef = this.modalService.open(EditComponent, {
      size: "lg",
    });
    const props = {
      id: this.carruselImages.length,
      carrusel: carrusel,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }
}
