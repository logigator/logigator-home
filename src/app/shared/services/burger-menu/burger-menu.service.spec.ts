import { TestBed } from '@angular/core/testing';

import { BurgerMenuService } from './burger-menu.service';

describe('BurgerMenuService', () => {
	beforeEach(() => TestBed.configureTestingModule({}));

	it('should be created', () => {
		const service: BurgerMenuService = TestBed.get(BurgerMenuService);
		expect(service).toBeTruthy();
	});
});
