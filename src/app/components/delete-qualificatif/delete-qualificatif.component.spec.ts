import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQualificatifComponent } from './delete-qualificatif.component';

describe('DeleteQualificatifComponent', () => {
  let component: DeleteQualificatifComponent;
  let fixture: ComponentFixture<DeleteQualificatifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteQualificatifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteQualificatifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
