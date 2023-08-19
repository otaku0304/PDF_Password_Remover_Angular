import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePasswordComponent } from './remove-password.component';

describe('RemovePasswordComponent', () => {
  let component: RemovePasswordComponent;
  let fixture: ComponentFixture<RemovePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemovePasswordComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RemovePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
