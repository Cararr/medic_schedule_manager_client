import React from 'react';
import FigureCard from '../FigureCard/FigureCard.jsx';
import './CardsContainer.css';

export default function CardsContainer(props) {
	const cards = props.cards.map((card) => {
		if (!card.adminOnly || (card.adminOnly && props.isUserAdmin))
			return (
				<FigureCard
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
