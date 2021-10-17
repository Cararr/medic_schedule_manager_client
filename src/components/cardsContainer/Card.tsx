import React from 'react';
import { NavLink } from 'react-router-dom';
import './Card.css';

interface Props {
	pathName: string;
	itemName: string;
	image: string;
	cardIndex: number;
}

export const Card: React.FunctionComponent<Props> = (props) => {
	return (
		<NavLink
			activeStyle={{
				borderStyle: 'dashed',
				transform: 'translate(+5px, +5px)',
			}}
			to={props.pathName}
			className={`card ${props.itemName === 'Create' && 'card-create'}`}
		>
			<img alt={`${props.itemName}`} src={props.image} />
			<figcaption>{props.itemName}</figcaption>
		</NavLink>
	);
};
