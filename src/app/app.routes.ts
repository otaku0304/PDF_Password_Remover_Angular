import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pdf/select-pdf-files',
    loadComponent: () =>
      import(
        './pdf-password-remover/select-pdf-files/select-pdf-files.component'
      ).then((m) => m.SelectPdfFilesComponent),
    title: 'Select PDF Files - PDF Tools',
    data: {
      description: 'Upload and select PDF files to remove passwords securely.',
    },
  },
  {
    path: 'pdf/remove-password',
    loadComponent: () =>
      import(
        './pdf-password-remover/remove-password/remove-password.component'
      ).then((m) => m.RemovePasswordComponent),
    title: 'Remove PDF Password - PDF Tools',
    data: {
      description: 'Easily remove passwords from your PDF documents.',
    },
  },
  {
    path: 'pdf/download',
    loadComponent: () =>
      import(
        './pdf-password-remover/download/download.component'
      ).then((m) => m.DownloadComponent),
    title: 'Remove PDF Password - PDF Tools',
    data: {
      description: 'Download your PDF files after removing passwords.',
    },
  },
  {
    path: '',
    loadComponent: () =>
      import('./feature/landing/landing.component').then(
        (m) => m.LandingComponent
      ),
    title: 'Home - PDF & Image Tools',
    data: {
      description:
        'Welcome to the best tools for working with PDF and image files.',
    },
  },
  {
    path: 'image/select-image',
    loadComponent: () =>
      import('./image-compressor/select-image/select-image.component').then(
        (m) => m.SelectImageComponent
      ),
    title: 'Select Image - Image Compressor',
    data: {
      description: 'Upload and compress your images quickly and efficiently.',
    },
  },
  {
    path: '**',
    loadComponent: () =>
      import('./feature/page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent
      ),
    title: 'Page Not Found',
    data: {
      description: 'Sorry, the page you’re looking for doesn’t exist.',
    },
  },
];
