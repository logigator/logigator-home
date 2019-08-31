import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import { AuthCallbackComponent } from './components/auth-callback/auth-callback.component';

export const HOME_ROUTES: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'auth-callback',
		component: AuthCallbackComponent
		// for authentication to work, in production there should be a rewrite to a empty HTML file,
		// because bootstrapping the entire app for auth is useless
	},
];

@NgModule({
	declarations: [
		HomeComponent,
		AuthCallbackComponent
	],
	imports: [
		RouterModule,
		CommonModule
	]
})
export class HomeModule { }
