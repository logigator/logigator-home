import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ElectronDownloadData} from '../../../../shared/models/http-responses/electron-download-data';
import {ApiService} from '../../../../shared/services/api/api.service';

@Component({
	selector: 'app-download',
	templateUrl: './download.component.html',
	styleUrls: ['./download.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadComponent implements OnInit {

	public electronDownloadData$: Observable<ElectronDownloadData>;

	constructor(private api: ApiService) { }

	ngOnInit() {
		this.electronDownloadData$ = this.api.getElectronDownloadData();
	}

}
