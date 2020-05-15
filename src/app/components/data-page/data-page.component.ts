import { Component, OnInit, ViewChild } from '@angular/core';
import { ListView } from '@syncfusion/ej2-lists';
import { DataService } from '../../shared/data.service';
import { Chart } from 'chart.js';
import { parse } from 'date-fns';
import {FormControl, Validators} from '@angular/forms';
import { formatDate } from '@angular/common';
import * as $ from 'jquery';

import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

export interface ticker {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-data-page',
  templateUrl: './data-page.component.html',
  styleUrls: ['./data-page.component.css']
})

export class DataPageComponent implements OnInit{
  @ViewChild('element') element;

  public corrMatrix: any = [];
  public primaryXAxis: Object;
  public primaryYAxis: Object;
  public title: string;
  public crosshair: Object;
  public marker: Object;
  public PriceData: any = [];
  public chart: any = [];
  public chart1: any = [];
  public chart2: any = [];

  public isLoadingResults = true;

  brandControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);

  public tickers: ticker[] = [
    { value: 'EURSGD', viewValue: 'EURSGD' },
    { value: 'SOXX', viewValue: 'SOXX' },
    { value: 'HSI', viewValue: 'HSI' },
  ];
  public selectedTicker = this.tickers[0].value;

  constructor(
    public dataService: DataService
  ){ }

  loadCorr() {
   return this.dataService.GetCorr().subscribe((data: {}) => {
     this.corrMatrix = data;
   })
  }

  onChange(newValue) {
    console.log(newValue);
    this.selectedTicker = newValue;
    this.loadPriceData()
  }

  loadPriceData() {
     return this.dataService.GetIssue(this.selectedTicker).subscribe((data: {}) => {
       this.isLoadingResults = false;
       this.PriceData = data;
       this.chart = this.BuildChart(data)
     })
   }

   loadRadarData() {
      return this.dataService.GetRadar().subscribe((data: {}) => {
        this.chart1 = this.BuildChart1(data)
      })
    }

   loadScatterData() {
      return this.dataService.GetScatter().subscribe((data: {}) => {
        this.chart2 = this.BuildChart2(data)
      })
    }

  // loadPriceData() {
  //    return this.dataService.GetIssues().subscribe((data: {}) => {
  //      this.isLoadingResults = false;
  //      this.PriceData = data;
  //      this.chart = this.BuildChart(data)
  //    })
  //  }

  ngOnInit(): void {
     $(document).ready(function() {
        $('tr > td').each(function(index) {
            var score = $(this).text();
              if (score > 0) {
                  $(this).addClass('Positive');
              }
              else if (score < 0) {
                  $(this).addClass('Negative');
              }
            }
        );
    });
    this.loadCorr();
    this.loadPriceData()
    this.loadRadarData()
    this.loadScatterData()
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

    BuildChart1(values) {
      var ctx = document.getElementById("Chart1") as HTMLCanvasElement;
      var color = ["#ff6384", "#5959e6", "#2babab", "#8c4d15", "#8bc34a", "#607d8b", "#009688"];

      var X_val = values.map(function(e) {
         return e.X;
      });
      var open = values.map(function(e) {
         return e.A;
      });
      var high = values.map(function(e) {
         return e.B;
      });
      var low = values.map(function(e) {
         return e.C;
      });
      var close = values.map(function(e) {
         return e.D;
      });


      var Chart1 = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: X_val,
          datasets: [{
                  label: 'A',
                  borderColor: color[1],
                  pointBackgroundColor: color[1],
                  pointBorderColor: color[1],
                  pointHoverBackgroundColor: color[1],
                  pointHoverBorderColor: color[1],
                  data: open
              },
              {
                  label: 'B',
                  borderColor: color[2],
                  pointBackgroundColor: color[2],
                  pointBorderColor: color[2],
                  pointHoverBackgroundColor: color[2],
                  pointHoverBorderColor: color[2],
                  data: high
              },
              {
                  label: 'C',
                  borderColor: color[3],
                  pointBackgroundColor: color[3],
                  pointBorderColor: color[3],
                  pointHoverBackgroundColor: color[3],
                  pointHoverBorderColor: color[3],
                  data: low
              },
              {
                  label: 'D',
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
          title: {
                display: true,
                text: "Radar Data",
                position: "top",
                fontSize: 20,
                fontStyle: "bold"
            },
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: 'X'
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
      return Chart1;
      }

      BuildChart2(values) {
        var ctx = document.getElementById("Chart2") as HTMLCanvasElement;
        var color = ["#ff6384", "#5959e6", "#2babab", "#8c4d15", "#8bc34a", "#607d8b", "#009688"];

        var X_val = values.map(function(e) {
           return e.x;
        });
        var Y_val = values.map(function(e) {
           return e.y;
        });

        var Chart2 = new Chart(ctx, {
          type: 'line',
          data: {
            labels: X_val,
            datasets: [{
                    label: 'Y',
                    // backgroundColor: "transparent",
                    borderColor: color[1],
                    pointBackgroundColor: color[1],
                    pointBorderColor: color[1],
                    pointHoverBackgroundColor: color[1],
                    pointHoverBorderColor: color[1],
                    data: Y_val
                },
              ]
        },
          options: {
            legend: {position:"bottom"},
            title: {
                  display: true,
                  text: "Scatter Data",
                  position: "top",
                  fontSize: 20,
                  fontStyle: "bold"
              },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'X'
                }
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Values'
                }
              }]
            },
          }
        });
        return Chart2;
        }

}
