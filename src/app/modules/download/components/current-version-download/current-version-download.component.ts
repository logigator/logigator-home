import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {
	ElectronDownloadOption,
	ElectronPlatform,
	ElectronVersion
} from '../../../../shared/models/http-responses/electron-download-data';

@Component({
	selector: 'app-current-version-download',
	templateUrl: './current-version-download.component.html',
	styleUrls: ['./current-version-download.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentVersionDownloadComponent implements OnInit {

	public windowsDownloadOptions: ElectronDownloadOption[];
	public linuxDownloadOptions: ElectronDownloadOption[];

	@Input()
	private downloadData: ElectronVersion;

	constructor() { }

	ngOnInit(): void {
		this.windowsDownloadOptions = this.getDownloadsOptions('windows');
		this.linuxDownloadOptions = this.getDownloadsOptions('linux');
	}


	private getDownloadsOptions(platform: ElectronPlatform): ElectronDownloadOption[] {
		const downloadOptions: ElectronDownloadOption[] = [];
		for (const arch in this.downloadData.platforms[platform]) {
			downloadOptions.push({
				...this.downloadData.platforms[platform][arch],
				...{
					date: this.downloadData.date,
					version: this.downloadData.version
				}
			});
		}
		return downloadOptions;
	}

}
