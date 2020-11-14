import { colorMap, Day } from '../../utils';

export const GLOBAL_INITIAL_STATE = {
	selectedDate: new Day(),
	markedDates: {},
};

export const GlobalReducer = (state = GLOBAL_INITIAL_STATE, action) => {
	let newState = Object.assign({}, state);

	if (action.type === 'CHANGE_SELECTED_DATE') {
		newState.selectedDate = action.date;
		return newState;
	}

	if (action.type === 'SET_MARKED_DATES') {
		newState.markedDates = action.markedDates;
		return newState;
	}

	if (action.type === 'SET_MARKED_AND_SELECTED_DATES') {
		newState.markedDates = action.markedDates;
		newState.selectedDate = action.selectedDate;
		return newState;
	}

	if (action.type === 'DELETE_CALENDER_EVENT') {
		const dateOfEvent = action.date || state.selectedDate.dateString;

		const filteredEvents = state.markedDates[dateOfEvent].events.filter((event) => event.id !== action.eventId);

		if (filteredEvents.length > 0) {
			let dateAvailability = '';

			if (filteredEvents.some((event) => event.availability === 'busy')) {
				dateAvailability = 'busy';
			} else {
				dateAvailability = 'free';
			}

			newState.markedDates = {
				...state.markedDates,
				[dateOfEvent]: {
					...state.markedDates[dateOfEvent],
					selectedColor: colorMap[dateAvailability],
					dotColor: colorMap[dateAvailability],
					events: filteredEvents,
				},
			};
		} else {
			newState.markedDates = { ...state.markedDates };
			delete newState.markedDates[dateOfEvent];
		}
		return newState;
	}

	if (action.type === 'ADD_CALENDER_EVENT') {
		const dateOfEvent = action.date || state.selectedDate.dateString;

		if (!!state.markedDates[dateOfEvent]) {
			const updatedEvents = [action.data, ...state.markedDates[dateOfEvent].events];

			let dateAvailability = '';
			if (updatedEvents.some((event) => event.availability === 'busy')) {
				dateAvailability = 'busy';
			} else {
				dateAvailability = 'free';
			}

			newState.markedDates = {
				...state.markedDates,
				[dateOfEvent]: {
					...state.markedDates[dateOfEvent],
					selectedColor: colorMap[dateAvailability],
					dotColor: colorMap[dateAvailability],
					events: updatedEvents,
				},
			};
		} else {
			newState.markedDates = {
				...state.markedDates,
				[dateOfEvent]: {
					selected: true,
					marked: true,
					selectedColor: colorMap[action.data.availability],
					dotColor: colorMap[action.data.availability],
					activeOpacity: 0.8,
					events: [action.data],
				},
			};
		}
		console.log(newState.markedDates);
		return newState;
	}

	return state;
};
