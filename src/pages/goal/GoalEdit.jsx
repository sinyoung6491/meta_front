import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../assets/scss/setting/resets.scss';
import '../../assets/scss/goal/goaledit.scss';
import Header from '../../components/goal/Header';
import { getGoalById, setGoalPriority, deleteGoal } from '../../services/apiService';

const getFormattedDate = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year} . ${month} . ${day}`;
};

const GoalEdit = () => {
  const { goalId } = useParams(); // URL에서 goalId를 추출
  const navigate = useNavigate();
  const [goalText, setGoalText] = useState('');
  const [sortedTexts, setSortedTexts] = useState([]);
  const [createdTime, setCreatedTime] = useState('');

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const goalData = await getGoalById(goalId);
        setGoalText(goalData.goal);
        setSortedTexts(goalData.actions);
        setCreatedTime(goalData.createdTime);
      } catch (error) {
        console.error('목표 조회 실패:', error);
        alert('목표 조회에 실패했습니다.');
      }
    };

    if (goalId) {
      fetchGoal();
    }
  }, [goalId]);

  const handleSaveClick = async () => {
    try {
      await setGoalPriority(goalId);
      const priorityGoal = {
        date: getFormattedDate(createdTime),
        goalText,
        sortedTexts,
      };
      localStorage.setItem('priorityGoal', JSON.stringify(priorityGoal));
      alert('상위 목표로 설정되었습니다.');
      navigate('/goalMain', { state: { goalText, sortedTexts } });
    } catch (error) {
      console.error('상위 목표 설정 실패:', error);
      alert('상위 목표 설정에 실패했습니다.');
    }
  };

  const handleRemoveClick = async () => {
    try {
      await deleteGoal(goalId);
      alert('목표가 삭제되었습니다.');
      navigate('/goalMain');
    } catch (error) {
      console.error('목표 삭제 실패:', error);
      alert('목표 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="goal-edit">
      <Header />
      <div className="content">
        <main>
          <h1 className="conclusion">Conclusion</h1>
          <div className="date">{getFormattedDate(createdTime)}</div>
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
            <button className="set-btn" onClick={handleSaveClick}>상위목표로 설정하기</button>
            <button className="remove-btn" onClick={handleRemoveClick}>삭제하기</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default GoalEdit;
