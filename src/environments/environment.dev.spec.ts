import { environment } from './environment.dev';

describe('Environment Dev', () => {
    it('should have production set to false', () => {
        expect(environment.production).toBeFalse();
    });

    it('should have development set to true', () => {
        expect(environment.development).toBeTrue();
    });

    it('should have local set to false', () => {
        expect(environment.local).toBeFalse();
    });

    it('should have apiUrl defined', () => {
        expect(environment.apiUrl).toBeDefined();
        expect(environment.apiUrl).toContain('dev-pdf-flask');
    });

    it('should have siteUrl defined', () => {
        expect(environment.siteUrl).toBeDefined();
        expect(environment.siteUrl).toContain('pdf-password-remover-angular');
    });

    it('should have navigateToi18n defined', () => {
        expect(environment.navigateToi18n).toBeDefined();
        expect(environment.navigateToi18n).toContain('internationalization');
    });
});
