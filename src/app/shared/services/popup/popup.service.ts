import {
	ApplicationRef,
	ComponentFactoryResolver,
	EmbeddedViewRef, Inject,
	Injectable,
	Injector,
	TemplateRef,
	Type
} from '@angular/core';
import {PopupContentComp} from '../../components/popup/popup-content-comp';
import {PopupComponent} from '../../components/popup/popup.component';
import {DOCUMENT} from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class PopupService {

	constructor(
		private componentFactoryResolver: ComponentFactoryResolver,
		private appRef: ApplicationRef,
		private injector: Injector,
		@Inject(DOCUMENT) private document: Document
	) { }

	public showPopup(
		popupContentComp: Type<PopupContentComp>,
		componentFactoryResolver: ComponentFactoryResolver,
		title: string,
		closeOnClickOutside: boolean,
		contentComponentInput?: any
	): Promise<any> {
		return new Promise<void>(resolve => {
			const popupFactory = this.componentFactoryResolver.resolveComponentFactory(PopupComponent);
			const popupRef = popupFactory.create(this.injector);
			popupRef.instance.title = title;
			popupRef.instance.closeOnClickOutside = closeOnClickOutside;
			popupRef.instance.contentCompInput = contentComponentInput;
			popupRef.instance.contentComp = componentFactoryResolver.resolveComponentFactory(popupContentComp);
			this.appRef.attachView(popupRef.hostView);
			const domElem = (popupRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
			this.document.body.appendChild(domElem);

			const subscription = popupRef.instance.requestClose.subscribe(output => {
				this.appRef.detachView(popupRef.hostView);
				popupRef.destroy();
				subscription.unsubscribe();
				resolve(output);
			});
		});
	}
}
