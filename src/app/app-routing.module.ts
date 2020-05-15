import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from '../app/menu/menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { BackupComponent } from './backup/backup.component';
import { ViewPDFComponent } from './components/view-pdf/view-pdf.component';
import { DataPageComponent } from './components/data-page/data-page.component';
import { DataPage1Component } from './components/data-page1/data-page1.component';
import { ExcelComponent } from './components/excel/excel.component';
import { DatabaseComponent } from './components/database/database.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'backup', component: BackupComponent },
  { path: 'pdf-viewer', component: ViewPDFComponent },
  { path: 'test-data', component: DataPageComponent },
  { path: 'test-data-1', component: DataPage1Component },
  { path: 'database', component: DatabaseComponent },
  { path: 'excel', component: ExcelComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NoPageFoundComponent },
  ]
  ;

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
