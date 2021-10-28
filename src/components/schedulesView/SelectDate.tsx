import React, { ChangeEvent } from 'react';
import Utilities from 'util/Utilities';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import styles from './schedules.module.scss';
import globalStyles from 'globalStyles.module.scss';

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
		<form className={`${styles.selectDate} ${globalStyles.notPrintable}`}>
			<h3>Select date</h3>
			<input
				required
				max="2050-12-31"
				onChange={setDate}
				value={props.dateSelected}
				type="date"
			></input>
			<div className={styles.setDateButtons}>
				<button
					onClick={() => toggleDate(-1)}
					className={`${globalStyles.button} ${styles.dateButton}`}
					type="button"
				>
					<AiFillCaretLeft />
				</button>
				<button
					onClick={changeDateToToday}
					className={`${globalStyles.button} ${styles.dateButton}`}
					style={{ margin: '0 0.5rem', padding: '1px 0.5rem' }}
					type="button"
				>
					Today
				</button>
				<button
					onClick={() => toggleDate(+1)}
					className={`${globalStyles.button} ${styles.dateButton}`}
					type="button"
				>
					<AiFillCaretRight />
				</button>
			</div>
		</form>
	);
};
