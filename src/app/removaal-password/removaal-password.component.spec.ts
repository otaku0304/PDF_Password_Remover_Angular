import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovaalPasswordComponent } from './removaal-password.component';

describe('RemovaalPasswordComponent', () => {
  let component: RemovaalPasswordComponent;
  let fixture: ComponentFixture<RemovaalPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemovaalPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemovaalPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
