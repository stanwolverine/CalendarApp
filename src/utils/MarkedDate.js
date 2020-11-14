import { colorMap } from './miscellaneous';

export class MarkedDate {
	selected = true;
	marked = true;
	activeOpacity = 0.8;

	constructor(calenderEvent) {
		const color = colorMap[calenderEvent.availability];
		this.selectedColor = color;
		this.dotColor = color;

		this.events = [
			{
				id: calenderEvent.id,
				title: calenderEvent.title,
				description: calenderEvent.description,
				allDay: calenderEvent.allDay,
				startDate: calenderEvent.startDate,
				endDate: calenderEvent.endDate,
				availability: calenderEvent.availability,
			},
		];
	}

	changeDateColor(color) {
		this.selectedColor = color;
		this.dotColor = color;
	}

	addEvent(calenderEvent) {
		if (calenderEvent.availability === 'busy') {
			this.changeDateColor(colorMap[calenderEvent.availability]);
		}
		this.events.push({
			id: calenderEvent.id,
			title: calenderEvent.title,
			description: calenderEvent.description,
			allDay: calenderEvent.allDay,
			startDate: calenderEvent.startDate,
			endDate: calenderEvent.endDate,
			availability: calenderEvent.availability,
		});
	}
}
