import React, { useState } from 'react';
import { Card } from './Card';
import { CardProperties } from '../../types';
import './CardsContainer.css';

interface Props {
	cards: CardProperties[];
	isUserBoss?: boolean;
}

export const CardsContainer: React.FunctionComponent<Props> = (props) => {
	const [cardClicked, setCardClicked] = useState<number | null>(null);

	const handleCardClick = (index: number) => setCardClicked(index);

	const cards = props.cards.map((card: CardProperties, index: number) => {
		if (!card.adminOnly || (card.adminOnly && props.isUserBoss))
			return (
				<Card
					key={card.name}
					pathName={card.path}
					itemName={card.name}
					image={card.image}
					cardIndex={index}
					clickedClass={cardClicked === index && 'card-clicked'}
					handleCardClick={handleCardClick}
				/>
			);
		return '';
	});

	return <section className="container-card">{cards}</section>;
};
