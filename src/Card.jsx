import React from 'react';
const Card = ({ suit, rank, length, winner, type, dummyCard }) => {
    const getSymbol = (rank) => {
        let symbol;
        switch (rank) {
            case 'K':
                symbol = <span role="img" aria-label="King">👑</span>; // King symbol
                break;
            case 'J':
                symbol = <span role="img" aria-label="Joker">🃏</span>; // Joker symbol
                break;
            case 'A':
                symbol = <span role="img" aria-label="Ace">🅰️</span>; // Ace symbol
                break;
            case '2':
                symbol = '2️⃣'; // 2 symbol
                break;
            case '3':
                symbol = '3️⃣'; // 3 symbol
                break;
            case '4':
                symbol = '4️⃣'; // 4 symbol
                break;
            case '5':
                symbol = '5️⃣'; // 5 symbol
                break;
            case '6':
                symbol = '6️⃣'; // 6 symbol
                break;
            case '7':
                symbol = '7️⃣'; // 7 symbol
                break;
            case '8':
                symbol = '8️⃣'; // 8 symbol
                break;
            case '9':
                symbol = '9️⃣'; // 9 symbol
                break;
            case '10':
                symbol = '🔟'; // 10 symbol
                break;
            default:
                symbol = rank;
        }
        return symbol;
    };

    const symbol = getSymbol(rank);

    const color = suit === 'Hearts' || suit === 'Diamonds' ? 'red' : 'black';
    return (
        <>
            {dummyCard &&
                <div className="dummy-card">
                    <p>
                        dummy
                    </p>
                </div>
            }
            {!dummyCard &&
                <div className={`card ${color} m-4 md-${12 / length} border border-${(winner['dealer'] || winner['player'] || winner['tie']) && (type == 'dealer' && !winner['tie'] ? (winner[type] ? 'success' : 'danger') : type == 'player' && !winner['tie'] ? (winner[type] ? 'success' : 'danger') : winner['tie'] && 'warning')} border-${(winner['dealer'] || winner['player'] || winner['tie']) && 5}`} style={{ height: '200px', width: '130px' }}>
                    <div className="card-rank" style={{ paddingRight: '41%', fontSize: '315%' }}>{symbol}</div>
                </div>
            }

        </>
    );
};

export default Card;
