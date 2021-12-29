import MODE_TYPE from '../enums/modeType';

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
		[paramType: string]: {
			name: string,
			description: string,
			type: MODE_TYPE,
			unit?: string,
			defaultValue?: string | number,
			value?: string | number
		}
	}
}
