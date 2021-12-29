import { IonToast } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useWebsocket } from '../hooks/websocketHooks';
import ACTION_TYPE from '../enums/actionType';
import './Header.scss';
import IntroductionAction from '../types/introductionAction';

interface Props {
}

const Greeting: React.FC<Props> = () => {
	const [ action ] = useWebsocket<IntroductionAction>(ACTION_TYPE.INTRODUCTION);
	const [ toastVisible, setToastVisible ] = useState<string>();
	
	useEffect(() => {
		if (action?.origin /*&& action.origin.toLowerCase() !== 'server'*/) {
			setToastVisible(`${ action?.args.name ?? 'A new device' } connected!`);
			
			setTimeout(() => setToastVisible(undefined), 4000);
		}
	}, [ action ]);
	
	return <IonToast isOpen={ !!toastVisible } color='success' message={ toastVisible }/>;
};

export default Greeting;
