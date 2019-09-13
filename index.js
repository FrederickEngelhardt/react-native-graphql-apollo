/**
 * @format
 */

import App from './components/App';
import Login from "./components/Login";
import {Navigation} from 'react-native-navigation';
export const WELCOME_SCREEN = 'demo.WelcomeScreen';
export const LOGIN_SCREEN = 'demo.LoginScreen';

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.registerComponent(WELCOME_SCREEN, () => App);
  Navigation.registerComponent(LOGIN_SCREEN, () => Login);
	generateNavigationRoot();
});

// AppRegistry.registerComponent(appName, () => App);

export function generateNavigationRoot() {
  Navigation.setDefaultOptions({
    topBar: {
      background: {
        color: '#039893',
      },
      title: {
        color: 'white',
      },
      backButton: {
        title: '', // Remove previous screen name from back button
        color: 'white',
      },
      buttonColor: 'white',
    },
    statusBar: {
      style: 'light',
    },
    layout: {
      orientation: ['portrait'],
    },
    bottomTabs: {
      titleDisplayMode: 'alwaysShow',
    },
    bottomTab: {
      textColor: 'gray',
      selectedTextColor: 'black',
      iconColor: 'gray',
      selectedIconColor: 'black',
    },
  });

  Navigation.setRoot({
    root: {
    	sideMenu: {
    		left: {
					component: {
						name: WELCOME_SCREEN,
						id: WELCOME_SCREEN,
						options: {
							topBar: {
								visible: false,
							},
							statusBar: {
								style: 'dark',
							},
						},
					},
				},
				center: {
					stack: {
						children: [
							{
								component: {
									name: WELCOME_SCREEN,
									id: WELCOME_SCREEN,
									options: {
										topBar: {
											visible: false,
										},
										statusBar: {
											style: 'dark',
										},
									},
								},
							},
							{
								component: {
									name: LOGIN_SCREEN,
									id: LOGIN_SCREEN,
									options: {
										topBar: {
											visible: false,
										},
										statusBar: {
											style: 'dark',
										},
									},
								},
							},
						],
					},
				}
			},
    },
  });
}
