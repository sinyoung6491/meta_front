import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/scss/setting/resets.scss';
import '../../assets/scss/goal/goal02.scss';
import Header from '../../components/goal/Header';

const Goal02 = ({ goalText }) => {
  const [inputs, setInputs] = useState(['']);
  const maxLength = 30;
  const navigate = useNavigate();
  const maxInputs = 3;

  const handleInputChange = (index, event) => {
    if (event.target.value.length <= maxLength) {
      const newInputs = [...inputs];
      newInputs[index] = event.target.value;
      setInputs(newInputs);
    }
  };

  const handleBackClick = () => {
    navigate('/goal01');
  };

  const handleNextClick = () => {
    navigate('/goal03', { state: { goalTexts: inputs, goalText } });
  };

  const handleAddInput = () => {
    if (inputs.length < maxInputs) {
      setInputs([...inputs, '']);
    }
  };

  const handleRemoveInput = (index) => {
    const newInputs = inputs.filter((_, i) => i !== index);
    setInputs(newInputs);
  };

  const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year} . ${month} . ${day}`;
  };

  return (
    <div className="goal02">
      <Header />
      <div className="content">
        <main>
          <div className="date">{getFormattedDate()}</div>
          <div className="goal-text">{goalText}</div>
          <div className="goal-subtext">을/를 위해서는</div>
          {inputs.map((input, index) => (
            <div className="input-container02" key={index}>
              <input
                className="input"
                type="text"
                placeholder="목표를 달성하기 위해 필요하다고 생각되는 방법을 적어주세요."
                value={input}
                onChange={(e) => handleInputChange(index, e)}
              />
              <div className="char-count">{`${input.length}/${maxLength}`}</div>
              {index > 0 && (
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveInput(index)}
                >
                  -
                </button>
              )}
              {index === inputs.length - 1 && inputs.length < maxInputs && (
                <button className="add-btn" onClick={handleAddInput}>
                  +
                </button>
              )}
            </div>
          ))}
          <div className="goal">이/가 필요하다</div>
          <div className="button-container">
            <button className="back-btn" onClick={handleBackClick}>
              Back
            </button>
            <button
              className={`next-btn ${inputs.some((input) => input.trim()) ? 'active' : ''}`}
              disabled={!inputs.some((input) => input.trim())}
              onClick={handleNextClick}
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Goal02;
