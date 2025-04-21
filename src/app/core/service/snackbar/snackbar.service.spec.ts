import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarService } from './snackbar.service';

describe('SnackbarService', () => {
  let service: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BrowserAnimationsModule],
      providers: [MatSnackBar],
    });
    service = TestBed.inject(SnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should open a snackbar with the provided message and class name', () => {
    const message = 'Test message';
    const className = 'test-class';
    spyOn(service, 'openSnackBar').and.callThrough();
    service.openSnackBar(message, className);
    expect(service.openSnackBar).toHaveBeenCalled();
  });
});
