import React from 'react'
import { useState,useEffect  } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import '../../assets/scss/action/action03.scss';
import Header from '../../components/action/Header';


const Action_3 = ({ inputValue, action2Values, setAction3Values  }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { items, action1Value } = location.state || { items: action2Values, action1Value: inputValue };
    const [inputValues, setInputValues] = useState(Array(items.length).fill(''));
    const maxLength = 300;
    

    const handleInputChange = (index, event) => {
        const newInputValues = [...inputValues];
        if (event.target.value.length <= maxLength) {
            newInputValues[index] = event.target.value;
            setInputValues(newInputValues);
        }
    };
    const handleNextClick = () => {
        setAction3Values(inputValues);
        navigate('/action4', { state: { items, action1Value, action3Values: inputValues } });
    };

    useEffect(() => {
        console.log("Received inputValue from Action:",items, action1Value);
    }, [items,action1Value]);

    return (
        <>
      <Header />
      <div className="action03">
            <div className="action_back">
                <main>
                {items.map((item, index) => (
                    <div className='reason' key={index}>
                        <div className="title_div">
                            <div className="title_emotion_div">
                                <div className="title_emotion_num">{index + 1}</div>
                                <p className="title_emotion">{item.value}</p>
                            </div>
                            <p className="title">의 원인은</p>
                        </div>
                        <div className="input-container">
                            <textarea
                                className="input"
                                type="text"
                                placeholder="오늘 하루 중 기억에 남는 상황에 대해 자유롭게 작성해보세요."
                                value={inputValues[index]}
                                onChange={(e) => handleInputChange(index, e)}
                            />
                            <div className="char-count">{`${inputValues[index].length}/${maxLength}`}</div>
                        </div>
                    </div>
                    ))}
                    <div className="title">(라)고 생각한다.</div>
                    <div className='btn'>
                        <button
                            className="back-btn"
                            onClick={() => navigate(-1)}
                        >
                            BACK
                        </button>
                        <button
                            className={`next-btn ${inputValues.every(value => value.trim()) ? 'active' : ''}`}
                            disabled={inputValues.some(value => !value.trim())}
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

export default Action_3