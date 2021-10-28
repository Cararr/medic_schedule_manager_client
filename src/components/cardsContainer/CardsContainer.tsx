import React from 'react';
import { Card } from './Card';
import { CardProperties } from 'types';
import styles from './cardsContainer.module.scss';

interface Props {
	cards: CardProperties[];
	isUserBoss?: boolean;
}

export const CardsContainer: React.FunctionComponent<Props> = (props) => {
	const cards = props.cards.map((card: CardProperties, index: number) => {
		if (!card.adminOnly || (card.adminOnly && props.isUserBoss))
			return (
				<Card
					key={card.name}
					pathName={card.path}
					itemName={card.name}
					image={card.image}
					cardIndex={index}
				/>
			);
		return '';
	});

	return <section className={styles.container}>{cards}</section>;
};
