import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfPasswordRemoverComponent } from './pdf-password-remover.component';

describe('PdfPasswordRemoverComponent', () => {
  let component: PdfPasswordRemoverComponent;
  let fixture: ComponentFixture<PdfPasswordRemoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfPasswordRemoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfPasswordRemoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
