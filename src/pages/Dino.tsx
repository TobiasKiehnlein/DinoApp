import { IonContent, IonPage } from '@ionic/react';
import './Page.scss';
import Header from '../components/Header';
import React, { useEffect, useState } from 'react';
import DinoCanvas from '../components/DinoCanvas';
import Mode from '../types/mode';
import { useWebsocket } from '../hooks/websocketHooks';
import ACTION_TYPE from '../enums/actionType';
import { DinoSlides } from '../components/DinoSlides';

// Optional parameters to pass to the swiper instance.
// See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
	speed: 400,
	loop: true
};

const Page: React.FC = () => {
	
	return (
		<IonPage>
			<Header title='Dino 🦕'/>
			
			<IonContent>
				<DinoCanvas/>
				<h1 style={ { textAlign: 'center' } }>Mein geiler Dino!</h1>
				<DinoSlides/>
			</IonContent>
		</IonPage>
	);
};

export default Page;
