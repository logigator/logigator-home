import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { ProjectInfoComponent } from './project-info.component';

describe('ProjectInfoComponent', () => {
	let component: ProjectInfoComponent;
	let fixture: ComponentFixture<ProjectInfoComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ ProjectInfoComponent ]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProjectInfoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
