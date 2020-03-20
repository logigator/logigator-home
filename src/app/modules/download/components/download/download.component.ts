import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {EditorReleaseData} from '../../../../shared/models/http-responses/editor-release-data';
import {ApiService} from '../../../../shared/services/api/api.service';
import {ThemingService} from '../../../../shared/services/theming/theming.service';

@Component({
	selector: 'app-download',
	templateUrl: './download.component.html',
	styleUrls: ['./download.component.scss']
})
export class DownloadComponent implements OnInit {

	public editorReleaseData$: Observable<EditorReleaseData>;

	constructor(private api: ApiService, private themingService: ThemingService) { }

	ngOnInit() {
		this.editorReleaseData$ = this.api.getEditorReleaseData();
	}

	public get currentTheme(): string {
		return this.themingService.currentTheme;
	}

}
