import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataPage1Component } from './data-page1.component';

describe('DataPage1Component', () => {
  let component: DataPage1Component;
  let fixture: ComponentFixture<DataPage1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataPage1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataPage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
