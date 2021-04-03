import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-image-detail",
  templateUrl: "./image-detail.component.html",
  styles: [],
})
export class ImageDetailComponent implements OnInit {
  @Input() props: any;

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void { }
  
  closeModal() {
    this.modal.close();
  }
}
