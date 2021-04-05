import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { NgxSpinnerService } from "ngx-spinner";

import { Subject } from "rxjs";
import { Stadistics } from "../../models/stadictis.model";
import { ReportsService } from "../../services/reports.service";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"],
})
export class ReportsComponent implements OnInit {
  stadictics: Stadistics[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  fileName = "Reporte.xlsx";

  @ViewChild("table") htmlData: ElementRef;
  constructor(
    private reportsSrv: ReportsService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 15,
      retrieve: true,
      language: {
        processing: "Procesando datos...",
        search: "Buscar",
        lengthMenu: "Mostrar _MENU_ Registros",
        info: "Mostrando _START_ de _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Mostrar 0 &agrave; 0 sur 0 &eacute;registros",
        infoFiltered: "(Mostrar _MAX_ registros)",
        infoPostFix: "",
        loadingRecords: "Cargando datos...",
        zeroRecords: "No hay data para mostrar",
        emptyTable: "Sin registros para mostrar",
        paginate: {
          first: "<<",
          previous: "Anterior",
          next: "Siguiente",
          last: ">>",
        },
      },
    };

    this.getStadicts();
  }

  ngOnDestroy(): void {
    this.dtTrigger?.unsubscribe();
  }

  getStadicts(): void {
    this.reportsSrv
      .getAllStadistics()
      .snapshotChanges()
      .subscribe((res) => {
        const size = this.stadictics.length;
        // console.log(size);
        this.stadictics.splice(0, size);

        res.forEach((t) => {
          const category = t.payload.toJSON();
          category["key"] = t.key;
          this.stadictics.push(category as Stadistics);
        });
        console.log(this.stadictics);
        this.dtTrigger.next();
      });
  }

  exportexcel(): void {
    /* pass here the table id */
    let element = document.getElementById("table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  public openPDF(): void {
    let DATA = document.getElementById("table");

    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const FILEURI = canvas.toDataURL("image/png");
      let PDF = new jsPDF("p", "mm", "a4");
      let position = 0;
      PDF.addImage(FILEURI, "PNG", 0, position, fileWidth, fileHeight);

      PDF.save("reporte.pdf");
    });
  }
}
