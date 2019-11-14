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
import {LoginPopupComponent} from '../../shared/components/login-popup/login-popup.component';
import {RegisterPopupComponent} from '../../shared/components/register-popup/register-popup.component';
import {LoginRegisterGuard} from '../../shared/guards/login-register/login-register.guard';

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
