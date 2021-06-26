import React, { useState } from 'react';
import Card from './Card';
import './CardsContainer.css';

export default function CardsContainer(props) {
	const [cardClicked, setCardClicked] = useState(null);
	const handleCardClick = (index) => setCardClicked(index);

	const cards = props.cards.map((card, index) => {
		if (!card.adminOnly || (card.adminOnly && props.isUserAdmin))
			return (
				<Card
					key={card.name}
					pathName={card.path}
					itemName={card.name}
					image={card.image}
					clickedClass={cardClicked === index && 'card-clicked'}
					handleCardClick={() => handleCardClick(index)}
				/>
			);
		return '';
	});

	return <section className="container-card">{cards}</section>;
}
