import React, { memo, useState, useContext, useEffect, useLayoutEffect, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNCalendarEvents from 'react-native-calendar-events';

import { colorMap, getFormattedTime, getFormattedDate } from '../utils';
import { GlobalContext } from '../contexts';

import Container from '../components/common/Container';
import Done from '../components/add-calender-events/Done';

function AddCalenderEvent(props) {
	const [globalStore, setGlobalStore] = useContext(GlobalContext);

	const [title, setTitle] = useState(props.route.params?.title ?? '');
	const [description, setDescription] = useState(props.route.params?.description ?? '');
	const [availability, setAvailability] = useState(props.route.params?.availability ?? 'busy');
	const [startTime, setStartTime] = useState(props.route.params?.startTime ?? new Date(globalStore.selectedDate.dateString));
	const [endTime, setEndTime] = useState(props.route.params?.endTime ?? new Date(globalStore.selectedDate.dateString));

	// State for choosing which time state to change with time picker, startTime or endTime.
	const [selectingTimeOf, setSelectingTimeOf] = useState('');

	// state for showing loader when pressed done button.
	const [isSaving, setIsSaving] = useState(false);

	// this effect changes title of the screen, whenever selected date is changed.
	useLayoutEffect(() => {
		props.navigation.setOptions({
			title: getFormattedDate(globalStore.selectedDate),
		});
	}, [globalStore.selectedDate, props.navigation]);

	// memoized function to save calender event
	const saveEvent = useCallback(() => {
		if (startTime.getTime() > endTime.getTime()) {
			ToastAndroid.show('Start date cannot be after End date', ToastAndroid.LONG);
			return;
		}

		setIsSaving(true);

		const data = {
			title,
			description,
			availability,
			startDate: startTime.toISOString(),
			endDate: endTime.toISOString(),
			allDay: !startTime && !endTime, // to implement correctly
			alarms: [{ date: 10 }],
		};

		RNCalendarEvents.saveEvent(title, data)
			.then((eventId) => {
				setGlobalStore({ type: 'ADD_CALENDER_EVENT', data: { ...data, id: eventId } });
				props.navigation.goBack();
				ToastAndroid.show('Event Added', ToastAndroid.SHORT);
			})
			.catch((error) => {
				console.log(error);
				setIsSaving(false);
				ToastAndroid.show('There was some problem while adding event', ToastAndroid.LONG);
			});
	}, [title, description, availability, startTime, endTime, props.navigation, setGlobalStore]);

	// Disable done button if length of title is less or equal to 1
	const disableDone = title.length <= 1;

	// this effect changes header right button appearance whenever disableDone, isSaving, saveEvent changes.
	useLayoutEffect(() => {
		props.navigation.setOptions({
			headerRight: () => <Done done={saveEvent} loading={isSaving} disabled={disableDone} />,
		});
	}, [disableDone, isSaving, props.navigation, saveEvent]);

	// memoized function to change start time or end time.
	const onTimeChange = useCallback(
		(_, selectedDate) => {
			console.log(selectedDate.toString());
			setSelectingTimeOf('');
			if (!!selectedDate) {
				if (selectingTimeOf === 'startTime') {
					setStartTime(selectedDate);
				} else if (selectingTimeOf === 'endTime') {
					if (selectedDate.getTime() < startTime.getTime()) {
						setEndTime(startTime);
					} else {
						setEndTime(selectedDate);
					}
				}
			}
		},
		[selectingTimeOf, startTime, setSelectingTimeOf, setStartTime, setEndTime]
	);

	const selectTimeForStart = useCallback(() => setSelectingTimeOf('startTime'), [setSelectingTimeOf]);

	const selectTimeForEnd = useCallback(() => setSelectingTimeOf('endTime'), [setSelectingTimeOf]);

	const impDotStyles = useMemo(
		() => ({
			height: 12,
			width: 12,
			marginRight: 5,
			backgroundColor: colorMap[availability],
			borderRadius: 100,
		}),
		[availability]
	);

	console.log(globalStore.selectedDate);
	return (
		<Container>
			<View style={styles.screenWrapper}>
				<TextInput style={styles.textField} onChangeText={setTitle} value={title} maxLength={100} placeholder="Title" autoCompleteType="off" />

				<TextInput style={styles.textField} onChangeText={setDescription} value={description} multiline placeholder="Description" autoCompleteType="off" maxLength={300} numberOfLines={3} />

				<View style={styles.importanceContainer}>
					<Text style={styles.heading}>Select Availability</Text>
					<View style={styles.pickerWrapper}>
						<View style={impDotStyles} />
						<Picker selectedValue={availability} style={styles.pickerStyles} onValueChange={setAvailability}>
							<Picker.Item label="Busy" value="busy" />
							<Picker.Item label="Free" value="free" />
						</Picker>
					</View>
				</View>

				<View style={styles.timeView}>
					<Text style={styles.heading}>Start Time</Text>
					<TouchableOpacity style={styles.timePressable} onPress={selectTimeForStart}>
						<Text style={styles.timeString}>{getFormattedTime(startTime)}</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.timeView}>
					<Text style={styles.heading}>End Time</Text>
					<TouchableOpacity style={styles.timePressable} onPress={selectTimeForEnd}>
						<Text style={styles.timeString}>{getFormattedTime(endTime)}</Text>
					</TouchableOpacity>
				</View>

				{!!selectingTimeOf ? <DateTimePicker value={selectingTimeOf === 'startTime' ? startTime : endTime} mode="time" is24Hour={false} display="default" onChange={onTimeChange} /> : null}
			</View>
		</Container>
	);
}

export default memo(AddCalenderEvent);

const styles = StyleSheet.create({
	screenWrapper: {
		paddingHorizontal: 20,
		flex: 1,
	},
	textField: {
		borderBottomColor: '#d9d9d9',
		borderBottomWidth: 1.5,
		marginVertical: 10,
		fontSize: 18,
	},
	importanceContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20,
	},
	pickerWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	pickerStyles: {
		width: 100,
	},
	timeView: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 30,
	},
	heading: {
		color: '#aaaaaa',
		fontSize: 18,
	},
	timePressable: {
		paddingRight: 10,
	},
	timeString: {
		fontSize: 18,
		color: '#555555',
	},
});
