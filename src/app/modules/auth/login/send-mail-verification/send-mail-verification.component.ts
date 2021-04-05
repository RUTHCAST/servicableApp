import { Component, OnInit } from "@angular/core";
import { LoginService } from "../../services/login.service";
import { UsersService } from "../../services/users.service";

@Component({
  selector: "app-send-mail-verification",
  templateUrl: "./send-mail-verification.component.html",
  styleUrls: ["./send-mail-verification.component.scss"],
})
export class SendMailVerificationComponent implements OnInit {
  constructor(private userSrv: UsersService) {}

  ngOnInit(): void {}

  onSendEmail() {}
}
