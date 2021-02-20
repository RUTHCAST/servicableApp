import { Component, OnInit } from "@angular/core";
import { Carrusel } from "../../models/carrusel.model";
import { CarruselService } from "../../services/carrusel.service";

@Component({
  selector: "app-carrusel",
  templateUrl: "./carrusel.component.html",
  styleUrls: ["./carrusel.component.scss"],
})
export class CarruselComponent implements OnInit {
  carruselImages: Carrusel[] = [];

  constructor(private carruselSrv: CarruselService) {}

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
}
