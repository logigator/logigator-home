import {TestBed} from '@angular/core/testing';

import {ApiService} from './api.service';

describe('ApiServiceService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: ApiService = TestBed.inject(ApiService);
		expect(service).toBeTruthy();
	});
});
