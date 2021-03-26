import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { EditImageComponent } from '../configuration/components/carrusel/edit-image/edit-image.component';
import { canales } from './modelos/canales.model';
import { CanalesService } from './servicios/canales.service';
import { EditComponent } from './components/edit/edit.component';
import { NewComponent } from './components/new/new.component';
import { DeleteComponent } from './components/delete/delete.component';

@Component({
  selector: 'app-canales',
  templateUrl: './canales.component.html',
  styleUrls: ['./canales.component.scss']
})
export class CanalesComponent implements OnInit {

  canales: canales[] = [];

  constructor(

    private canalesSrv: CanalesService,
    private modalService: NgbModal

  ) { }

  ngOnInit(): void {

    this.getCanales();

  }


  getCanales(): void {
    this.canalesSrv
    .getAllCanal()
      .snapshotChanges()
      .subscribe((res) => {
        const size = this.canales.length;
        console.log(size);
        this.canales.splice(0, size);

        res.forEach((t) => {
          const canales = t.payload.toJSON();
          canales["key"] = t.key;
          this.canales.push(canales as canales);
        });
        console.log(this.canales);
      });
  }


  change(canal: canales): void {
    const modalRef: NgbModalRef = this.modalService.open(EditComponent, {
      size: "lg",
    });
    const props = {
      id: this.canales.length,
      canal,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  new(): void {
    const modalRef: NgbModalRef = this.modalService.open(NewComponent, {
      size: "lg",
    });
    const props = {
      id: this.canales.length,
      canales: this.canales,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  delete(canales: canales) {
    const modalRef: NgbModalRef = this.modalService.open( DeleteComponent, {
      size: "lg",
    });
    const props = {
      id: this.canales.length,
      canales,
      key: canales.key,
    };
    modalRef.componentInstance.props = props;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }





}
