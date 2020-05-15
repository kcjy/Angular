import { Component, OnInit, ViewChild } from '@angular/core';
import * as xlsx from 'xlsx';
import { DataService } from '../../shared/data.service';
import { IDataOptions, IDataSet, PivotView, FieldListService, GroupingBarService,CalculatedFieldService,
ConditionalFormattingService,ToolbarService  } from '@syncfusion/ej2-angular-pivotview';
import { GridSettings } from '@syncfusion/ej2-pivotview/src/pivotview/model/gridsettings';
import { DataManager, WebApiAdaptor,  Query, ReturnOption } from '@syncfusion/ej2-data';
import { Button } from '@syncfusion/ej2-buttons';
import { PdfExportProperties, ExcelExportProperties  } from '@syncfusion/ej2-grids';
import {FormControl, Validators} from '@angular/forms';

export interface data {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-excel',
  providers: [GroupingBarService,
    FieldListService,
    CalculatedFieldService,
    ToolbarService,
    ConditionalFormattingService ],
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {
  public dataSourceSettings: IDataOptions;
  public gridSettings: GridSettings;
  public pdfExportProperties: PdfExportProperties;
  public excelExportProperties: ExcelExportProperties;
  public data: DataManager;


  @ViewChild('pivotview', {static: false})
  public pivotGridObj: PivotView;
  public format_button: Button;
  public pdf_button: Button;
  public excel_button: Button;

  public databases: data[] = [
    { value: 'SensorTower', viewValue: 'SensorTower' },
    { value: 'KREX', viewValue: 'KREX' },
    { value: 'Sandalwood', viewValue: 'Sandalwood' },
  ];
  public selectedData = this.databases[0].value;


  onChange(newValue) {
    console.log(newValue);
    this.selectedData = newValue;
  }

  constructor(
   ){ }

  exportToExcel() {
   }


  ngOnInit(): void {
    this.data = new DataManager({
        url: 'http://localhost:5002/test-data/',
        adaptor: new WebApiAdaptor,
        crossDomain: true
    });
    this.dataSourceSettings = {
      dataSource: this.data,
      expandAll: false,
      allowLabelFilter: true,
      allowValueFilter: true,
      enableSorting: true,
      columns: [{ name: 'Country' }, { name: 'Products' }],
      values: [{ name: 'Sold', caption: 'Units Sold' }],
      rows: [{ name: 'Year' }, { name: 'Quarter' }],
      formatSettings: [{ name: 'Amount', format: 'C0' }],
      calculatedFieldSettings: [{ name: 'Total', formula: '"Sum(Amount)"+"Sum(Sold)"' }],
      conditionalFormatSettings: [
                // {
                //     measure: 'In_Stock',
                //     value1: 5000,
                //     conditions: 'LessThan',
                //     style: {
                //         backgroundColor: '#80cbc4',
                //         color: 'black',
                //         fontFamily: 'Tahoma',
                //         fontSize: '12px'
                //     }
                // },
                // {
                //     value1: 3400,
                //     value2: 40000,
                //     measure: 'Sold',
                //     conditions: 'Between',
                //     style: {
                //         backgroundColor: '#f48fb1',
                //         color: 'black',
                //         fontFamily: 'Tahoma',
                //         fontSize: '12px'
                //     }
                // }
            ]
    };

    this.format_button = new Button({ isPrimary: true });
    this.format_button.appendTo('#formatting');
    this.format_button.element.onclick = (): void => {
      this.pivotGridObj.conditionalFormattingModule.showConditionalFormattingDialog();
    }


    this.pdf_button = new Button({ isPrimary: true });
    this.pdf_button.appendTo('#pdf_export');

     this.pdf_button.element.onclick = (): void => {
         this.pdfExportProperties = {
            fileName:'sample.pdf',
            pageOrientation: 'Landscape',
            pageSize: 'Letter',
             header: {
                 fromTop: 0,
                 height: 130,
                 contents: [
                     {
                         type: 'Text',
                         value: "Pivot Table",
                         position: { x: 0, y: 50 },
                         style: { textBrushColor: '#000000', fontSize: 13, dashStyle:'Solid',hAlign:'Center' }
                     }
                 ]
             },
             footer: {
                 fromBottom: 160,
                 height: 150,
                 contents: [
                     {
                         type: 'PageNumber',
                         format: 'Page {$current} of {$total}',
                         position: { x: 0, y: 25 },
                         style: { textBrushColor: '#02007a', fontSize: 15 }
                     }
                 ]
               }
         };
         this.pivotGridObj.pdfExport(this.pdfExportProperties);
     };

    this.excel_button = new Button({ isPrimary: true });
    this.excel_button.appendTo('#excel_export');

    this.excel_button.element.onclick = (): void => {
      // this.excelExportProperties = {
      //     multipleExport: { type: 'AppendToSheet', blankRows: 0 }
      // };
      this.pivotGridObj.excelExport();
    };
  }
}
