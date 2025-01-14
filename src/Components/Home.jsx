import { useState, useEffect, useRef } from "react";
import { FaHeart, FaHeartBroken, FaPlay } from "react-icons/fa";
import { Modal } from 'react-bootstrap';

const Lives = ({ lives }) => {
    const hearts = [];
    for (let i = 0; i < 3; i++) {
        hearts.push(
            <span className="mx-1" key={i}>{i < lives ? <FaHeart /> : <FaHeartBroken />}</span>
        );
    }
    return (<span className="text-danger" >{hearts}</span>);
};

const Home = () => {
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [highScore, setHighScore] = useState(0);
    const [activeMoleIndex, setActiveMoleIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const intervalRef = useRef(null);
    const [start, setStart] = useState(false);
    const data = [
        { id: 0, src: "./Hole.png" },
        { id: 1, src: "./Hole.png" },
        { id: 2, src: "./Hole.png" },
        { id: 3, src: "./Hole.png" },
        { id: 4, src: "./Hole.png" },
        { id: 5, src: "./Hole.png" },
        { id: 6, src: "./Hole.png" },
        { id: 7, src: "./Hole.png" },
        { id: 8, src: "./Hole.png" },
        { id: 9, src: "./Hole.png" },
        { id: 10, src: "./Hole.png" },
        { id: 11, src: "./Hole.png" },
    ];

    useEffect(() => {
        const storedHighScore = localStorage.getItem("highScore");
        if (storedHighScore) {
            setHighScore(parseInt(storedHighScore, 10));
        }
    }, []);

    useEffect(() => {
        if (lives === 0) {
            if (score > highScore) {
                localStorage.setItem("highScore", score);
                setHighScore(score);
            }
            clearInterval(intervalRef.current);
            setShowModal(true);
        }
    }, [lives, score, highScore]);

    const handleMoleClick = (index) => {
        if (index === activeMoleIndex) {
            setScore(score + 1);
            setActiveMoleIndex(null); // Hide the mole
        } else {
            setLives(lives - 1);
        }
    };

    const startGame = () => {
        setStart(true)
        setScore(0);
        setLives(3);
        setActiveMoleIndex(null);
        intervalRef.current = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * 12);
            setActiveMoleIndex(randomIndex);
        }, 700);
    };

    const handleClose = () => {
        setShowModal(false);
        setLives(3)
        setStart(false)
        setScore(0)
    };

    const clearHighScore = () => {
        setHighScore(0);
        localStorage.removeItem("highScore");
    };

    return (
        <>
            <div className="row">
                <div className="col-sm-6 mx-auto">
                    <div className="row justify-content-around mt-5">
                        <div className="col-sm-4 text-center"><h4><span className="fw-bold">Score </span> <br /><span className="text-danger">{score}</span></h4></div>
                        <div className="col-sm-4 text-center"><h4><span className="fw-bold">Lives  </span> <br /> <Lives lives={lives} /></h4></div>
                    </div>
                    {start ? <div className="game-board">
                        <div className="row">
                            {data.map((item) => (
                                <div key={item.id} className="col-sm-3" onClick={() => handleMoleClick(item.id)}>
                                    <img
                                        src={activeMoleIndex === item.id ? "./Mole.png" : item.src}
                                        className="img-fluid "
                                    />
                                </div>
                            ))}
                        </div>
                    </div> :
                        <div className="row">
                            <button onClick={startGame} className="btn btn-dark mt-5 d-inline-block mx-auto mt-4 fw-bold" style={{ "width": "150px" }}><FaPlay /> Play </button>
                            <div className="col-sm-12 text-center mt-5">
                                <h2>Start the Game ... </h2>
                            </div>
                        </div>
                        
                    }




                </div>
            </div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Body>
                    <div className="row">
                        <h2 className="text-center text-success fw-bold border-bottom border-3 border-success w-75 mx-auto pb-3">Results  :</h2>
                        <div className="col-sm-12  mt-3 text-center">
                            <div><span className="fw-bold fs-4">Your score:</span> <span className="text-success fs-4 fw-bold">{score}</span></div>
                            <div className="mt-3"><span className="fw-bold fs-4">Highest score: </span>  <span className="text-success fs-4 fw-bold">{highScore}</span>
                            
                            </div>
                        </div>
                        <div className="col-sm-12 d-flex justify-content-around mt-5">
                            <button className="btn btn-success d-inline-block fw-bold" onClick={handleClose}>
                                Close
                            </button>
                            <button className="btn btn-success  fw-bold d-inline-block" onClick={clearHighScore}>
                                Clear High Score
                            </button>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
};

export default Home;
