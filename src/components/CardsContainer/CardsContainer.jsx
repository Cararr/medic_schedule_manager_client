import React from 'react';
import Card from './Card.jsx';
import './CardsContainer.css';

export default function CardsContainer(props) {
	const cards = props.cards.map((card) => {
		if (!card.adminOnly || (card.adminOnly && props.isUserAdmin))
			return (
				<Card
					key={card.name}
					pathName={card.path}
					itemName={card.name}
					image={card.image}
				/>
			);
		return '';
	});

	return <div className="container-card">{cards}</div>;
}
