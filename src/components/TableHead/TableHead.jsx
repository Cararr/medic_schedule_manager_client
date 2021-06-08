import React from 'react';
import './TableHead.css';

export default function TableHead(props) {
	const workStageSpans = props.workStageSpans?.map((stage, index) => {
		if (props.stationName === 'WIZYTY' && index !== 2) return false;
		return <td key={stage.id}>{`${stage.from} - ${stage.to}`}</td>;
	});
	return (
		<thead>
			<tr>
				<td className="table-title" colSpan={4}>
					{props.stationName}
				</td>
			</tr>
			<tr>{workStageSpans}</tr>
		</thead>
	);
}
