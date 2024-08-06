import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import googlelogo from '../../assets/img/login/googlelogo.svg';
import { signup } from '../../services/apiService';
import './CheckboxStyles.css';

const Signin02 = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
    password2: ''
  });

  const [error, setError] = useState(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    setAgreeToTerms(e.target.checked);
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
    return passwordRegex.test(password);
  };

  const signButtonClick = async () => {
    if (form.password !== form.password2) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    } else if (!isPasswordValid(form.password)) {
      setError('비밀번호를 영문, 숫자 조합의 8자 이상 20자 이하로 설정해야 합니다.');
      return; 
    } else if (!agreeToTerms) {
      setError('이용약관 및 개인정보 처리방침에 동의해 주십시오.');
      return;
    }

    try {
      const userData = {
        username: form.username,
        password: form.password,
        role: 'ROLE_USER'
      };
      const response = await signup(userData);
      alert('회원가입이 완료되었습니다!');
      navigate('/enter');
    } catch (error) {
      setError('이미 있는 아이디입니다.');
      return;
    }
  };

  const googleButtonClick = () => {
    console.log('버튼 클릭됨!');
  };

  const loginButtonClick = () => {
    navigate('/enter');
  };


  return (
    <div className='signin02_wrap'>
      <div className='enterfield'>
        <h1 className='signup'>회원가입</h1>
        {error && <p style={{ color: 'red', fontWeight: '600', marginTop: '10px' }}>{error}</p>}
        <input
          type='text'
          className='username'
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
        <p className='or'>영문, 숫자 조합의 8자 이상 20자 이하로 입력해주세요.</p>
        <input
          type='password'
          className='pw'
          name='password2'
          placeholder='비밀번호 확인'
          value={form.password2}
          onChange={handleChange}
        />
        <div className='checkbox-container'>
          <label className='checkbox-label'>
            <input
              type='checkbox'
              id='terms'
              checked={agreeToTerms}
              onChange={handleCheckboxChange}
            />
            <div className='checkbox-custom'></div>
            <p className='infosave'>이용약관 및 개인정보 처리방침에 동의합니다.</p>
          </label>
        </div>
        <button className='signbtn' onClick={signButtonClick}>회원가입</button>
      </div>
      <div className='line'>
        <hr className='hr' />
        <hr className='hr' />
      </div>
      <div className='change_area'>
        <p className='optional'>이미 Metalog 회원이신가요?</p>

        <p className='turn_login' onClick={loginButtonClick}>로그인</p>

      </div>
    </div>
  );
};

export default Signin02;
