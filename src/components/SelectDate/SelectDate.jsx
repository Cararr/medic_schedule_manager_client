import React from 'react';
import { Utilities } from '../../util/util';
import './SelectDate.css';

export default function SelectDate(props) {
	const setDate = ({ target }) => {
		if (target.value) props.setDateSelected(target.value);
	};
	const changeDateToToday = () =>
		props.setDateSelected(Utilities.formatDateString(new Date()));
	const toggleDate = (dayChange) => {
		const currentDate = new Date(props.dateSelected);
		const newDate = new Date(
			currentDate.setDate(currentDate.getDate() + dayChange)
		);
		props.setDateSelected(Utilities.formatDateString(newDate));
	};

	return (
		<form className="select-date-form">
			<label>
				<h3>Select date:</h3>
			</label>
			<input
				required
				onChange={setDate}
				value={props.dateSelected}
				type="date"
			></input>
			<div>
				<button
					onClick={() => toggleDate(-1)}
					className="button-generic button-fontello"
					type="button"
				>
					<i className="icon-left-dir" />
				</button>
				<button
					onClick={changeDateToToday}
					className="button-generic button-today"
					type="button"
				>
					Today
				</button>
				<button
					onClick={() => toggleDate(+1)}
					className="button-generic button-fontello"
					type="button"
				>
					<i className="icon-right-dir" />
				</button>
			</div>
		</form>
	);
}
