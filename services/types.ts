export enum ConfigType {
	default = 'Default config',
	lengthOnly = 'Length only',
	customConfig = 'Custom config',
}

export interface ConfigInputI {
	type: ConfigType;
	length?: number;
	rules?: RuleI[];
}

interface RuleI {
	chars: string;
	min?: number;
}
