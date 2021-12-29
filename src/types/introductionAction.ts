import Action from './action';
import ACTION_TYPE from '../enums/actionType';
import Mode from './mode';

export default interface IntroductionAction extends Action {
	type: ACTION_TYPE.INTRODUCTION,
	args: {
		name: string;
		type: 'DINO' | 'SERVER' | 'APP';
		currentState: boolean;
		currentMode: Mode;
		availableModes: Mode[]; //TODO replace with mode
	}
}
