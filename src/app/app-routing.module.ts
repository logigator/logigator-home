import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HOME_ROUTES} from './modules/home/home.module';
import {AuthGuard} from './shared/guards/auth/auth.guard';


const routes: Routes = [
	{
		path: '',
		children: HOME_ROUTES
	},
	{
		path: 'impressum',
		loadChildren: () => import('./modules/impressum/impressum.module').then(m => m.ImpressumModule)
	},
	{
		path: 'privacy-policy',
		loadChildren: () => import('./modules/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
	},
	{
		path: 'my',
		loadChildren: () => import('./modules/user-space/user-space.module').then(m => m.UserSpaceModule),
		canActivate: [ AuthGuard ],
		canActivateChild: [ AuthGuard ],
		canLoad: [ AuthGuard ]
	},
	{
		path: '404',
		loadChildren: () => import('./modules/not-found/not-found.module').then(m => m.NotFoundModule)
	},
	{path: '**', redirectTo: '/404'}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
