import React from 'react';
import { Link } from 'react-router-dom';
import './FigureCard.css';

export default function FigureCard(props) {
	return (
		<Link to={props.pathName}>
			<figure className="figure-card">
				<img alt={`${props.itemName}`} src={props.image} />
				<figcaption>{props.itemName}</figcaption>
			</figure>
		</Link>
	);
}
