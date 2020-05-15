import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';

import { NgModule } from '@angular/core';
import { CategoryService, LegendService, TooltipService, DataLabelService, LineSeriesService, DateTimeService,CrosshairService} from '@syncfusion/ej2-angular-charts';
import { ChartModule, ChartAllModule, StockChartAllModule } from '@syncfusion/ej2-angular-charts';
import { DialogAllModule } from '@syncfusion/ej2-angular-popups';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { PivotViewModule } from '@syncfusion/ej2-angular-pivotview';
import { RouterModule, Routes } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataService } from './shared/data.service';

import { DatePipe } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BackupComponent } from './backup/backup.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ViewPDFComponent } from './components/view-pdf/view-pdf.component';
import { DataPageComponent } from './components/data-page/data-page.component';
import { DataPage1Component } from './components/data-page1/data-page1.component';
import { ExcelComponent } from './components/excel/excel.component';
import { DatabaseComponent } from './components/database/database.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
      BrowserModule,
      ChartModule,
      StockChartAllModule,
      MenuModule,
      ChartAllModule,
      DialogAllModule,
      AppRoutingModule,
      MatListModule,
      MatIconModule,
      MatToolbarModule,
      MatSidenavModule,
      MatButtonModule,
      MatMenuModule,
      MatProgressSpinnerModule,
      MatTableModule,
      MatSelectModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      MDBBootstrapModule.forRoot(),
      MatFormFieldModule,
      NgxExtendedPdfViewerModule,
      PivotViewModule,
      SpreadsheetAllModule
  ],
  exports: [
    RouterModule,
    MenuComponent,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule],
  declarations: [
    AppComponent,
    DashboardComponent,
    MenuComponent,
    NoPageFoundComponent,
    BackupComponent,
    ViewPDFComponent,
    DataPageComponent,
    DataPage1Component,
    ExcelComponent,
    DatabaseComponent,
    FooterComponent,
  ],
  providers: [
      CategoryService,
      LegendService,
      TooltipService,
      DataLabelService,
      LineSeriesService,
      DateTimeService,
      CrosshairService,
      DataService,
      DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
