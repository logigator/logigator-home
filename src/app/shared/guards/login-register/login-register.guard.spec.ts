import { TestBed, async, inject } from '@angular/core/testing';

import { LoginRegisterGuard } from './login-register.guard';

describe('LoginRegisterGuard', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LoginRegisterGuard]
		});
	});

	it('should ...', inject([LoginRegisterGuard], (guard: LoginRegisterGuard) => {
		expect(guard).toBeTruthy();
	}));
});
