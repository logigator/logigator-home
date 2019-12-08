import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import { ExamplesComponent } from './components/examples/examples.component';
import { TutorialsComponent } from './components/tutorials/tutorials.component';
import {SharedModule} from '../../shared/shared.module';
import { BackgroundImageComponent } from './components/background-image/background-image.component';
import {SlideshowModule} from 'ng-simple-slideshow';
import {TranslateModule} from '@ngx-translate/core';
import {LoginRegisterGuard} from '../../shared/guards/login-register/login-register.guard';
import {LoginPopupComponent, RegisterPopupComponent} from '@logigator/logigator-shared-comps';

export const HOME_ROUTES: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'login',
		component: LoginPopupComponent,
		canActivate: [ LoginRegisterGuard ],
		canActivateChild: [ LoginRegisterGuard ]
	},
	{
		path: 'register',
		component: RegisterPopupComponent,
		canActivate: [ LoginRegisterGuard ],
		canActivateChild: [ LoginRegisterGuard ]
	}
];

@NgModule({
	declarations: [
		HomeComponent,
		ExamplesComponent,
		TutorialsComponent,
		BackgroundImageComponent
	],
	imports: [
		RouterModule,
		CommonModule,
		SharedModule,
		SlideshowModule,
		TranslateModule.forChild()
	]
})
export class HomeModule { }
