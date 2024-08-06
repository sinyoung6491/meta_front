import React from 'react';
import { useNavigate } from 'react-router-dom';
import startlogo from '../../assets/img/icon/logo.svg'

// 처음 메인 화면 (try or 이미 계정을 소유함)

const Login = () => {
  const navigate = useNavigate();

  const tryButtonClick = () => {
    navigate('/signin');
  }

  const alreadyButtonClick = () => {
    navigate('/enter');
  }

  return (
    <div className='login_wrap'>
        <div>
            <img src={startlogo} alt="startlogo" className='startlogo'/>
            <p>'나'를 파악하고 메타인지 능력을 향상시켜보세요.</p>
            <h3>Let's Start!</h3>
            <button className='trybtn' onClick={tryButtonClick}>Try it for free</button> {/* try it for free 버튼 svg */}
            <button className='alreadybtn' onClick={alreadyButtonClick}>I already have an account</button> {/* i already have an account 버튼 svg */}
        </div>
    </div>

  )
}

export default Login