import Action from './action';
import ACTION_TYPE from '../enums/actionType';
import Mode from './mode';

export default interface RequestPreviewAction extends Action {
	type: ACTION_TYPE.REQUEST_PREVIEW;
	args: {
		mode: Mode
	};
}
