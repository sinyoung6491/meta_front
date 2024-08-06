import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../assets/scss/action/action04.scss';
import Header from '../../components/action/Header';

const getCurrentFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year} . ${month} . ${day}`;
};

const Action_4 = ({ inputValue, action2Values, action3Values  }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState('');
    useEffect(() => {
        setCurrentDate(getCurrentFormattedDate());
    }, []);

    const { items, action1Value, action3Values: receivedAction3Values } = location.state || {
        items: action2Values,
        action1Value: inputValue,
        action3Values: action3Values,
    };

    useEffect(() => {
        console.log("Received inputValue from Action:", items, action1Value, action3Values);
    }, [items, action1Value, action3Values]);

    const [conclusionValue, setConclusionValue] = useState('');
    const maxLength = 300;

    const handleInputChange = (event) => {
        if (event.target.value.length <= maxLength) {
            setConclusionValue(event.target.value);
        }

    };
    const handleNextClick = () => {
        navigate('/action5', {
            state: { items, action1Value, action3Values: receivedAction3Values, action4Values:conclusionValue }
        });
    };

    return (
        <>
      <Header />
      <div className="action04">
            <div className="action_back">
                <main>
                    <div className="date">{currentDate}</div>
                    <div className="action">{action1Value}</div>
                    <p className="title">상황에서</p>
                    <div className="feeling_div">
                        {items.map((item, index) => (
                            <div className="feel" key={index}>{item.value}</div>
                        ))}
                    </div>
                    <p className="title">을/를 느꼈으며</p>

                    <div className='reason'>
                        {items.map((item,  index) => (
                            <div>
                                <div className="title_div">
                                    <div className="title_emotion_num">{index + 1}</div>
                                    <p className="title_emotion">{item.value}</p>
                                    <p className="title">의 원인은</p>
                                </div>
                                <p className="text">{action3Values[index]}</p>

                            </div>
                        ))}
                    </div>
                    <p className="title">(라)고 생각한다.</p>
                    <p className="title end">따라서</p>
                    <div className="input-container">
                        <textarea
                            className="input"
                            type="text"
                            placeholder="최종적으로 현 상황을 해결하고 지금 느끼는 감정을 해소하기 위한 결론을 내려보세요."
                            value={conclusionValue}
                            onChange={handleInputChange}
                        />
                        <div className="char-count">{`${conclusionValue.length}/${maxLength}`}</div>
                    </div>
                    <p className="title">와 같은 결론을 내린다.</p>

                    <div className='btn'>
                        <button
                            className="back-btn"
                            onClick={() => navigate(-1)}
                        >
                            BACK
                        </button>
                        <button
                            className={`next-btn ${conclusionValue.trim() ? 'active' : ''}`}
                            disabled={!conclusionValue.trim()}
                            onClick={handleNextClick}
                        >
                            NEXT
                        </button>
                    </div>

                </main>
            </div>
        </div>
        </>
    )
}

export default Action_4