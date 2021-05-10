import React from 'react';
import './TableHead.css';

export default function TableHead(props) {
	const workStageSpans = props.workStageSpans.map((stage) => (
		<td key={stage.id}>{`${stage.from} - ${stage.to}`}</td>
	));
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
