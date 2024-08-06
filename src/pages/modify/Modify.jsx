import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/main/Header';
import gradiant from '../../assets/img/mypage/gradiant.svg';
import profile from '../../assets/img/mypage/profile.svg';
import add from '../../assets/img/modify/add.svg';
import remove from '../../assets/img/modify/remove.svg';

const Modify = () => {
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(profile);
  const [username, setUsername] = useState('');
  const [motto, setMotto] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [placeholderUsername, setPlaceholderUsername] = useState('아이디를 등록해 주세요');
  const [placeholderMotto, setPlaceholderMotto] = useState('좌우명을 입력해 주세요');
  const navigate = useNavigate();

  const apiClient = axios.create({
    baseURL: 'http://15.165.73.36:1234',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, error => {
    return Promise.reject(error);
  });

  const refreshToken = async () => {
    try {
      console.log('Refreshing token...');
      const response = await axios.post('http://15.165.73.36:1234/api/auth/refresh', {
        refreshToken: localStorage.getItem('refreshToken'),
      });
      console.log('New tokens received:', response.data);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      return response.data.accessToken;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      throw error;
    }
  };

  apiClient.interceptors.response.use(response => {
    return response;
  }, async error => {
    if (error.response && error.response.status === 401) {
      console.log('Token expired, attempting to refresh...');
      try {
        const newToken = await refreshToken();
        console.log('Retrying original request with new token...');
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axios(error.config);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const profileResponse = await apiClient.get('/api/user-profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const userProfile = profileResponse.data;
        setProfileImage(userProfile.profilePicture ? `data:image/jpeg;base64,${userProfile.profilePicture}` : profile);
        setUsername(userProfile.username || '');
        setMotto(userProfile.motto || '');
        setPlaceholderUsername(userProfile.username || '아이디를 등록해 주세요');
        setPlaceholderMotto(userProfile.motto || '좌우명을 입력해 주세요');
      } catch (error) {
        setError(error.message);
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const updateProfile = async (profileData) => {
    try {
      console.log('Sending profile data:', JSON.stringify(profileData, null, 2));
      const response = await apiClient.put('/api/user-profile/update-profile', profileData);
      console.log('Response data:', response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
      } else {
        console.error('Error:', error);
      }
      throw error;
    }
  };

  const updateProfilePicture = async (file) => {
    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const response = await apiClient.put('/api/user-profile/update-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response data:', response.data);
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error response data:', error.response.data);
      } else {
        console.error('Error:', error);
      }
      throw error;
    }
  };

  const handleAddClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveClick = () => {
    setProfileImage(profile);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyClick = async () => {
    setLoading(true);
    try {
      const profileData = { username, motto };
      console.log('Sending profile data:', profileData);
      await updateProfile(profileData);

      if (profileImage === profile) {
        const formData = new FormData();
        formData.append('profilePicture', new Blob([null], { type: 'image/jpeg' }));
        await apiClient.put('/user-profile/update-picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else if (fileInputRef.current.files[0]) {
        await updateProfilePicture(fileInputRef.current.files[0]);
      }

      alert('프로필이 성공적으로 업데이트되었습니다!');
      navigate('/mypage'); // 성공적으로 업데이트 후 Mypage로 이동
    } catch (error) {
      setError('100KB 이내의 사진을 올려주세요!');
      if (error.response) {
        console.error('Error response data:', error.response.data);
      } else {
        console.error('Error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const cancelButton = () => {
    navigate('/mypage');
  };

  return (
    <>
      <Header />
      <div className='modify_wrap'>
        <div className='profile_box'>
          <h1 className='h1'>개인정보 수정하기</h1>
          <h3 className='h3'>프로필 사진과 아이디를 수정할 수 있어요.</h3>
          <hr className='hr' />
          <p className='p'>프로필 사진</p>

          <div className='profile_img'>
            <div id="myPhoto">
              <img src={profileImage} alt="" className="Profile" />
            </div>
            <form method="post">
              <input
                type="file"
                name="mypage_image"
                id="mypage_image"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <img
                id="add"
                src={add}
                alt="Add Profile"
                onClick={handleAddClick}
                style={{ cursor: 'pointer' }}
              />
              <img
                id="remove"
                src={remove}
                alt="Remove Profile"
                onClick={handleRemoveClick}
                style={{ cursor: 'pointer', marginLeft: '10px' }}
              />
            </form>
          </div>
          <hr className='hr' />
          <div className='id_field'>
            <p className='p'>아이디</p>
            <input
              type='text'
              placeholder={placeholderUsername}
              className='inputbox'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <hr className='hr' />
          <div className='say_field'>
            <p className='p'>좌우명</p>
            <input
              type='text'
              placeholder={placeholderMotto}
              className='inputbox'
              value={motto}
              onChange={(e) => setMotto(e.target.value)}
            />
          </div>
          <hr className='hr' />
          <div className='done'>
            <button className='apply' onClick={handleApplyClick} disabled={loading}>
              적용하기
            </button>
            <button className='cancel' onClick={cancelButton}>취소하기</button>
          </div>
          {error && <p className='error'>{error}</p>}
        </div>
        <img src={gradiant} className='gradiant' alt="Gradiant" />
      </div>
    </>
  );
};

export default Modify;
