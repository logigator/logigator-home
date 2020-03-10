import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import { ExamplesComponent } from './components/examples/examples.component';
import {SharedModule} from '../../shared/shared.module';
import {SlideshowModule} from 'ng-simple-slideshow';
import {TranslateModule} from '@ngx-translate/core';
import {LoginRegisterGuard} from '../../shared/guards/login-register/login-register.guard';
import {
	LogigatorSharedCompsModule,
	LoginPopupComponent,
	RegisterPopupComponent
} from '@logigator/logigator-shared-comps';

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
		ExamplesComponent
	],
	imports: [
		RouterModule,
		CommonModule,
		SharedModule,
		SlideshowModule,
		LogigatorSharedCompsModule,
		TranslateModule.forChild()
	]
})
export class HomeModule { }
