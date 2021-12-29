import { useState } from 'react';
import GLOBAL_STATE_IDENTIFIER from '../enums/globalStateIdentifier';

const useGlobalState = <T>(identifier: GLOBAL_STATE_IDENTIFIER, defaultValue?: any): [ T, (newState: T) => void ] => {
	const [ state, setState ] = useState<T>(JSON.parse(localStorage.getItem(identifier) ?? 'null') ?? defaultValue);
	
	const customSetState = (newState: T) => {
		localStorage.setItem(identifier, JSON.stringify(newState));
		const event = new CustomEvent<T>(identifier, { detail: newState });
		document.dispatchEvent(event);
	};
	
	document.addEventListener(identifier, evt => setState((evt as CustomEvent).detail));
	
	return [ state, customSetState ];
};

export default useGlobalState;
