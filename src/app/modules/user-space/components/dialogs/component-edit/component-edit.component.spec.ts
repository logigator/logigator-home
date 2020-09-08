import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { ComponentEditComponent } from './component-edit.component';

describe('ComponentEditComponent', () => {
	let component: ComponentEditComponent;
	let fixture: ComponentFixture<ComponentEditComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ ComponentEditComponent ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ComponentEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
