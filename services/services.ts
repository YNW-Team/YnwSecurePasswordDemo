import { ConfigI } from 'ynw-secure-password/lib/interfaces';
import { ConfigInputI, ConfigType } from '@services/types';
import { GeneratorStateI, ResultI } from '@services/reducers';
import { DEFAULT_CONFIG, generator } from 'ynw-secure-password';

export const getConfigObject = (config: ConfigI): string => {
	let configString = '{\n' + '\tlength: ' + (config.length || 'Random') + ',\n' + '\trules: [\n';
	config.rules.forEach(r => {
		const minString = r.min ? ', min: ' + r.min : '';
		configString += '\t\t{ chars: "' + r.chars + '"' + minString + '},\n';
	});
	configString += '\t],\n' + '}\n';
	return configString;
};

export const generatePassword = (values: ConfigInputI): GeneratorStateI => {
	let config: ConfigI;
	let result: ResultI;
	if (values.type === ConfigType.default) {
		config = { ...DEFAULT_CONFIG };
		result = generatorCatch();
	} else if (values.type === ConfigType.lengthOnly) {
		config = { ...DEFAULT_CONFIG, length: values.length };
		result = generatorCatch(values.length);
	} else {
		config = { length: values.length, rules: values.rules };
		result = generatorCatch(config);
	}
	return {
		config,
		result,
		configInput: values,
	};
};

const generatorCatch = (config?: number | ConfigI): ResultI => {
	const result: ResultI = { type: 'success', result: '' };
	try {
		result.result = generator(config);
	} catch (e) {
		result.result = e.message;
		result.type = 'error';
	}
	return result;
};
