import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../assets/scss/setting/resets.scss';
import '../../assets/scss/goal/goal04.scss';
import checkimg from '../../assets/img/goal/check.png';
import Header from '../../components/goal/Header';
import { addGoal } from '../../services/apiService';

const getFormattedDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Goal04 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { goalText, sortedTexts } = location.state || { goalText: '', sortedTexts: [] };

  const handleSaveClick = async () => {
    try {
      const goalData = {
        goal: goalText,
        actions: sortedTexts,
        priority: true,
        userId: 1, // 실제 사용자 ID로 변경
        createdTime: new Date().toISOString(), // 작성 시간 추가
      };
      const savedGoal = await addGoal(goalData);
      alert('목표 작성이 완료되었습니다!');
      navigate('/goalMain', { state: { goalText: savedGoal.goal, sortedTexts: savedGoal.actions, createdTime: savedGoal.createdTime } });
    } catch (error) {
      console.error('작성 실패:', error);
      alert('목표 작성을 실패하였습니다.');
    }
  };

  return (
    <div className="goal04">
      <Header />
      <div className="content">
        <main>
          <h1 className="conclusion">Conclusion</h1>
          <div className="date">{getFormattedDate()}</div> {/* 현재 날짜 표시 */}
          <div className="goal-text">{goalText}</div>
          <div className="goal-subtext">라는 목표를 이루기 위해</div>
          <div className="goals">
            {sortedTexts.map((text, index) => (
              <div className="goal-item" key={index}>
                <span className="priority">{index + 1}</span>
                {text}
              </div>
            ))}
          </div>
          <div className="goal">를 실천할 것이다.</div>
          <div className="button-container">
            <button className="save-btn" onClick={handleSaveClick}>
              SAVE <img src={checkimg} alt="check" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Goal04;
