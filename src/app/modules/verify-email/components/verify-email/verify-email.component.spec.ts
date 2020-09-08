import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { VerifyEmailComponent } from './verify-email.component';

describe('VerifyEmailComponent', () => {
	let component: VerifyEmailComponent;
	let fixture: ComponentFixture<VerifyEmailComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ VerifyEmailComponent ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(VerifyEmailComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
