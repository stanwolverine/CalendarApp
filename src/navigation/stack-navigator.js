import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/Home';
import AddCalenderEvents from '../screens/AddCalenderEvents';

const Stack = createStackNavigator();

const MainAppNavigator = () => (
	<Stack.Navigator initialRouteName="Home">
		<Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Calender' }} />
		<Stack.Screen name="AddCalenderEvents" component={AddCalenderEvents} options={{ title: 'Manage Your Event' }} />
	</Stack.Navigator>
);

export default MainAppNavigator;
