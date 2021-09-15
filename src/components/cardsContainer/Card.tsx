import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

interface Props {
	pathName: string;
	itemName: string;
	image: string;
	cardIndex: number;
	clickedClass: string | boolean;
	handleCardClick: (index: number) => void;
}

export const Card: React.FunctionComponent<Props> = (props) => {
	return (
		<Link
			onClick={() => props.handleCardClick(props.cardIndex)}
			to={props.pathName}
		>
			<figure
				className={`card ${props.clickedClass} ${
					props.itemName === 'Create' && 'card-create'
				}`}
			>
				<img alt={`${props.itemName}`} src={props.image} />
				<figcaption>{props.itemName}</figcaption>
			</figure>
		</Link>
	);
};
