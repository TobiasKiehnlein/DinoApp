import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.scss';
import Header from '../components/Header';

const Page: React.FC = () => {
	
	const { name } = useParams<{ name: string; }>();
	
	return (
		<IonPage>
			<Header title={ name }/>
			
			<IonContent fullscreen>
				<IonHeader collapse='condense'>
					<IonToolbar>
						<IonTitle size='large'>{ name }</IonTitle>
					</IonToolbar>
				</IonHeader>
				<ExploreContainer name={ name }/>
			</IonContent>
		</IonPage>
	);
};

export default Page;
