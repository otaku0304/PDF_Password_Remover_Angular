import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'docs',
    loadComponent: () =>
      import('./pdf-password-remover/api-docs/api-docs.component').then(
        (m) => m.ApiDocsComponent
      )
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./pdf-password-remover/privacy/privacy.component').then(
        (m) => m.PrivacyComponent
      ),
    title: 'Privacy Policy - PDF Tools',
    data: {
      description:
        'Read our privacy policy to understand how we handle your data securely.',
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
