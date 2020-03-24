import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRubriqueComposeComponent } from './list-rubrique-compose.component';

describe('ListRubriqueComposeComponent', () => {
  let component: ListRubriqueComposeComponent;
  let fixture: ComponentFixture<ListRubriqueComposeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRubriqueComposeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRubriqueComposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
