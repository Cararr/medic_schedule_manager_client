import React from 'react';
import './SelectDate.css';

export default function SelectDate(props) {
	const handleDateChange = ({ target }) => {
		if (target.value) props.setDateSelected(target.value);
	};
	return (
		<form className="select_date_form">
			<label>Select date:</label>
			<input
				required
				onChange={handleDateChange}
				value={props.dateSelected}
				type="date"
			></input>
		</form>
	);
}
