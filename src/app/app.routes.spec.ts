import { routes } from './app.routes';

describe('App Routes', () => {
    it('should have routes defined', () => {
        expect(routes).toBeDefined();
        expect(routes.length).toBeGreaterThan(0);
    });

    it('should have docs route', () => {
        const docsRoute = routes.find(r => r.path === 'docs');
        expect(docsRoute).toBeDefined();
        expect(docsRoute?.loadComponent).toBeDefined();
    });

    it('should have privacy route with title and data', () => {
        const privacyRoute = routes.find(r => r.path === 'privacy');
        expect(privacyRoute).toBeDefined();
        expect(privacyRoute?.title).toBe('Privacy Policy - PDF Tools');
        expect(privacyRoute?.data).toBeDefined();
        expect(privacyRoute?.data?.['description']).toContain('privacy policy');
    });

    it('should have home route', () => {
        const homeRoute = routes.find(r => r.path === '');
        expect(homeRoute).toBeDefined();
        expect(homeRoute?.title).toBe('Home - PDF & Image Tools');
        expect(homeRoute?.loadComponent).toBeDefined();
    });

    it('should have image/select-image route', () => {
        const imageRoute = routes.find(r => r.path === 'image/select-image');
        expect(imageRoute).toBeDefined();
        expect(imageRoute?.title).toBe('Select Image - Image Compressor');
    });

    it('should have wildcard route for 404', () => {
        const notFoundRoute = routes.find(r => r.path === '**');
        expect(notFoundRoute).toBeDefined();
        expect(notFoundRoute?.title).toBe('Page Not Found');
    });

    it('should load components lazily', async () => {
        const docsRoute = routes.find(r => r.path === 'docs');
        if (docsRoute?.loadComponent) {
            const component = await docsRoute.loadComponent();
            expect(component).toBeDefined();
        }
    });
});
