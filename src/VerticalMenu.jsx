import React from 'react';
import {  Row, Col, Label, Input } from 'reactstrap';

// Vertical Menu Component
const VerticalMenu = ({ handleHit, handleSplit, handleDouble, handleStand, balance, betAmount, handleBetAmountChange, handleHalfBet, handleDoubleBet, handleNewBet, totalSum, winner }) => {
    return (
        <>
            <Row className='mt-3 ms-3 text-white'>
                <Col>
                    <Label>
                        Bet Amount:
                    </Label>
                </Col>
                <Col className='text-end'><span>${betAmount * 83}</span></Col>

            </Row>
            <Row className='m-1 p-1 input-button'>
                <Col xs='6'>
                    <Input type='number' value={betAmount} onChange={handleBetAmountChange} />
                </Col>
                <Col>
                    <button className='btn btn-light' onClick={handleHalfBet}>1/2</button>
                </Col>
                <Col>
                    <button className='btn btn-light' onClick={handleDoubleBet}>2X</button>
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col>
                    <button
                        className='btn btn-light'
                        onClick={handleHit}
                        disabled={(winner['player'] || winner['dealer'] || winner['tie']) || totalSum['player'] == 0}
                    >
                        Hit
                    </button>
                </Col>
                <Col>
                    <button
                        className='btn btn-light'
                        onClick={handleStand}
                        disabled={(winner['player'] || winner['dealer'] || winner['tie']) || totalSum['player'] == 0}
                    >
                        Stand
                    </button>
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col>
                    <button
                        className='btn btn-light'
                        onClick={handleSplit}
                    >
                        Split
                    </button>
                </Col>
                <Col>
                    <button
                        className='btn btn-light'
                        onClick={handleDouble}
                        disabled={(winner['player'] || winner['dealer'] || winner['tie']) || totalSum['player'] == 0}
                    >
                        Double
                    </button>
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col>
                    <button
                        className='btn btn-success btn-lg'
                        onClick={handleNewBet}
                        disabled={totalSum['player'] > 0 || (winner['player'] || winner['dealer'] || winner['tie'])}
                    >
                        Bet
                    </button>

                </Col>
            </Row>
        </>
    );
};

export default VerticalMenu;