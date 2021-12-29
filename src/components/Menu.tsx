import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle, IonNote } from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { bookmarkOutline, cogOutline, cogSharp, homeOutline, homeSharp } from 'ionicons/icons';
import './Menu.scss';

interface AppPage {
	url: string;
	iosIcon: string;
	mdIcon: string;
	title: string;
}

const appPages: AppPage[] = [
	{
		title: 'Manage Dinos',
		url: '/',
		iosIcon: homeOutline,
		mdIcon: homeSharp
	},
	{
		title: 'Settings',
		url: '/Settings',
		iosIcon: cogOutline,
		mdIcon: cogSharp
	}
];

const Menu: React.FC = () => {
	const location = useLocation();
	
	return (
		<IonMenu contentId='main' type='reveal' side='end'>
			<IonContent>
				<IonList id='menu-list'>
					<IonListHeader>DinoAPP</IonListHeader>
					<IonNote>Control your dinos from everywhere 🎉</IonNote>
					{ appPages.map((appPage, index) => {
						return (
							<IonMenuToggle key={ index } autoHide={ false }>
								<IonItem className={ location.pathname === appPage.url ? 'selected' : '' } routerLink={ appPage.url } routerDirection='none' lines='none' detail={ false }>
									<IonIcon slot='start' ios={ appPage.iosIcon } md={ appPage.mdIcon }/>
									<IonLabel>{ appPage.title }</IonLabel>
								</IonItem>
							</IonMenuToggle>
						);
					}) }
				</IonList>
			</IonContent>
		</IonMenu>
	);
};

export default Menu;
