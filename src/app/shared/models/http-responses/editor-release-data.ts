export interface EditorReleaseData {
	tag_name: string;
	published_at: string;
	assets: ReleaseAsset[];
}

export interface ReleaseAsset {
	size: number;
	name: string;
	browser_download_url: string;
}

export interface EditorDownloadOption {
	fileName: string;
	fileSize: number;
	version: string,
	date: string;
	downloadLink: string;
}
