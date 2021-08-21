import React, { ChangeEvent } from 'react';
import Utilities from '../../util/Utilities';
import './SelectDate.css';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';

interface Props {
	setDateSelected: React.Dispatch<React.SetStateAction<string>>;
	dateSelected: string;
}

export const SelectDate: React.FunctionComponent<Props> = (props) => {
	const setDate = ({ target }: ChangeEvent<HTMLInputElement>) => {
		if (target.value) props.setDateSelected(target.value);
	};

	const changeDateToToday = () =>
		props.setDateSelected(Utilities.formatDateString(new Date()));

	const toggleDate = (dayChange: 1 | -1) => {
		const currentDate = new Date(props.dateSelected);
		let newDate = new Date(
			currentDate.setDate(currentDate.getDate() + dayChange)
		);

		while ([0, 6].includes(newDate.getDay())) {
			newDate = new Date(
				currentDate.setDate(currentDate.getDate() + dayChange)
			);
		}
		props.setDateSelected(Utilities.formatDateString(newDate));
	};

	return (
		<form className="form-select-date">
			<label>
				<h3>Select date</h3>
			</label>
			<input
				required
				onChange={setDate}
				value={props.dateSelected}
				type="date"
			></input>
			<div className="container-set-day-buttons">
				<button
					onClick={() => toggleDate(-1)}
					className="button-generic button-change-day"
					type="button"
				>
					<AiFillCaretLeft />
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
					className="button-generic button-change-day"
					type="button"
				>
					<AiFillCaretRight />
				</button>
			</div>
		</form>
	);
};
