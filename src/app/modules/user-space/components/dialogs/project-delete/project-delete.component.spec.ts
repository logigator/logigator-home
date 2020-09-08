import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { ProjectDeleteComponent } from './project-delete.component';

describe('ProjectDeleteComponent', () => {
	let component: ProjectDeleteComponent;
	let fixture: ComponentFixture<ProjectDeleteComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ ProjectDeleteComponent ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProjectDeleteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
