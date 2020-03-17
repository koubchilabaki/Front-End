import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQualificatifComponent } from './add-qualificatif.component';

describe('AddQualificatifComponent', () => {
  let component: AddQualificatifComponent;
  let fixture: ComponentFixture<AddQualificatifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQualificatifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQualificatifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
