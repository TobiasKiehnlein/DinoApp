import Action from './action';
import ACTION_TYPE from '../enums/actionType';
import Mode from './mode';

export default interface StreamAction extends Action {
	type: ACTION_TYPE.STREAM;
	args: {
		mode: Mode,
		data: number[][]
	};
}
