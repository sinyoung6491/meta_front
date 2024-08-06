import React, { useEffect, useState } from 'react';
import axios from 'axios';
import def from '../../assets/img/mypage/profile.svg';
import { useNavigate } from 'react-router-dom';

const Mypage01 = () => {
  const navigate = useNavigate();
  const [userProfile, setProfile] = useState({
    id: '',
    username: '',
    motto: '',
    profilePicture: def,
  });

  const [countsData, setCount] = useState({
    goalsCount: 0,
    circumstancesCount: 0,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const profileResponse = await axios.get('http://15.165.73.36:1234/api/user-profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      const userProfile = profileResponse.data;

      setProfile({
        id: userProfile.id,
        username: userProfile.username,
        motto: userProfile.motto,
        profilePicture: userProfile.profilePicture ? `data:image/jpeg;base64,${userProfile.profilePicture}` : def,
      });
    } catch (error) {
      throw new Error('Error fetching user profile');
    }
  };

  const fetchCounts = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const countsResponse = await axios.get('http://15.165.73.36:1234/api/counts', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      return countsResponse.data;
    } catch (error) {
      throw new Error('Error fetching counts data');
    }
  };

  useEffect(() => {
    const loadProfileAndCounts = async () => {
      try {
        await fetchUserProfile();
        const countsData = await fetchCounts();
        setCount({
          goalsCount: countsData.goalsCount || 0,
          circumstancesCount: countsData.circumstancesCount || 0,
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfileAndCounts();
  }, []);

  const modifyButtonClick = () => {
    navigate('/modify');
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='profile'>
      <img src={userProfile.profilePicture} className='img'/>
      <img src={def} className='img_default'/ >
      <h1 className='id'>{userProfile.username || '아이디를 설정해 주세요.'}</h1>
      <hr className='line' />
      
      <div className='det'>
        <div className='container01'>
          <h3 className='h3'>좌우명 한 줄 소개</h3>
          <p className='p'>{userProfile.motto || '좌우명이 비어 있습니다.'}</p>
        </div>

        <div className='container02'>
          <h3 className='h3'>활동 내역</h3>
          <div className='counter'>
            <p className='p'>지금까지 작성한 목표</p>
            <p className='p'>{countsData.goalsCount}개</p>
          </div>
          <div className='counter'>
            <p className='p'>지금까지 작성한 상황</p>
            <p className='p'>{countsData.circumstancesCount}개</p>
          </div>
        </div>
      </div>

      <button className='modify' onClick={modifyButtonClick}>개인정보 수정하기</button>

      {error && <p className='error'>Error: {error}</p>}
    </div>
  );
};

export default Mypage01;