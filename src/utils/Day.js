export function Day() {
	const currentDate = new Date();

	this.day = currentDate.getDate();
	this.month = currentDate.getMonth() + 1;
	this.year = currentDate.getFullYear();
	this.timestamp = currentDate.getTime();
	this.dateString = `${this.year}-${this.month.toString().padStart(2, '0')}-${this.day.toString().padStart(2, '0')}`;
}
