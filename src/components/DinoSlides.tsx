import { IonButton, IonItem, IonLabel } from '@ionic/react';
import React from 'react';
import useGlobalState from '../hooks/globalState';
import Mode, { ModeParam } from '../types/mode';
import GLOBAL_STATE_IDENTIFIER from '../enums/globalStateIdentifier';

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SwiperCore, { Navigation, Pagination } from 'swiper';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import './DinoSlides.scss';
import { useWebsocket } from '../hooks/websocketHooks';
import ACTION_TYPE from '../enums/actionType';
import MODE_TYPE from '../enums/modeType';
import { DinoSlide } from './DinoSlide';

SwiperCore.use([ Navigation, Pagination ]);

export function DinoSlides() {
	const [ modes ] = useGlobalState<Mode[]>(GLOBAL_STATE_IDENTIFIER.AVAILABLE_MODES);
	const [ mode, setMode ] = useWebsocket<Mode>(ACTION_TYPE.SET_MODE);
	
	const renderParam = (paramId: string, param: ModeParam) => {
		return (
			<IonItem key={ paramId }>
				<IonLabel>{ param.name }</IonLabel>
				<input type={ param.type === MODE_TYPE.NUMBER ? 'number' : 'color' } value={ param.value ?? param.defaultValue }/>
			</IonItem>
		);
	};
	
	const getSlideFromMode = (m: Mode) =>
		(<SwiperSlide key={ m.type }>
			<h1>{ m.name }</h1>
			<p>{ m.description }</p>
			{ Object.keys(m.params).map(key => renderParam(key, m.params[key])) }
			<IonButton onClick={ () => setMode({ newMode: m }) }>Apply</IonButton>
		</SwiperSlide>);
	
	return (
		<Swiper
			spaceBetween={ 50 }
			loop
			navigation
			pagination
			id='dino-slides'
		>
			{ modes?.map(m => <SwiperSlide key={ m.type }><DinoSlide key={ m.type } mode={ m }/></SwiperSlide>) }
		</Swiper>
	);
}
