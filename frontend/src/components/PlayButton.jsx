import React from 'react'; 
import { useNavigate } from 'react-router-dom';

const PlayButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/game');
    };

    return (
    <button onClick={handleClick}>
        Play
    </button>
    );
};

export default PlayButton;