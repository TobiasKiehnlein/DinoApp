import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.scss';
import Settings from './pages/Settings';
import Dino from './pages/Dino';
import Greeting from './components/Greeting';

const App: React.FC = () => {
	return (
		<IonApp>
			<IonReactRouter>
				<IonSplitPane contentId='main'>
					<Menu/>
					<IonRouterOutlet id='main'>
						<Route path='/' exact={ true }>
							<Dino/>
						</Route>
						<Route path='/Settings' exact={ true }>
							<Settings/>
						</Route>
					</IonRouterOutlet>
				</IonSplitPane>
			</IonReactRouter>
			<Greeting/>
		</IonApp>
	);
};

export default App;
