import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";

import { NgxSpinnerService } from "ngx-spinner";
import { NgbModalRef, NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { v4 as uuid } from "uuid";
import { UsersService } from '../../services/users.service';
import { LoginService } from '../../services/login.service';
import { FormControl } from '@angular/forms';
import { Input } from '@angular/core';
import { users } from '../../models/user.model';
import { FileUpload } from '../../../../core/models/fileUpload';
import { ImageCropperComponent } from '../../../../core/components/image-cropper/image-cropper.component';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  form: FormGroup;
  isSubmit = false;
  isLoading = false;
  success = false;
  url: string;


  currentFileUpload: FileUpload;
  filedata: File;
  percentage: number;
  @Input() props: any;

  constructor(

    private userSrv: UsersService,
    private loginSrv: LoginService,
    private route: Router,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    public modal: NgbActiveModal

  ) { }

  ngOnInit(): void {

    this.url = this.props.user.url_imagen || "../../../../../assets/img/avatars/profile.png";
    this.createForm();
  }

  closeModal() {
    this.modal.close(false);
  }

  createForm() {
    this.form = new FormGroup({
      nombre: new FormControl(this.props.user.nombre, Validators.required),
      apellido: new FormControl(this.props.user.apellido, Validators.required),
      correo: new FormControl(this.props.user.correo, Validators.required),
      clave: new FormControl(this.props.user.clave, Validators.required),
      confirm_password: new FormControl(this.props.user.confirm_password, Validators.required),
    });


  }


  onInvalidField(fieldTag) {
    return (
      this.form.get(fieldTag).invalid &&
      (this.isSubmit || this.form.get(fieldTag).touched)
    );
  }

  onValidator(fieldTag: string, validatorTag: string) {
    const field = this.form.controls[fieldTag];
    return (
      field.errors &&
      field.errors[validatorTag] &&
      (this.isSubmit || field.touched)
    );
  }

  get f() {
    return this.form.controls;
  }

  fileEvent(e) {
    // this.selectedFiles = e.target.files;
    this.filedata = (e.target as HTMLInputElement).files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.url = event.target.result;
      // console.log(this.url);
    };
    reader.readAsDataURL(this.filedata);
  }

  uploadImage(): void {
    const modalRef: NgbModalRef = this.modalService.open(
      ImageCropperComponent,
      {
        size: "lg",
      }
    );
    modalRef.result.then((result) => {
      if (result) {
        this.url = result.cropper;
        this.filedata = result.fileData;
      }
      console.log(this.filedata);
    });
  }
  
  edit() {
    this.isSubmit = true;
    this.isLoading = true;
    console.log(this.filedata);
    this.spinner.show();
    console.log(typeof this.filedata);
    if (!this.form.valid || typeof this.filedata =='undefined') {
      return;
    }
    const action = "update";
    const data: Usuario = {
       
      key: this.props.user.key,
      nombre: this.form.get("nombre").value,
      apellido: this.form.get("apellido").value,
      correo: this.form.get("correo").value,
      clave: this.form.get("clave").value,
      confirm_password: this.form.get("confirm_password").value,
    };

    this.currentFileUpload = new FileUpload(this.filedata);
    this.userSrv
      .pushUserStorage(this.currentFileUpload, data, action)
      .subscribe(
        (percentage) => {
          this.percentage = Math.round(percentage);
          if (this.percentage === 100) {
            this.isLoading = false;
            this.currentFileUpload = null;
            this.success = true;
            this.spinner.hide();
            this.route.navigate(['/login/verification']);
          }
        },
        (error) => {
          console.log(error);
          this.isLoading = false;
          this.currentFileUpload = null;
          this.spinner.hide();
          this.success = true;
        }
      );
  }



}
