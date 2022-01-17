import { useEffect, useState } from 'react';
import GLOBAL_STATE_IDENTIFIER from '../enums/globalStateIdentifier';

const useGlobalState = <T>(identifier: GLOBAL_STATE_IDENTIFIER, defaultValue?: any): [ T, (newState: T) => void ] => {
	const [ value, setValue ] = useState<T>(JSON.parse(localStorage.getItem(identifier) ?? 'null') ?? defaultValue);
	
	const customSetState = (newState: T) => {
		localStorage.setItem(identifier, JSON.stringify(newState));
		const event = new CustomEvent<T>(identifier, { detail: newState });
		document.dispatchEvent(event);
	};
	
	useEffect(() => {
		const listener=(evt: any)=> {
			setValue((evt as CustomEvent).detail);
			console.log('update modes' + JSON.stringify((evt as CustomEvent).detail));
		}
		
		document.addEventListener(identifier, listener);
		return () => document.removeEventListener(identifier, listener);
	}, []);
	
	return [ value, customSetState ];
};

export default useGlobalState;
