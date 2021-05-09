import React from 'react';
import './SelectDate.css';

export default function SelectDate(props) {
	const handleDateChange = ({ target }) => {
		if (target.value) props.setDateSelected(target.value);
	};
	const handleChangeDateToToday = () =>
		props.setDateSelected(props.formatDateString(new Date()));
	return (
		<form className="select_date_form">
			<label>Select date:</label>
			<div>
				<input
					required
					onChange={handleDateChange}
					value={props.dateSelected}
					type="date"
				></input>
				<button
					onClick={handleChangeDateToToday}
					className="today-button"
					type="button"
				>
					Today
				</button>
			</div>
		</form>
	);
}
