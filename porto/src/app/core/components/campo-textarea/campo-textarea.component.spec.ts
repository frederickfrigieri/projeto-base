import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampoTextareaComponent } from './campo-textarea.component';

describe('CampoTextareaComponent', () => {
  let component: CampoTextareaComponent;
  let fixture: ComponentFixture<CampoTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampoTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampoTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
