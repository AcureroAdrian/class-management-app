export const formatStartTime = (startTime: { hour: number; minute: number }) => {
	return `${startTime.hour > 12 ? startTime.hour - 12 : startTime.hour}:${startTime.minute < 10 ? '0' + startTime.minute : startTime.minute}${startTime.hour >= 12 ? 'PM' : 'AM'}`;
};