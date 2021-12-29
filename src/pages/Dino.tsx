import { IonContent, IonInput, IonItem, IonLabel, IonList, IonPage } from '@ionic/react';
import { useParams } from 'react-router';
import './Page.scss';
import Header from '../components/Header';
import React from 'react';
import useGlobalState from '../hooks/globalState';
import GLOBAL_STATE_IDENTIFIER from '../enums/globalStateIdentifier';

const Page: React.FC = () => {

	return (
		<IonPage>
			<Header title='Dino 🦕'/>
			
			<IonContent>
				<p>This is the dino page!</p>
			</IonContent>
		</IonPage>
	);
};

export default Page;
