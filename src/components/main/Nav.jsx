import React from 'react';
import { useNavigate } from 'react-router-dom';
import close from '../../assets/img/main/close.svg';

const Nav = ({ onClose }) => {

  const navigate = useNavigate();

  const homeButtonClick = () => {
    navigate('/main');
  }

  const circumstanceButtonClick = () => {
    navigate('/circumstancePage');
  }

  const goalButtonClick = () => {
    navigate('/goalMain');
  }

  const mypagemenuButtonClick = () => {
    navigate('/mypage');
  }


    console.log('Nav received onClose:', onClose); // onClose prop이 전달되었는지 확인

    return (
      <div className='nav_wrap' onClick={(e) => e.stopPropagation()}>
        <img src={close} className='close' onClick={() => { console.log('Close button clicked'); onClose(); }} alt="Close" />
        <h1 className='home' onClick={homeButtonClick}>HOME</h1>
        <h1 className='circumstance' onClick={circumstanceButtonClick}>CIRCUMSTANCE</h1>
        <h1 className='goal' onClick={goalButtonClick}>GOAL</h1>
        <h1 className='mypagemenu'onClick={mypagemenuButtonClick}>MYPAGE</h1>
      </div>
    );
};

export default Nav;