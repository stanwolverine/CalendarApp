import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import MainAppNavigator from './stack-navigator';

const RootNavigator = () => (
	<NavigationContainer>
		<MainAppNavigator />
	</NavigationContainer>
);

export default RootNavigator;
