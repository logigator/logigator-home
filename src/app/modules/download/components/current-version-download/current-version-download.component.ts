import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {
	EditorReleaseData,
	EditorDownloadOption
} from '../../../../shared/models/http-responses/editor-release-data';

@Component({
	selector: 'app-current-version-download',
	templateUrl: './current-version-download.component.html',
	styleUrls: ['./current-version-download.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentVersionDownloadComponent implements OnInit {

	public windowsDownloadOptions: EditorDownloadOption[];
	public linuxDownloadOptions: EditorDownloadOption[];

	@Input()
	private downloadData: EditorReleaseData;

	constructor() { }

	ngOnInit(): void {
		this.windowsDownloadOptions = this.getDownloadsOptions('win32');
		this.linuxDownloadOptions = this.getDownloadsOptions('linux');
	}


	private getDownloadsOptions(platform: string): EditorDownloadOption[] {
		const downloadOptions: EditorDownloadOption[] = [];
		for (const asset of this.downloadData.assets) {
			if (asset.name.includes(platform)) {
				downloadOptions.push({
					date: this.downloadData.published_at,
					fileName: asset.name,
					fileSize: asset.size,
					version: this.downloadData.tag_name,
					downloadLink: asset.browser_download_url
				});
			}
		}
		return downloadOptions;
	}

}
