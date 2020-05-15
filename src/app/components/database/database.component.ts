import { Component, OnInit, ViewChild  } from '@angular/core';
import { SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
import { DataManager, Query } from '@syncfusion/ej2-data';


@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {

  @ViewChild('spreadsheet') public spreadsheetObj: SpreadsheetComponent;
  public query: Query = new Query().select(['OrderID', 'CustomerID', 'ShipName', 'ShipCity', 'ShipCountry', 'Freight']).take(200);
  public data: DataManager = new DataManager({
      url: 'https://js.syncfusion.com/demos/ejServices//wcf/Northwind.svc/Orders',
      crossDomain: true
  });
  constructor() { }

  ngOnInit(): void {
    this.data = this.data;
  }

}
