import { Component, OnInit, ElementRef } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
