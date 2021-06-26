import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

export default function FigureCard(props) {
	return (
		<Link onClick={props.handleCardClick} to={props.pathName}>
			<figure className={`card ${props.clickedClass}`}>
				<img alt={`${props.itemName}`} src={props.image} />
				<figcaption>{props.itemName}</figcaption>
			</figure>
		</Link>
	);
}
