import React, { useEffect, useState } from 'react';
import { getHomeRehabilitationsByDate } from '../../util/fetchFromDB';
import './HomeRehabilitaitons.css';

export default function HomeRehabilitaitons(props) {
	const [homeRehabilitaitons, setHomeRehabilitaitons] = useState([]);

	useEffect(() => {
		getHomeRehabilitationsByDate(props.dateSelected).then((hRs) =>
			setHomeRehabilitaitons(hRs.sort(sortByStartTime))
		);
	}, [props.dateSelected]);

	const homeRehabilitaitonsView = homeRehabilitaitons.map((hR) => (
		<tr key={hR.id} className="white-background">
			<td>{hR.startTime.slice(0, 5)}</td>
			<td>{`${hR.employee.firstName} ${hR.employee.lastName}`}</td>
			<td>{hR.patient}</td>
		</tr>
	));

	return (
		<table className="station-table">
			<thead>
				<tr className="table-title">
					<td colSpan={3}>HOME REHABILITATIONS</td>
				</tr>
				<tr>
					<td>Start at</td>
					<td>Employee</td>
					<td>Patient</td>
				</tr>
			</thead>
			<tbody>{homeRehabilitaitonsView}</tbody>
		</table>
	);
}

function sortByStartTime(a, b) {
	if (a.startTime < b.startTime) {
		return -1;
	}
	if (a.startTime > b.startTime) {
		return 1;
	}
	return 0;
}
