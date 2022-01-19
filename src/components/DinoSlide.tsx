import { IonButton, IonItem, IonLabel } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import Mode, { ModeParam } from '../types/mode';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import './DinoSlides.scss';
import { useWebsocket } from '../hooks/websocketHooks';
import ACTION_TYPE from '../enums/actionType';
import MODE_TYPE from '../enums/modeType';


export const DinoSlide: React.FC<{ mode: Mode }> = ({ mode: m }) => {
	const [ _, setMode ] = useWebsocket<Mode>(ACTION_TYPE.SET_MODE);
	const [ params, setParams ] = useState<[ string, ModeParam ][]>([]);
	
	useEffect(() => {
		setParams(Object.keys(m.params).map(key => [ key, m.params[key] ]));
	}, [ m ]);
	
	const renderParam = (paramId: string, param: ModeParam) => {
		return (
			<IonItem key={ paramId }>
				<IonLabel>{ param.name }</IonLabel>
				<input type={ param.type === MODE_TYPE.NUMBER ? 'number' : 'color' } value={ param.value ?? param.defaultValue } onChange={ val => {
					setParams(current => current.map(([ key, param ]) => key === paramId ? [ key, { ...param, value: param.type === MODE_TYPE.NUMBER ? Number(val.target.value) : val.target.value } ] : [ key, param ]));
				} }/>
			</IonItem>
		);
	};
	
	return (
		<>
			<h1>{ m.name }</h1>
			<p>{ m.description }</p>
			{ params.map(([ key, param ]) => renderParam(key, param)) }
			<IonButton onClick={ () => {
				const newParams = params.reduce((prev: any, [ key, value ]) => {
					prev[key] = value;
					return prev;
				}, {});
				console.log(params);
				console.log(newParams);
				setMode({ newMode: { ...m, params: newParams } });
			} }>Apply</IonButton>
		</>
	);
};
