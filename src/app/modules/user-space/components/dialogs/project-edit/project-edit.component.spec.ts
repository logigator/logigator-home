import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { ProjectEditComponent } from './project-edit.component';

describe('ProjectEditComponent', () => {
	let component: ProjectEditComponent;
	let fixture: ComponentFixture<ProjectEditComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ ProjectEditComponent ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProjectEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
