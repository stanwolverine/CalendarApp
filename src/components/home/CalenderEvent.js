import React, { memo, useState, useContext, useCallback, useMemo } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

import { GlobalContext } from '../../contexts';
import { colorMap, getFormattedTime } from '../../utils';

import Action from './HeaderAction';

const CalenderEvent = (props) => {
	const [showFullDescription, setShowFullDescription] = useState(false);
	const [globalStore] = useContext(GlobalContext);

	const toggleFullDescription = () => setShowFullDescription(!showFullDescription);

	const renderRightActions = useCallback(() => <Action eventId={props.event.id} />, [props.event.id]);

	const colorBarStyle = useMemo(
		() => ({
			flexBasis: 10,
			marginRight: 15,
			backgroundColor: colorMap[props.event.availability],
		}),
		[props.event.availability]
	);

	return (
		<Swipeable renderRightActions={renderRightActions} containerStyle={styles.swipeableContainer}>
			<View style={styles.eventContainer}>
				<View style={colorBarStyle} />
				<View style={styles.eventDetails}>
					<Text style={styles.eventTime}>
						{props.event.allDay
							? 'All Day'
							: !!props.event.startDate
							? !!props.event.endDate
								? getFormattedTime(props.event.startDate) + ' - ' + getFormattedEndTime(props.event.endDate, globalStore.selectedDate)
								: getFormattedTime(props.event.startDate)
							: null}
					</Text>
					<Text style={styles.eventTitle}>{props.event.title}</Text>
					{props.event.description ? (
						<Pressable onPress={toggleFullDescription}>
							<Text style={styles.eventDesc} numberOfLines={showFullDescription ? null : 1}>
								{props.event.description}
							</Text>
						</Pressable>
					) : null}
				</View>
			</View>
		</Swipeable>
	);
};

export default memo(CalenderEvent);

const styles = StyleSheet.create({
	swipeableContainer: {
		backgroundColor: '#de3535',
	},
	eventContainer: {
		flexBasis: '100%',
		flexDirection: 'row',
		alignItems: 'stretch',
		paddingVertical: 10,
		paddingHorizontal: 20,
		minHeight: 80,
		backgroundColor: '#fff',
	},
	eventDetails: { flex: 1 },
	eventTime: { color: '#aaaaaa', fontSize: 12 },
	eventTitle: { color: '#000000', fontWeight: '500' },
	eventDesc: { color: '#000000' },
	actionView: {
		backgroundColor: '#de3535',
		justifyContent: 'center',
		paddingHorizontal: 20,
	},
});

const getFormattedEndTime = (endDate, selectedDate) => {
	let endDateObject = null;
	if (endDate instanceof Date) {
		endDateObject = endDate;
	} else {
		endDateObject = new Date(endDate);
	}

	let dateString = '';

	if (endDateObject.getDate() !== selectedDate.day || endDateObject.getMonth() + 1 !== selectedDate.month || endDateObject.getFullYear() !== selectedDate.year) {
		dateString = endDateObject.toDateString() + ' ';
	}

	return `${dateString}${getFormattedTime(endDateObject)}`;
};
