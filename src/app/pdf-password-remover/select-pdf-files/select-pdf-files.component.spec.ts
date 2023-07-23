import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPdfFilesComponent } from './select-pdf-files.component';

describe('SelectPdfFilesComponent', () => {
  let component: SelectPdfFilesComponent;
  let fixture: ComponentFixture<SelectPdfFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPdfFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPdfFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
