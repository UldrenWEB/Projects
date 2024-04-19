import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti'
import '../styles/modalCustom.css';

const ModalCustom = ({
    title,
    content,
    winner = { isWinner: false },
    setIsModalVisible
}) => {
    const [show, setShow] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {

        const isTitleError = /error/i.test(title);
        if (isTitleError) {
            setError(true);
        }

    }, [title]);

    const handleClose = () => {
        setShow(false);
        setIsModalVisible({ visible: false });
    }

    if (!show) return null;

    if (winner.isWinner) {
        confetti();
    }

    return (
        <>
            <div className='modal-overlay'>
                <div className='modali'>
                    <div className={error ? 'text-danger' : winner.isWinner ? 'text-white' : 'text-success'}>
                        <h1 className='title-modal'>{winner.isWinner ? 'Winner' : error ? 'Error' : 'Success'}</h1>
                    </div>
                    <div className="font-weight-light">
                        <div className="mb-3">
                            {winner.isWinner ? (
                                <>
                                    El ganador es <strong className="winner-name">{winner.name}</strong> con un total de <span className='winner-price'>{winner.price}$</span>
                                </>
                            ) : (
                                content
                            )}
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className='btn btn-my' onClick={handleClose}>Close</button>
                    </div>
                </div>
            </div>
        </>
    );
};


export default ModalCustom;
