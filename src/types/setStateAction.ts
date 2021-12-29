import Action from './action';
import ACTION_TYPE from '../enums/actionType';

export default interface SetStateAction extends Action {
	type: ACTION_TYPE.SET_STATE;
	args: {
		newState: boolean;
	};
}
