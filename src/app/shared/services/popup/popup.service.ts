import {
	ApplicationRef,
	ComponentFactoryResolver,
	EmbeddedViewRef,
	Injectable,
	Injector,
	TemplateRef,
	Type
} from '@angular/core';
import {PopupContentComp} from '../../components/popup/popup-content-comp';
import {PopupComponent} from '../../components/popup/popup.component';

@Injectable({
	providedIn: 'root'
})
export class PopupService {

	constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
		private appRef: ApplicationRef,
		private injector: Injector
	) { }

	public showPopup(popupContentComp: Type<PopupContentComp>, componentFactoryResolver: ComponentFactoryResolver, title: string, closeOnClickOutside = true): Promise<void> {
		return new Promise<void>(resolve => {
			const popupFactory = this.componentFactoryResolver.resolveComponentFactory(PopupComponent);
			const popupRef = popupFactory.create(this.injector);
			popupRef.instance.title = title;
			popupRef.instance.closeOnClickOutside = closeOnClickOutside;
			popupRef.instance.contentComp = componentFactoryResolver.resolveComponentFactory(popupContentComp);
			this.appRef.attachView(popupRef.hostView);
			const domElem = (popupRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
			document.body.appendChild(domElem);

			const subscription = popupRef.instance.requestClose.subscribe(() => {
				this.appRef.detachView(popupRef.hostView);
				popupRef.destroy();
				subscription.unsubscribe();
				resolve();
			});
		});
	}
}
