import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../shared/data.service';
import { Chart } from 'chart.js';
import { parse } from 'date-fns';
import { formatDate } from '@angular/common';
import * as xlsx from 'xlsx';


@Component({
  selector: 'app-data-page1',
  templateUrl: './data-page1.component.html',
  styleUrls: ['./data-page1.component.css']
})
export class DataPage1Component implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;

  IssuesList: any = [];
  chart: any = [];
  isLoadingResults = true;


  ngOnInit() {
    this.loadEmployees();
  }

  constructor(
    public dataService: DataService
  ){ }

   // Issues list
   loadEmployees() {
    return this.dataService.GetIssue("EURSGD").subscribe((data: {}) => {
      this.isLoadingResults = false;
      this.IssuesList = data;
      this.chart = this.BuildChart(data)
    })
  }

  exportToExcel() {
   const ws: xlsx.WorkSheet =
   xlsx.utils.table_to_sheet(this.epltable.nativeElement);
   const wb: xlsx.WorkBook = xlsx.utils.book_new();
   xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
   xlsx.writeFile(wb, 'data.xlsx');
  }

  BuildChart(values) {
    var ctx = document.getElementById("myChart") as HTMLCanvasElement;
    var color = ["#ff6384", "#5959e6", "#2babab", "#8c4d15", "#8bc34a", "#607d8b", "#009688"];

    var dates = values.map(function(e) {
        return formatDate(parse(e.Date, 'd/M/yyyy', new Date()), 'MMM-yyyy', 'en-US');
    });
    var open = values.map(function(e) {
       return e.Open;
    });
    var high = values.map(function(e) {
       return e.High;
    });
    var low = values.map(function(e) {
       return e.Low;
    });
    var close = values.map(function(e) {
       return e.Close;
    });


    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
                label: 'A',
                backgroundColor: "transparent",
                borderColor: color[1],
                pointBackgroundColor: color[1],
                pointBorderColor: color[1],
                pointHoverBackgroundColor: color[1],
                pointHoverBorderColor: color[1],
                data: open
            },
            {
                label: 'B',
                backgroundColor: "transparent",
                borderColor: color[2],
                pointBackgroundColor: color[2],
                pointBorderColor: color[2],
                pointHoverBackgroundColor: color[2],
                pointHoverBorderColor: color[2],
                data: high
            },
            {
                label: 'C',
                backgroundColor: "transparent",
                borderColor: color[3],
                pointBackgroundColor: color[3],
                pointBorderColor: color[3],
                pointHoverBackgroundColor: color[3],
                pointHoverBorderColor: color[3],
                data: low
            },
            {
                label: 'D',
                backgroundColor: "transparent",
                borderColor: color[4],
                pointBackgroundColor: color[4],
                pointBorderColor: color[4],
                pointHoverBackgroundColor: color[4],
                pointHoverBorderColor: color[4],
                data: close
            },
          ]
    },
      options: {
        legend: {position:"bottom"},
        // title: {
        //       display: true,
        //       text: "Price Data",
        //       position: "top",
        //       fontSize: 20,
        //       fontStyle: "bold"
        //   },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Date'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Price'
            }
          }]
        },
      }
    });
    return myChart;
    }

}
