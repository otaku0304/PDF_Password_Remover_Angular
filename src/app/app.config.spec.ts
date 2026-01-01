import { TestBed } from '@angular/core/testing';
import { appConfig } from './app.config';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

describe('appConfig', () => {
    it('should provide router', () => {
        TestBed.configureTestingModule(appConfig);
        const router = TestBed.inject(Router);
        expect(router).toBeTruthy();
    });

    it('should provide HttpClient with fetch', () => {
        TestBed.configureTestingModule(appConfig);
        const httpClient = TestBed.inject(HttpClient);
        expect(httpClient).toBeTruthy();
    });

    it('should have providers array', () => {
        expect(appConfig.providers).toBeDefined();
        expect(appConfig.providers.length).toBeGreaterThan(0);
    });
});
