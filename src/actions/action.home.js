import { ToastAndroid } from 'react-native';
import RNCalendarEvents from 'react-native-calendar-events';

import { MarkedDate } from '../utils';

export const getMarkedDates = async (month) => {
	try {
		const events = await getCalenderEvents(month);
		return mapEventsToMarkedDates(events);
	} catch (error) {
		ToastAndroid.show(error, ToastAndroid.SHORT);
		return Promise.reject(error);
	}
};

const getCalenderEvents = async (month) => {
	try {
		const granted = await checkAndRequestPermissions();

		if (!granted) {
			throw new Error('Please provide permission to view events');
		}

		let date = null;
		if (!!month) {
			date = new Date(month);
		} else {
			date = new Date();
		}
		const y = date.getFullYear();
		const m = date.getMonth();

		const firstDayOfMonth = new Date(y, m, 1).toISOString();
		const lastDayOfMonth = new Date(y, m + 1, 0).toISOString();

		const events = await RNCalendarEvents.fetchAllEvents(firstDayOfMonth, lastDayOfMonth);

		return events;
	} catch (error) {
		let msg = error;
		if (error instanceof Error) {
			msg = error.message;
		}

		return Promise.reject(msg);
	}
};

const checkAndRequestPermissions = async () => {
	try {
		const permission = await RNCalendarEvents.checkPermissions();
		if (permission === 'authorized') {
			return true;
		} else {
			const result = await RNCalendarEvents.requestPermissions();
			return result === 'authorized';
		}
	} catch (error) {
		return Promise.reject(error);
	}
};

function mapEventsToMarkedDates(events) {
	const markedDates = {};

	events.forEach((event) => {
		const dateObject = new Date(event.startDate);
		const eventDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}-${dateObject.getDate().toString().padStart(2, '0')}`;

		if (markedDates[eventDate] instanceof MarkedDate) {
			markedDates[eventDate].addEvent(event);
		} else {
			markedDates[eventDate] = new MarkedDate(event);
		}
	});

	return markedDates;
}
