import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import '../../assets/scss/goal/goal01.scss';
import '../../assets/scss/setting/resets.scss';
import Header from '../../components/goal/Header';


function Goal01({ setGoalText }) {
  const [inputValue, setInputValue] = useState('');
  const maxLength = 20;
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    if (event.target.value.length <= maxLength) {
      setInputValue(event.target.value);
    }
  };

  const handleNextClick = () => {
    if (inputValue.trim()) {
      setGoalText(inputValue);
      navigate('/goal02');
    }
  };

  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year} . ${month} . ${day}`;
  };

  return (
    <div className="goal01">
      <Header />
      <div className="content">
        <main>
          <div className="date">{getFormattedDate()}</div>
          <div className="title">이루고자 하는 목표는</div>
          <div className="input-container">
            <input
              className="input"
              type="text"
              placeholder="이루고자 하는 목표가 무엇인지 작성해주세요."
              value={inputValue}
              onChange={handleInputChange}
            />
            <div className="char-count">{`${inputValue.length}/${maxLength}`}</div>
          </div>
          <div className="goal">이다.</div>
          <button
            className={`next-btn1 ${inputValue.trim() ? 'active' : ''}`}
            disabled={!inputValue.trim()}
            onClick={handleNextClick}
          >
            Next
          </button>
        </main>
      </div>
    </div>
  );
}

export default Goal01;
