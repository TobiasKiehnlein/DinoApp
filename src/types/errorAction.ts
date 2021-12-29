import Action from './action';
import ACTION_TYPE from '../enums/actionType';

export default interface ErrorAction extends Action {
	type: ACTION_TYPE.ERROR;
	args: {
		message: string;
	};
}
