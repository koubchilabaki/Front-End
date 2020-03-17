import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQualificatifComponent } from './edit-qualificatif.component';

describe('EditQualificatifComponent', () => {
  let component: EditQualificatifComponent;
  let fixture: ComponentFixture<EditQualificatifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQualificatifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQualificatifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
