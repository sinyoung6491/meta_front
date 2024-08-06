import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import GoalItem from '../../components/GoalItem';
import '../../assets/scss/goal/goalMain.scss';
import Header from '../../components/main/Header';
import newimg from '../../assets/img/goal/edit.png';
import { getGoals } from '../../services/apiService';

// 유틸리티 함수
const getFormattedDate = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year} . ${month} . ${day}`;
};

const GoalMain = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [priorityGoal, setPriorityGoal] = useState({ goalText: '', sortedTexts: [], createdTime: '' });

  //const { goalText, sortedTexts, createdTime } = location.state || { goalText: '', sortedTexts: [], createdTime: '' };

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeButton, setActiveButton] = useState('등록순'); // 활성화된 버튼 상태를 관리

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await getGoals();
        const fetchedGoals = response.goals || response; // 응답 구조가 goals 배열이 있는지 확인
        console.log('Fetched goals:', fetchedGoals); // 데이터 로그 출력
        setGoals(sortGoals(fetchedGoals, '등록순')); // 기본 정렬: 등록순

        // 로컬 스토리지에서 상위 목표를 불러오기
        const priorityGoal = fetchedGoals.find(goal => goal.priority);
        if (priorityGoal) {
          setPriorityGoal({
            goalText: priorityGoal.goal,
            sortedTexts: priorityGoal.actions,
            createdTime: priorityGoal.createdTime,
          });
        }
      } catch (error) {
        console.error('Failed to fetch goals:', error);
        setError('목표를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);


  const sortGoals = (goals, order) => {
    const sortedGoals = [...goals];
    if (order === '최신순') {
      sortedGoals.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
    } else {
      sortedGoals.sort((a, b) => new Date(a.createdTime) - new Date(b.createdTime));
    }
    return sortedGoals;
  };

  const handleSortOrderChange = (order) => {
    setActiveButton(order); // 활성화된 버튼 상태 업데이트
    setGoals(prevGoals => sortGoals(prevGoals, order));
  };

  const handleGoalItemClick = (goal) => {
    navigate(`/goalEdit/${goal.id}`, { state: { goalText: goal.goal, sortedTexts: goal.actions, createdTime: goal.createdTime } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="goal-main">
      <Header />
      <p>Goal cognition</p>
      <div className="goal-header">
        <h1><div className="date">{priorityGoal.createdTime ? getFormattedDate(priorityGoal.createdTime) : getFormattedDate(new Date())} GOAL </div></h1> {/* 목표 작성 날짜 표시 */}
        <h2>{priorityGoal.goalText}</h2>
      </div>
      <div className="goal-check">
        <div className="check-here">
          <h3>CHECK HERE</h3>
          <h4>작성하신 실천 방법을 확인하며 인지 연습을 해보세요.</h4>
        </div>
        <ul>
          {priorityGoal.sortedTexts.map((text, index) => (
            <div className="goal-item" key={index}>
              <span className="priority">{index + 1}</span>
              {text}
            </div>
          ))}
        </ul>
      </div>
      <div className="goal-content">
        <div className="goal-list">
          <div className="goal-count-sort-wrapper">
            <div className="goal-count">
              목표 {Array.isArray(goals) ? goals.length : 0}개
            </div>
            <div className="sort-buttons">
              <button 
                onClick={() => handleSortOrderChange('등록순')} 
                className={activeButton === '등록순' ? 'active' : ''}
              >
                등록순
              </button>
              <button 
                onClick={() => handleSortOrderChange('최신순')} 
                className={activeButton === '최신순' ? 'active' : ''}
              >
                최신순
              </button>
            </div>
          </div>
          {Array.isArray(goals) && goals.map((goal, index) => (
            <GoalItem
              key={index}
              date={goal.createdTime ? goal.createdTime.split('T')[0] : '날짜 없음'} // createdTime이 undefined일 경우
              title={goal.goal}
              onClick={() => handleGoalItemClick(goal)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
        <div className="execute">
          <ul>
            <h2>실천 방법</h2>
            {priorityGoal.sortedTexts.map((text, index) => (
              <div className="goal-item" key={index}>
                <span className="priority">{index + 1}</span>
                {text}
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div className="button-container">
        <button className="new-btn" onClick={() => navigate('/goal01')}>New <img src={newimg} alt="new" /></button>
      </div>
    </div>
  );
};

export default GoalMain;