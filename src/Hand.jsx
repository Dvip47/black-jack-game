import Card from "./Card";

// Hand Component
const Hand = ({ cards, totalSum, type, winner }) => {
    return (
        <div className={`hand`}>
            <div className='row'>
                {cards.map((card, index) => (
                    <Card key={index} suit={card.suit} rank={card.rank} length={cards.length} winner={winner} type={type} />
                ))}
            </div>
        </div>
    );
};

export default Hand;