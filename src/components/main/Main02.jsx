import React, { useEffect, useState } from 'react';
import Togle01 from '../../assets/img/main/1.svg';
import Togle02 from '../../assets/img/main/2.svg';
import Togle03 from '../../assets/img/main/Togle03.svg';
import pen from '../../assets/img/main/new.svg';
import line from '../../assets/img/main/line.svg';
import detail from '../../assets/img/main/more.svg';
import { useNavigate } from 'react-router-dom';
import { gettotalCircumstances,getGoals } from '../../services/apiService';
import axios from 'axios';
// 유틸리티 함수
const getFormattedDate = (date) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year} . ${month} . ${day}`;
  };

const Main02 = () => {
    const navigate = useNavigate();
    const [priorityGoal, setPriorityGoal] = useState({ goalText: '', sortedTexts: [], createdTime: '' });

    const [goals, setGoals] = useState([]);
    const [recentCircumstances, setRecentCircumstances] = useState([]);

    const [userProfile, setProfile] = useState({
        id: '',
        username: '',
        motto: '',
    });

    const actiondateClick = (id) => {
        navigate(`/action6/${id}`);
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const profileResponse = await axios.get('http://15.165.73.36:1234/api/user-profile', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });

                const response = await getGoals();
                const fetchedGoals = response.goals || response;

                const priorityGoal = fetchedGoals.find(goal => goal.priority);
                if (priorityGoal) {
                    setPriorityGoal({
                        goalText: priorityGoal.goal,
                        sortedTexts: priorityGoal.actions,
                        createdTime: priorityGoal.createdTime,
                    });
                }

                const userProfile = profileResponse.data;

                setProfile({
                    id: userProfile.id,
                    username: userProfile.username,
                    motto: userProfile.motto,
                });

                const data = await gettotalCircumstances();
                const sortedCircumstances = data.circumstances.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
                setRecentCircumstances(sortedCircumstances.slice(0, 4));
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        fetchUserProfile();
    }, []);

    const circumstanceButtonClick = () => {
        navigate('/circumstancePage');
    };

    const goalButtonClick = () => {
        navigate('/goalMain', { state: { priorityGoal } });
    };

    const newGoalButtonClick = () => {
        navigate('/goal01');
    };

    const mypageButtonClick = () => {
        navigate('/mypage');
    };

    const newCircumstancegoalButtonClick = () => {
        navigate('/action1');
    };

    return (
        <div className='main02_wrap'>
            <div className='welcome'>
                <p className='p'>Welcome To Metalog</p>
                <div className='underline01' />
                <p className='p'>{userProfile.username} Dashboard</p>
                <div className='underline02' />
            </div>
            <div className='container01'>
                <div className='proprity'>
                    <h3 className='text'>PRIORITY GOAL</h3>
                    <div className='goal'>
                        <p className='date_left'>{getFormattedDate(new Date())}</p>
                        <p className='date'>|</p>
                        <p className='goal_right'>{priorityGoal.goalText}</p>
                    </div>
                    <div className='togle'>
                        {priorityGoal.sortedTexts && priorityGoal.sortedTexts.map((text, index) => (
                            <div className={`content0${index + 1}`} key={index}>
                                <img src={index % 3 === 0 ? Togle01 : index % 3 === 1 ? Togle02 : Togle03} className='icon' />
                                <p className='detail'>{text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className='go_to_goal'>
                    <button className='goalbtn' onClick={goalButtonClick}>목표를 위한 실천 방법 보러가기</button>
                    <div className='write' onClick={newGoalButtonClick}>
                        <img src={pen} className='pen' />
                        <div className='new'>신규 목표 작성하기</div>
                    </div>
                </div>
            </div>

            <div className='circumstance'>
                <div className='content03'>
                    <h1 className='h1'>PREVIOUS CIRCUMSTANCE</h1>
                    <div className='content04' onClick={circumstanceButtonClick}>
                        <h3 className='more'>더보기</h3>
                        <img src={detail} className='detail' />
                    </div>
                </div>

                <div className='container02'>
                    {recentCircumstances.map(circumstance => (
                        <div key={circumstance.id} className='box' onClick={() => actiondateClick(circumstance.id)} style={{ cursor: 'pointer' }}>
                            <h3 className='h3'>{new Date(circumstance.createdDate).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            }).replace(/\./g, ' . ')}</h3>
                        </div>
                    ))}
                </div>

                <div className='circumstance_box' onClick={newCircumstancegoalButtonClick}>
                    <div className='text'>
                        <h1 className='h1'>CIRCUMSTANCE</h1>
                        <p className='p'>상황에 대한 인지 능력을 키워보세요!</p>
                    </div>
                    <img src={line} className='line' />
                </div>

                <div className='circumstance_box' onClick={newGoalButtonClick}>
                    <div className='text'>
                        <h1 className='h1'>GOAL</h1>
                        <p className='p'>목표를 설정하고 도달하기 위해 노력하며 메타인지를 향상시켜보세요!</p>
                    </div>
                    <img src={line} className='line' />
                </div>
            </div>
        </div>
    );
};

export default Main02;
