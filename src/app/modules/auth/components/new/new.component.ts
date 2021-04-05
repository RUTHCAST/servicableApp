import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { NgbActiveModal, NgbModalRef,NgbModal,} from "@ng-bootstrap/ng-bootstrap";
import { FileUpload } from '../../../../core/models/fileUpload';
import { Input } from '@angular/core';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  form: FormGroup;
  isSubmit = false;
  isLoading = false;
  url: any = "";

  // selectedFiles: FileList;
  currentFileUpload: FileUpload;
  filedata: File;
  percentage: number;
  success = false;


  @Input() props: any;


  constructor(
    public modal: NgbActiveModal,
    private canalesSrv: UsersService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.createForm();
    console.log(this.props.canales.length);
 }

 closeModal() {
  this.modal.close(false);
}

createForm() {
  this.form = new FormGroup({

  id: new FormControl("", Validators.required),
  key:new FormControl("", Validators.required),
  id_user_authorized: new FormControl("", Validators.required),
  nombre: new FormControl("", Validators.required),
  apellido: new FormControl("", Validators.required),
  correo: new FormControl("", Validators.required),
  clave: new FormControl("", Validators.required),
  confirm_password: new FormControl("", Validators.required),
  createdAt: new FormControl("", Validators.required),
  url_imagen:new FormControl("", Validators.required),
  
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

cancel() {
  this.url = "";
  this.modal.close();
}

fileEvent(e) {
  // this.selectedFiles = e.target.files;
  this.filedata = (e.target as HTMLInputElement).files[0];
  let reader = new FileReader();
  reader.onload = (event: any) => {
    this.url = event.target.result;
    console.log(this.url);
  };
  reader.readAsDataURL(this.filedata);
}

}
