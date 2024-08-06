import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import googlelogo from '../../assets/img/login/googlelogo.svg';
import Footer from '../../components/enter/Footer';
import { login } from '../../services/apiService';
import '../../components/signin/CheckboxStyles.css';

// 로그인 정보 입력 창
const Enter = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState(null);
  const [loginSave, setloginSave] = useState(false);

  useEffect(() => {
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
      setForm((prevForm) => ({
        ...prevForm,
        username: savedUsername
      }));
      setloginSave(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const checked = e.target.checked;
    setloginSave(checked);
    if (checked) {
      localStorage.setItem('savedUsername', form.username);
    } else {
      localStorage.removeItem('savedUsername');
    }
  }

  const loginButtonClick = async () => {
    try {
      const response = await login(form);
      localStorage.setItem('accessToken', response.accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('userId', response.userId); // Storing userId
  
      // Logging stored values
      console.log('Stored User ID:', localStorage.getItem('userId'));
      console.log('Stored Access Token:', localStorage.getItem('accessToken'));
      console.log('Stored Refresh Token:', localStorage.getItem('refreshToken'));
  
      // Navigate to main page
      navigate('/main');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
        return;
      } else {
        setError('로그인에 실패하였습니다. 아이디와 비밀번호를 확인하여 주십시오.');
        return;
      }
    }
  };
  
  

  const signupButtonClick = () => {
    navigate('/signin');
  };

  return (
    <>
      <div className='enter_wrap'>
        <div>
          <h1 className='h1'>로그인</h1>

          <div className='enterfield'>
            
            <input
              type='text'
              className='id'
              name='username'
              placeholder='아이디'
              value={form.username}
              onChange={handleChange}
            />
            <input
              type='password'
              className='pw'
              name='password'
              placeholder='비밀번호'
              value={form.password}
              onChange={handleChange}
            />
            {error && <p style={{ color: 'red', fontWeight: '600',marginTop: '20px'}}>{error}</p>}
            <div className='checkbox-container'>
            <label className='checkbox-label'>
              <input
                type='checkbox'
                id='terms'
                checked={loginSave}
                onChange={handleCheckboxChange}
              />
              <div className='checkbox-custom'></div>
              <p className='infosave'>아이디 정보 저장</p>
            </label>
            </div>
          </div>

          <button className='loginbtn' onClick={loginButtonClick}>로그인</button> {/* 로그인 버튼 */}

          <div className='line'>
            <hr className='hr' />
            <hr className='hr' />
          </div>

          <div className='option'>
            <h3 className='signup' onClick={signupButtonClick}>회원가입</h3>
            <div className='find'>
              <h3 className='find_id'>계정 찾기</h3>
              <h3>|</h3>
              <h3 className='find_pw'>비밀번호 찾기</h3>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Enter;
