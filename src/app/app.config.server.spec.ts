import { config } from './app.config.server';

describe('app.config.server', () => {
    it('should export config', () => {
        expect(config).toBeDefined();
    });

    it('should have providers array', () => {
        expect(config.providers).toBeDefined();
        expect(Array.isArray(config.providers)).toBeTrue();
    });

    it('should merge server and app config', () => {
        expect(config.providers.length).toBeGreaterThan(0);
    });
});
