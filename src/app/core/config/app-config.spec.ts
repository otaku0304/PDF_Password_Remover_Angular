import { environment } from './../../../environments/environment';
import { AppConfig } from './app.config';

describe('AppConfig', () => {
  beforeEach(() => {
    Object.defineProperty(environment, 'apiUrl', {
      value: 'https://mock-api.example.com',
      configurable: true,
    });

    Object.defineProperty(environment, 'siteUrl', {
      value: 'https://mock-site.example.com',
      configurable: true,
    });

    Object.defineProperty(environment, 'navigateToi18n', {
      value: 'https://mock-i18n.example.com',
      configurable: true,
    });
  });

  it('should return the correct API URI', () => {
    expect(AppConfig.getAPIURI()).toBe('https://mock-api.example.com');
  });

  it('should return the correct Site URL', () => {
    expect(AppConfig.getSiteURL()).toBe('https://mock-site.example.com');
  });

  it('should return the correct I18n URL', () => {
    expect(AppConfig.getI18nUrl()).toBe('https://mock-i18n.example.com');
  });
});
