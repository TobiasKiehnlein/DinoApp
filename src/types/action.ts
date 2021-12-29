import ACTION_TYPE from '../enums/actionType';

export default interface Action {
	
	type: ACTION_TYPE;
	origin: string;
	totalBroadcast: boolean;
	args: any;
	
}
