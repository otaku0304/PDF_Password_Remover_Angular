import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectPdfFilesComponent } from './select-pdf-files.component';
import { SnackbarService } from './../../core/service/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { PdfService } from '../../core/service/pdf/pdf.service';

describe('SelectPdfFilesComponent', () => {
  let component: SelectPdfFilesComponent;
  let fixture: ComponentFixture<SelectPdfFilesComponent>;
  let snackBarService: jasmine.SpyObj<SnackbarService>;
  let router: jasmine.SpyObj<Router>;
  let pdfService: jasmine.SpyObj<PdfService>;

  beforeEach(() => {
    snackBarService = jasmine.createSpyObj('SnackbarService', ['openSnackBar']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    pdfService = jasmine.createSpyObj('PdfService', [
      'setSelectedPdfFile',
      'setEncryptionStatus',
    ]);

    TestBed.configureTestingModule({
      imports: [SelectPdfFilesComponent],
      providers: [
        { provide: SnackbarService, useValue: snackBarService },
        { provide: Router, useValue: router },
        { provide: PdfService, useValue: pdfService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectPdfFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle file selection and add valid PDF files', () => {
    const files = [
      new File(['content'], 'test1.pdf', { type: 'application/pdf' }),
      new File(['content'], 'test2.pdf', { type: 'application/pdf' }),
    ];
    const event = {
      target: { files: files },
    } as unknown as Event;

    component.onFilesSelected(event);

    expect(component.selectedFiles.length).toBe(2);
    expect(component.selectedFiles[0].name).toBe('test1.pdf');
    expect(component.selectedFiles[1].name).toBe('test2.pdf');
  });

  it('should show a snack bar if non-PDF files are selected', () => {
    const files = [
      new File(['content'], 'test1.pdf', { type: 'application/pdf' }),
      new File(['content'], 'test2.txt', { type: 'text/plain' }),
    ];
    const event = {
      target: { files: files },
    } as unknown as Event;

    component.onFilesSelected(event);

    expect(snackBarService.openSnackBar).toHaveBeenCalledWith(
      'Please select a valid PDF file.',
      'Ok'
    );
    expect(component.selectedFiles.length).toBe(1);
  });

  it('should show a snack bar when the maximum file limit is reached', () => {
    component.selectedFiles = [
      new File(['content'], 'test1.pdf', { type: 'application/pdf' }),
      new File(['content'], 'test2.pdf', { type: 'application/pdf' }),
      new File(['content'], 'test3.pdf', { type: 'application/pdf' }),
      new File(['content'], 'test4.pdf', { type: 'application/pdf' }),
      new File(['content'], 'test5.pdf', { type: 'application/pdf' }),
    ];

    const files = [
      new File(['content'], 'test6.pdf', { type: 'application/pdf' }),
    ];
    const event = {
      target: { files: files },
    } as unknown as Event;

    component.onFilesSelected(event);

    expect(snackBarService.openSnackBar).toHaveBeenCalledWith(
      'You can select a maximum of 5 PDF files.',
      'Ok'
    );
    expect(component.selectedFiles.length).toBe(5);
  });

  it('should handle drag over event', () => {
    const event = {
      preventDefault: jasmine.createSpy(),
    } as unknown as DragEvent;

    component.onDragOver(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should handle drop event and select files', () => {
    const files = [
      new File(['content'], 'test1.pdf', { type: 'application/pdf' }),
      new File(['content'], 'test2.pdf', { type: 'application/pdf' }),
    ];

    const dataTransferMock = {
      files: files,
    };

    const event = {
      preventDefault: jasmine.createSpy(),
      dataTransfer: dataTransferMock,
    } as unknown as DragEvent;
    component.onDrop(event);

    expect(component.selectedFiles.length).toBe(2);
    expect(component.selectedFiles[0].name).toBe('test1.pdf');
    expect(component.selectedFiles[1].name).toBe('test2.pdf');
  });

  it('should remove selected file when removeSelectedFile is called', () => {
    const file1 = new File(['content'], 'test1.pdf', {
      type: 'application/pdf',
    });
    const file2 = new File(['content'], 'test2.pdf', {
      type: 'application/pdf',
    });
    component.selectedFiles = [file1, file2];

    component.removeSelectedFile(file1);

    expect(component.selectedFiles.length).toBe(1);
    expect(component.selectedFiles[0]).toBe(file2);
  });

  it('should check encryption status and navigate correctly', async () => {
    const files = [
      new File(['content'], 'test1.pdf', { type: 'application/pdf' }),
    ];
    const event = {
      target: { files: files },
    } as unknown as Event;

    spyOn(component, 'checkEncryptionStatus').and.returnValue(
      Promise.resolve(false)
    );

    component.onFilesSelected(event);
    await component.submitFiles();

    expect(snackBarService.openSnackBar).toHaveBeenCalledWith(
      'test1.pdf has no password',
      'error-snackbar'
    );
  });

  it('should navigate to remove password page when all files are encrypted', async () => {
    const files = [
      new File(['content'], 'test1.pdf', { type: 'application/pdf' }),
    ];
    const event = {
      target: { files: files },
    } as unknown as Event;

    spyOn(component, 'checkEncryptionStatus').and.returnValue(
      Promise.resolve(true)
    );

    component.onFilesSelected(event);
    await component.submitFiles();

    expect(pdfService.setSelectedPdfFile).toHaveBeenCalledWith(files);
    expect(pdfService.setEncryptionStatus).toHaveBeenCalledWith(true);
    expect(router.navigate).toHaveBeenCalledWith(['/pdf/remove-password']);
  });

  it('should show a snack bar for unencryped files during submit', async () => {
    const files = [
      new File(['content'], 'test1.pdf', { type: 'application/pdf' }),
      new File(['content'], 'test2.pdf', { type: 'application/pdf' }),
    ];
    const event = {
      target: { files: files },
    } as unknown as Event;

    spyOn(component, 'checkEncryptionStatus').and.returnValue(
      Promise.resolve(false)
    );

    component.onFilesSelected(event);
    await component.submitFiles();

    expect(snackBarService.openSnackBar).toHaveBeenCalledWith(
      'test1.pdf, test2.pdf have no password',
      'error-snackbar'
    );
  });

  it('should resolve true if file content includes /Encrypt', async () => {
    const file = new File(['/Encrypt'], 'test.pdf', {
      type: 'application/pdf',
    });

    const result = await component.checkEncryptionStatus(file);
    expect(result).toBeTrue();
  });

  it('should resolve false if file content does not include /Encrypt', async () => {
    const file = new File(['Some random content'], 'test.pdf', {
      type: 'application/pdf',
    });

    const result = await component.checkEncryptionStatus(file);
    expect(result).toBeFalse();
  });

  it('should create a file input and trigger click', () => {
    const clickSpy = jasmine.createSpy();
    const createElementSpy = spyOn(document, 'createElement').and.callFake(
      () => {
        return {
          type: '',
          accept: '',
          multiple: false,
          onchange: null,
          click: clickSpy,
        } as unknown as HTMLInputElement;
      }
    );

    component.openFileExplorer();

    expect(createElementSpy).toHaveBeenCalledWith('input');
    expect(clickSpy).toHaveBeenCalled();
  });
});
