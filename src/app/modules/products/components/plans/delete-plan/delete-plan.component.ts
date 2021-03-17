import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { PlansService } from "../../../services/plans.service";

@Component({
  selector: "app-delete-plan",
  templateUrl: "./delete-plan.component.html",
  styleUrls: ["./delete-plan.component.scss"],
})
export class DeletePlanComponent implements OnInit {
  success = false;
  isLoading = false;
  @Input() props: any;

  constructor(public modal: NgbActiveModal, private planSrv: PlansService) {}

  ngOnInit(): void {}

  closeModal() {
    this.modal.close(false);
  }

  delete() {
    this.isLoading = true;
    this.planSrv
      .deletePlan(this.props.plan)
      .then(() => {
        this.success = true;
        this.isLoading = false;
      })
      .catch((err: any) => {
        console.log(err);
        this.isLoading = false;
      });
  }
}
