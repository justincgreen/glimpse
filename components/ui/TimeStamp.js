import styles from './TimeStamp.module.css';

const TimeStamp= () => {
	const currentDate = new Date();
	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	let currentMonth = monthNames[currentDate.getMonth()];
	let currentYear = currentDate.getFullYear();
	
	return (
		<div className={styles.current_month}>
			{ `${currentMonth} ${currentYear}` }
		</div>
	)
}

export default TimeStamp;