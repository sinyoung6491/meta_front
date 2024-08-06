import React from 'react'
import { useState,useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/scss/action/action01.scss';
import Header from '../../components/action/Header';

const getCurrentFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year} . ${month} . ${day}`;
};

const Action = ({ inputValue,setInputValue }) => {
    const maxLength = 200;
    const navigate = useNavigate();
    const [input1Value, setInput1Value] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    const handleInputChange = (event) => {
        if (event.target.value.length <= maxLength) {
            setInput1Value(event.target.value);
        }
    };
    const handleNextClick = () => {
        setInputValue(input1Value)
        navigate('/action2');
    };
    useEffect(() => {
        setCurrentDate(getCurrentFormattedDate());
    }, []);

    return (
        <>
        <Header />
        <div className="action01">
            <div className="action_back">
                <main>
                    <div className="date">{currentDate}</div>
                    <div className="title">오늘 인지할 상황은</div>
                    <div className="input-container">
                        <textarea
                            className="input"
                            type="text"
                            placeholder="오늘 하루 중 기억에 남는 상황에 대해 자유롭게 작성해보세요."
                            value={input1Value}
                            onChange={handleInputChange}
                        />
                        <div className="char-count">{`${input1Value.length}/${maxLength}`}</div>
                    </div>
                    <div className="title">이다.</div>
                    <div className='btn'>
                        <button
                            className={`next-btn ${input1Value.trim() ? 'active' : ''}`}
                            disabled={!input1Value.trim()}
                            onClick={handleNextClick}
                        >
                            Next
                        </button>
                    </div>

                </main>
            </div>
        </div>
        </>
    )
}

export default Action