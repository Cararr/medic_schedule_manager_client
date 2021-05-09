import React from 'react';
import './TableHead.css';

export default function TableHead(props) {
	return (
		<thead>
			<tr>
				<td className="table-title" colSpan={4}>
					{props.stationName}
				</td>
			</tr>
			<tr>
				<td>7:30 - 10:25</td>
				<td>10:25 - 13:00</td>
				<td>13:00 - 15:00</td>
				<td>15:00 - 18:00</td>
			</tr>
		</thead>
	);
}
