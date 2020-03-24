import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RubriqueComposeComponent } from './rubrique-compose.component';

describe('RubriqueComposeComponent', () => {
  let component: RubriqueComposeComponent;
  let fixture: ComponentFixture<RubriqueComposeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RubriqueComposeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RubriqueComposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
