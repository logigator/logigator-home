import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {EditorReleaseData} from '../../../../shared/models/http-responses/editor-release-data';
import {ApiService} from '../../../../shared/services/api/api.service';

@Component({
	selector: 'app-download',
	templateUrl: './download.component.html',
	styleUrls: ['./download.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadComponent implements OnInit {

	public editorReleaseData$: Observable<EditorReleaseData>;

	constructor(private api: ApiService) { }

	ngOnInit() {
		this.editorReleaseData$ = this.api.getEditorReleaseData();
	}

}
