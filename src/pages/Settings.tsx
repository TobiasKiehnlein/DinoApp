import { IonContent, IonInput, IonItem, IonLabel, IonList, IonPage } from '@ionic/react';
import { useParams } from 'react-router';
import './Page.scss';
import Header from '../components/Header';
import React from 'react';
import useGlobalState from '../hooks/globalState';
import GLOBAL_STATE_IDENTIFIER from '../enums/globalStateIdentifier';
import WebsocketHandler from '../hooks/websocketHooks';

const Page: React.FC = () => {
	
	const { name } = useParams<{ name: string; }>();
	const [ username, setUsername ] = useGlobalState<string>(GLOBAL_STATE_IDENTIFIER.USERNAME, '');
	const [ token, setToken ] = useGlobalState<string>(GLOBAL_STATE_IDENTIFIER.TOKEN, '');
	return (
		<IonPage>
			<Header title='Settings'/>
			
			<IonContent>
				<p>This is the settings page!</p>
				<IonList>
					<IonItem>
						<IonLabel position='floating'>Username</IonLabel>
						<IonInput name='username' value={ username } onIonChange={ evt => setUsername(evt.detail.value ?? '') }/>
					</IonItem>
					<IonItem>
						<IonLabel position='floating'>Token</IonLabel>
						<IonInput type='password' name='token' value={ token } onIonChange={ evt => {
							setToken(evt.detail.value ?? '');
							try {
								const updateSocket = WebsocketHandler.websocket;
							} catch (e) {
							}
						} }/>
					</IonItem>
				</IonList>
			</IonContent>
		</IonPage>
	);
};

export default Page;
