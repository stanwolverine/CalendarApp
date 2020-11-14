import { months } from './miscellaneous';

export const getFormattedDate = (day) => `${day.day} ${months[day.month]} ${day.year}`;

export const getFormattedTime = (date) => {
	let dateObject = null;
	if (date instanceof Date) {
		dateObject = date;
	} else {
		dateObject = new Date(date);
	}

	const h = dateObject.getHours();
	const m = dateObject.getMinutes();

	const hourString = (h === 0 ? 12 : h > 12 ? h - 12 : h).toString().padStart(2, '0');

	const minuteString = m.toString().padStart(2, '0');

	return `${hourString}:${minuteString} ${h < 12 ? 'AM' : 'PM'}`;
};
