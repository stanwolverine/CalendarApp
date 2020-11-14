import React, { memo, useContext, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { Text, View, FlatList, Pressable, StyleSheet } from 'react-native';

import { GlobalContext } from '../../contexts';
import { getFormattedDate } from '../../utils';

import CalenderEvent from './CalenderEvent';

const CalenderEvents = () => {
	const [globalStore] = useContext(GlobalContext);
	const navigation = useNavigation();

	const addCalenderEvent = useCallback(() => navigation.navigate('AddCalenderEvents'), [navigation]);

	const _keyExtractor = useCallback((item) => item.id, []);
	const _renderItem = useCallback(({ item }) => <CalenderEvent event={item} />, []);

	const { selectedDate, markedDates } = globalStore;
	return (
		<View style={styles.container}>
			<View style={styles.heading}>
				<Text style={styles.headingText}>{getFormattedDate(selectedDate)}</Text>
				<Pressable onPress={addCalenderEvent} android_ripple={rippleConfig}>
					<IoniconsIcon name="add-sharp" size={35} color="#555555" />
				</Pressable>
			</View>

			<View style={styles.listContainer}>
				{!!markedDates[selectedDate.dateString] && markedDates[selectedDate.dateString].events.length > 0 ? (
					<FlatList data={markedDates[selectedDate.dateString].events} contentContainerStyle={styles.listContentContainer} keyExtractor={_keyExtractor} renderItem={_renderItem} />
				) : (
					<View style={styles.noEvents}>
						<MaterialIcon name="event-busy" size={35} color="#529aff" />
						<Text>No Events Found</Text>
					</View>
				)}
			</View>
		</View>
	);
};

export default memo(CalenderEvents);

const rippleConfig = { color: '#ccc', borderless: true };

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#ffffff' },
	heading: {
		paddingHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 60,
	},
	headingText: {
		fontFamily: 'Avenir',
		fontSize: 18,
		fontWeight: '600',
	},
	listContainer: { flex: 1 },
	listContentContainer: { paddingBottom: 10 },
	noEvents: {
		flexBasis: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
