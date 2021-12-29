import { IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';
import { power } from 'ionicons/icons';
import React from 'react';
import { useWebsocket } from '../hooks/websocketHooks';
import ACTION_TYPE from '../enums/actionType';
import useGlobalState from '../hooks/globalState';
import GLOBAL_STATE_IDENTIFIER from '../enums/globalStateIdentifier';
import SetStateAction from '../types/setStateAction';
import './Header.scss';

interface Props {
	title: string;
}

const Header: React.FC<Props> = ({ title }) => {
	const [ action, setActionArgs ] = useWebsocket<SetStateAction>(ACTION_TYPE.SET_STATE);
	const [ username ] = useGlobalState<string>(GLOBAL_STATE_IDENTIFIER.USERNAME);
	
	return <IonHeader>
		<IonToolbar>
			<IonButtons slot='start'>
				<IonButton className={ action?.args.newState ? 'active' : 'inactive' } onClick={ () => setActionArgs({ newState: !action?.args.newState }) }>
					<IonIcon slot='icon-only' icon={ power }/>
				</IonButton>
			</IonButtons>
			<IonTitle>{ title }, { username }</IonTitle>
			<IonButtons slot='end'>
				<IonMenuButton/>
			</IonButtons>
		</IonToolbar>
	</IonHeader>;
};

export default Header;
