
import React, { useState, useEffect  } from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Goal01 from './pages/goal/Goal01';
import Goal02 from './pages/goal/Goal02';
import Goal03 from './pages/goal/Goal03';
import Goal04 from './pages/goal/Goal04';
import GoalMain from './pages/goal/GoalMain';
import GoalEdit from './pages/goal/GoalEdit';
import Main from './pages/main/Main';
import Login from './pages/login/Login';
import Enter from './pages/enter/Enter';
import Signin from './pages/signin/Signin';
import Mypage from './pages/mypage/Mypage';
import Modify from './pages/modify/Modify';
import CircumstancePage from './pages/circumstance_page/CircumstancePage';
import Action1 from './pages/action/Action.jsx';
import Action2 from './pages/action/Action_2.jsx';
import Action3 from './pages/action/Action_3.jsx';
import Action4 from './pages/action/Action_4.jsx';
import Action5 from './pages/action/Action_5.jsx';
import Action6 from './pages/action/Action_6.jsx';
import Mypage01 from './components/mypage/Mypage01.jsx';
import { getPriorityGoal } from './services/apiService';

function App() {
  const [goalText, setGoalText] = useState('');
  const [sortedTexts, setSortedTexts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [action2Values, setAction2Values] = useState([]);
  const [action3Values, setAction3Values] = useState([]);
  const [action4Values, setAction4Values] = useState('');
  const [priorityGoal, setPriorityGoal] = useState({ date: '', goal: '' });
  

  useEffect(() => {
    const fetchPriorityGoal = async () => {
      const goalData = await getPriorityGoal();
      setPriorityGoal(goalData);
    };

    fetchPriorityGoal();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/action1'
          element={<Action1 inputValue={inputValue} setInputValue={setInputValue} />} />
        <Route path='/action2'
          element={<Action2 inputValue={inputValue} action2Values={action2Values} setAction2Values={setAction2Values} />} />
        <Route path="/action3"
          element={<Action3 inputValue={inputValue} action2Values={action2Values} action3Values={action3Values} setAction3Values={setAction3Values} />} />
        <Route path="/action4"
          element={<Action4 inputValue={inputValue} action2Values={action2Values} action3Values={action3Values} action4Values={action4Values} setAction4Values={setAction4Values} />}
        />
        <Route path="/action5"
          element={<Action5 inputValue={inputValue} action2Values={action2Values} action3Values={action3Values} action4Values={action4Values} />}
        />
        <Route path="/action6/:id" element={<Action6 />} />
        <Route path="/" element={<Login />} />
        <Route path="/enter" element={<Enter />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/main" element={<Main goalData={priorityGoal} />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/user-profile/:id" element={<Mypage01 />} />
        <Route path="/modify" element={<Modify />} />
        <Route path='/circumstancePage' element={<CircumstancePage/>} />
        <Route path="/goalMain" element={<GoalMain />} />
        <Route path="/goal01" element={<Goal01 setGoalText={setGoalText} />} />
        <Route path="/goal02" element={<Goal02 goalText={goalText} setSortedTexts={setSortedTexts} />} />
        <Route path="/goal03" element={<Goal03 goalText={goalText} />} />
        <Route path="/goal04" element={<Goal04 goalText={goalText} sortedTexts={sortedTexts} />} />
        <Route path="/goalEdit/:goalId" element={<GoalEdit />} /> {/* goalId를 URL 파라미터로 전달 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
