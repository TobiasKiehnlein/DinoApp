import MODE_TYPE from '../enums/modeType';

export interface ModeParam {
	name: string,
	description: string,
	type: MODE_TYPE,
	unit?: string,
	defaultValue?: string | number,
	value?: string | number
}

export default interface Mode {
	/**
	 * mode name/id
	 */
	type: string,
	/**
	 * human readable mode name
	 */
	name: string,
	/**
	 * longer and more detailed description of the mode
	 */
	description: string,
	params: {
		[paramType: string]: ModeParam
	}
}
