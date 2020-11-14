import React, { memo, useContext, useCallback, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';

import { GlobalContext } from '../contexts';
import Container from '../components/common/Container';
import CalenderEvents from '../components/home/CalenderEvents';
import { getMarkedDates } from '../actions/action.home';

function Home() {
	const [globalStore, setGlobalStore] = useContext(GlobalContext);

	useEffect(() => {
		getMarkedDates().then((markedDates) => setGlobalStore({ type: 'SET_MARKED_DATES', markedDates }));
	}, []);

	const getMarkedDatesForMonth = useCallback(
		(month) => {
			getMarkedDates(month.dateString).then((markedDates) =>
				setGlobalStore({
					type: 'SET_MARKED_AND_SELECTED_DATES',
					markedDates,
					selectedDate: month,
				})
			);
		},
		[setGlobalStore]
	);

	const changeSelectedDate = useCallback((day) => setGlobalStore({ type: 'CHANGE_SELECTED_DATE', date: day }), [setGlobalStore]);

	return (
		<Container>
			<Calendar
				onDayPress={changeSelectedDate}
				onMonthChange={getMarkedDatesForMonth}
				displayLoadingIndicator
				disableAllTouchEventsForDisabledDays={true}
				enableSwipeMonths={true}
				markingType="simple"
				markedDates={globalStore.markedDates}
				style={calenderStyle}
				theme={calenderTheme}
			/>
			<CalenderEvents />
		</Container>
	);
}

export default memo(Home);

const calenderStyle = { minHeight: 335 };

const calenderTheme = {
	todayTextColor: '#529aff',
	monthTextColor: 'black',
	arrowColor: 'black',
	textMonthFontWeight: '700',
	textDayHeaderFontSize: 16,
};
