export interface ElectronDownloadData {
	currentVersion: string;
	version: string;
	date: string;
	platforms: ElectronPlatforms;
}

export type ElectronPlatforms = {
	[P in ElectronPlatform]: {
		[A in ElectronArch]: ElectronDownloadOption;
	};
}

export interface ElectronDownloadOption {
	fileSize: number;
	fileName: string;
	downloadLink: string;
	version?: string;
	date?: string;
}

export type ElectronPlatform = 'windows' | 'linux';
export type ElectronArch = 'x32' | 'x64' | 'arm64';
