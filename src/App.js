import React, { useEffect, useState } from 'react';
import VerticalMenu from './VerticalMenu';
import Hand from './Hand';
import './App.css';
import { Container, Row, Col, Label, Input, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import sound from './sound/card_swip_sound.mp3'
import Card from './Card';
// App Component
const App = () => {
  const initScore = {
    dealer: 0,
    player: 0
  }
  const initWinner = {
    dealer: false,
    player: false,
    tie: false
  }
  const [balance, setBalance] = useState(1000);
  const [betAmount, setBetAmount] = useState(0);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [totalSum, setTotalSum] = useState(initScore);
  const [winner, setWinner] = useState(initWinner);

  const handleBetAmountChange = (event) => {
    const amount = parseInt(event.target.value);
    if (!isNaN(amount) && amount >= 0) {
      setBetAmount(amount);
    }
  };

  const handleHalfBet = () => {
    const halfBalance = Math.floor(balance / 2);
    setBetAmount(halfBalance);
  };

  const handleDoubleBet = () => {
    if (betAmount * 2 <= balance) {
      setBetAmount(betAmount * 2);
    }
  };

  const handleNewBet = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setTotalSum(initScore);
    setWinner(initWinner);
    if (totalSum['player'] <= 0) {
      handleHit();
    }
  };

  const handleHit = () => {
    const card = drawCard();
    let tempSum = totalSum;
    let tempVal = 0;
    if (card.rank == 'Q' || card.rank == 'J' || card.rank == 'K' || card.rank == 'A') {
      tempVal = 10;
    } else {
      tempVal = parseInt(card.rank);
    }
    const audio = new Audio(sound);
    audio.play();
    tempSum['player'] += tempVal;
    setTotalSum(tempSum);
    setPlayerHand([...playerHand, card]);
    if (tempSum['player'] >= 21) {
      handleStand();
    } else {
      setTimeout(() => {
        handleDealerHit();
      }, 500);
    }
  };

  const handleStand = () => {
    const winnercurrent = determineWinner();
    let tempWinner = { ...winner };
    tempWinner[winnercurrent] = true;
    setWinner(tempWinner);
  };

  const handleSplit = () => {
    // Implement logic for splitting the player's hand
    // For simplicity, let's not implement this feature for now
  };

  const handleDouble = () => {
    const newBetAmount = betAmount * 2;
    if (newBetAmount <= balance) {
      const card = drawCard();
      setBetAmount(newBetAmount);
      setPlayerHand([...playerHand, card]);
    }
  };

  const handleDealerHit = () => {
    const card = drawCard();
    let tempSum = totalSum;
    let tempVal = 0;
    if (card.rank == 'Q' || card.rank == 'J' || card.rank == 'K' || card.rank == 'A') {
      tempVal = 10;
    } else {
      tempVal = parseInt(card.rank);
    }
    const audio = new Audio(sound);
    audio.play();
    tempSum['dealer'] += tempVal;
    setTotalSum(tempSum);
    setDealerHand([...dealerHand, card]);
    if (tempSum['dealer'] >= 21) {
      handleStand();
    }
  };

  const drawCard = () => {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
    return { suit: randomSuit, rank: randomRank };
  };
  const determineWinner = () => {

    const playerTotal = totalSum['player'];
    const dealerTotal = totalSum['dealer'];
    if (playerTotal === 21 && playerHand.length === 2) {

      return 'player';
    }

    if (playerTotal > 21) {
      return 'dealer';
    }

    if (dealerTotal > 21) {
      return 'player';
    }

    if (playerTotal > dealerTotal) {
      return 'player';
    } else if (playerTotal < dealerTotal) {
      return 'dealer';
    } else {
      return 'tie';
    }
  }

  return (
    <Row className="app font-weight-bold">
      <Col className="vertical-menu text-center" xs='3'>
        <VerticalMenu
          balance={balance}
          betAmount={betAmount}
          handleBetAmountChange={handleBetAmountChange}
          handleHalfBet={handleHalfBet}
          handleDoubleBet={handleDoubleBet}
          handleNewBet={handleNewBet}
          handleHit={handleHit}
          handleStand={handleStand}
          handleSplit={handleSplit}
          handleDouble={handleDouble}
          totalSum={totalSum}
          winner={winner}
        />
      </Col>
      <Col xs='9'>
        <Row>
          <Col xs='10'>
            <div className="playing-space">
              <Row style={{ height: '350px' }}>
                <Col>
                  {totalSum['dealer'] > 0 &&
                    <span className='text-white'>
                      Player Score:{totalSum['dealer']}
                    </span>
                  }
                  <Hand cards={dealerHand} totalSum={totalSum} type='dealer' winner={winner} />
                </Col>
              </Row>
              <p style={{ color: 'white' }}>------------------------------------------------------------------Dealer-----------------------------------------------------------------------------------------------------------------------------------------Player-----------------------------------------------------------------------</p>
              <Col>
                <Row>
                  {totalSum['player'] > 0 &&
                    <span className='text-white'>
                      Player Score:{totalSum['player']}
                    </span>
                  }
                  <Hand cards={playerHand} totalSum={totalSum} type='player' winner={winner} />
                </Row>
              </Col>
            </div>
          </Col>

        </Row>
      </Col >
    </Row >

  );
};

export default App;