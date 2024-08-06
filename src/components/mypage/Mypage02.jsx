import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../assets/scss/mypage/Calendar.css';
import axios from 'axios';
import arrow from '../../assets/img/mypage/arrow.svg';

const Mypage02 = () => {
    const [date, setDate] = useState(new Date());
    const [circumstancesCount, setCircumstancesCount] = useState(null);
    const [goalsCount, setGoalsCount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const goToCircumstances = () => {
        navigate('/circumstancePage');
    };

    const goToGoal = () => {
        navigate('/GoalMain');
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const fetchCountsByDate = async (formattedDate) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await axios.get(`http://15.165.73.36:1234/api/counts/byDate?date=${formattedDate}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Error fetching counts data');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            const formattedDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
            try {
                const data = await fetchCountsByDate(formattedDate);
                setCircumstancesCount(data.circumstancesCount);
                setGoalsCount(data.goalsCount);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
                setCircumstancesCount(0);
                setGoalsCount(0);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [date]);

    const formatDate = (date) => {
        return `${date.getFullYear()}.${('0' + (date.getMonth() + 1)).slice(-2)}.${('0' + date.getDate()).slice(-2)}`;
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            return (
                <div className="custom-tile">
                    {date.getDate()}
                </div>
            );
        }
        return null;
    };

    return (
        <div className='mypage02_wrap'>
            <div className='calendar'>
                <Calendar
                    onChange={handleDateChange}
                    value={date}
                    tileContent={tileContent}
                />
            </div>

            <div className='detail'>
                <h3 className='h3'>날짜별 작성 내역</h3>

                {loading ? (
                    <p className='p'>Loading...</p>
                ) : error ? (
                    <div className='content01'>
                        <p className='p'>{formatDate(date)}</p>
                        <h4 className='h4'>Error fetching data: {error}</h4>
                    </div>
                ) : (circumstancesCount === 0 && goalsCount === 0) ? (
                    <div className='content01'>
                        <p className='p'>{formatDate(date)}</p>
                        <h4 className='h4'>작성하신 기록이 없습니다.</h4>
                    </div>
                ) : (
                    <div className='content01'>
                        <p className='p'>{formatDate(date)}</p>

                        <div className='set'>
                            <div className='content02'>
                                <h4 className='h4'>목표 설정</h4>
                                <h4 className='h4'>|</h4>
                                <h4 className='h4'>{goalsCount}개</h4>
                                <a className='a' onClick={goToGoal}>보러가기 <img src={arrow} className='arrow' alt='화살표'/></a>
                            </div>

                            <div className='content02'>
                                <h4 className='h4'>상황 인지</h4>
                                <h4 className='h4'>|</h4>
                                <h4 className='h4'>{circumstancesCount}개</h4>
                                <a className='a' onClick={goToCircumstances}>보러가기 <img src={arrow} className='arrow' alt='화살표'/></a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Mypage02;
