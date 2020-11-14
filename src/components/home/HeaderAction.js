import React, { memo, useContext, useCallback } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { GlobalContext } from '../../contexts';

const Action = (props) => {
	const [_, setGlobalStore] = useContext(GlobalContext);

	const deleteEvent = useCallback(() => {
		RNCalendarEvents.removeEvent(props.eventId);
		setGlobalStore({ type: 'DELETE_CALENDER_EVENT', eventId: props.eventId });
	}, [props.eventId, setGlobalStore]);

	return (
		<View style={styles.actionView}>
			<Pressable onPress={deleteEvent} hitSlop={15}>
				<Icon name="delete" size={26} color="#ebebeb" />
			</Pressable>
		</View>
	);
};

export default memo(Action);

const styles = StyleSheet.create({
	actionView: {
		backgroundColor: '#de3535',
		justifyContent: 'center',
		paddingHorizontal: 20,
	},
});
