import ACTION_TYPE from '../enums/actionType';
import Action from '../types/action';
import { useEffect, useState } from 'react';
import IntroductionAction from '../types/introductionAction';
import GLOBAL_STATE_IDENTIFIER from '../enums/globalStateIdentifier';
import Mode from '../types/mode';

export default class WebsocketHandler {
	public static introduction?: IntroductionAction;
	private static _websocket?: WebSocket;
	public static myOrigin = Math.random().toString().replace(/^../, '');
	
	public static get websocket(): WebSocket {
		if (!this._websocket) {
			const token = localStorage.getItem(GLOBAL_STATE_IDENTIFIER.TOKEN)?.replace(/[^a-z0-9-]/gmi, '');
			this._websocket = new WebSocket('wss://dino.petrusbellmonte.de', [ token ?? 'no-token', 'dino' ]);
			console.log(token);
			this._websocket.onopen = () => {
				console.log('socket opened...');
				this._websocket?.send(JSON.stringify({
					origin: this.myOrigin,
					type: ACTION_TYPE.INTRODUCTION,
					args: {
						name: localStorage.getItem(GLOBAL_STATE_IDENTIFIER.USERNAME),
						type: 'APP'
					}
				} as IntroductionAction));
			};
			this._websocket.onerror = (evt) => {
				console.log(evt);
			};
			this._websocket.onclose = ev => {
				this._websocket = undefined;
			};
			this._websocket.onmessage = (msg) => {
				try {
					const data: Action = JSON.parse(msg.data);
					console.log(data);
					switch (data.type) {
						case ACTION_TYPE.INTRODUCTION:
							const introduction = data as IntroductionAction;
							if (introduction.origin.toLowerCase() === 'server') {
								this.introduction = introduction;
								this.triggerListenersByType({ ...data, type: ACTION_TYPE.SET_STATE, args: { newState: data.args.currentState } });
								document.dispatchEvent(new CustomEvent<Mode[]>(GLOBAL_STATE_IDENTIFIER.AVAILABLE_MODES, { detail: this.introduction.args.availableModes }));
							} else if (this.introduction) {
								console.log('wtf');
								const currentModeTypes = this.introduction.args.availableModes.map(mode => mode.type);
								this.introduction.args.availableModes = [ ...this.introduction.args.availableModes, ...(introduction.args.availableModes ?? introduction.args.possibleModes ?? []).filter(mode => !currentModeTypes.includes(mode.type)) ];
								console.log(`updating available modes... Now: ${ JSON.stringify(this.introduction.args.availableModes) }`);
								document.dispatchEvent(new CustomEvent<Mode[]>(GLOBAL_STATE_IDENTIFIER.AVAILABLE_MODES, { detail: this.introduction.args.availableModes }));
								this.triggerListenersByType(data);
							} else {
								console.log('weird shit');
							}
							break;
						case ACTION_TYPE.SET_MODE:
						case ACTION_TYPE.SET_STATE:
							this.triggerListenersByType(data);
							break;
						case ACTION_TYPE.ERROR:
							// noinspection ExceptionCaughtLocallyJS
							throw new Error(data.args.message);
					}
				} catch (e) {
					console.warn(e);
					document.dispatchEvent(new CustomEvent<string>(GLOBAL_STATE_IDENTIFIER.ERROR, { detail: e.msg }));
				}
			};
		}
		return this._websocket;
	}
	
	private static actionListeners: { id: number, actionType: ACTION_TYPE, listener: (action: Action) => any }[] = [];
	
	private static triggerListenersByType(data: Action) {
		this.actionListeners
			.filter(listener => listener.actionType === data.type)
			.forEach(listener => listener.listener(data));
	}
	
	public static addListener(actionType: ACTION_TYPE, listener: (action: Action) => any): number {
		const socket = this.websocket;
		const id = Math.max(...this.actionListeners.map(listener => listener.id)) + 1;
		this.actionListeners = [ ...this.actionListeners, { id, actionType, listener } ];
		return id;
	}
	
	public static removeListener(listenerId: number) {
		this.actionListeners = this.actionListeners.filter(listener => listener.id !== listenerId);
	}
}

export const useWebsocket = <T>(actionType: ACTION_TYPE): [ T | null, (args: any) => void ] => {
	const [ value, setValue ] = useState<Action | null>((window as any)[`LAST_${ actionType }`] as Action ?? null);
	
	useEffect(() => {
		const listenerId = WebsocketHandler.addListener(actionType, v => {
			(window as any)[`LAST_${ actionType }`] = v;
			setValue(v);
		});
		return () => {
			WebsocketHandler.removeListener(listenerId);
		};
	}, [ actionType ]);
	
	const setActionArgs = (args: any, address = 'ALL') => {
		WebsocketHandler.websocket.send(JSON.stringify({ origin: WebsocketHandler.myOrigin, type: actionType, address, args } as unknown as Action));
	};
	
	return [ value as T | null, setActionArgs ];
};
