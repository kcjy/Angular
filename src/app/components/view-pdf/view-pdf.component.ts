import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.css']
})
export class ViewPDFComponent implements OnInit {

  public src = 'assets/example.pdf';

  constructor() { }

  ngOnInit(): void {
  }

}
