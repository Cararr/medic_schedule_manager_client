import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './cardsContainer.module.scss';

interface Props {
	pathName: string;
	itemName: string;
	image: string;
	cardIndex: number;
}

export const Card: React.FunctionComponent<Props> = (props) => {
	return (
		<NavLink
			style={({ isActive }) =>
				isActive
					? {
							borderStyle: 'dashed',
							transform: 'translate(+5px, +5px)',
					  }
					: {}
			}
			to={props.pathName}
			className={`${styles.card} ${
				props.itemName === 'Create' ? styles.hidden : ''
			}`}
		>
			<img alt={`${props.itemName}`} src={props.image} />
			<figcaption>{props.itemName}</figcaption>
		</NavLink>
	);
};
