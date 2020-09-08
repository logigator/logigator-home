import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgerMenuComponent } from './burger-menu.component';

describe('BurgerMenuComponent', () => {
	let component: BurgerMenuComponent;
	let fixture: ComponentFixture<BurgerMenuComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ BurgerMenuComponent ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(BurgerMenuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
