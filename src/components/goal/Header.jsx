import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../components/main/Nav';
import '../../assets/scss/header/header.scss';
import popup_icon from '../../assets/img/action/popup_icon.svg'
import popup_X from '../../assets/img/action/action_popup_X.svg'
import '../../assets/scss/action/popup.scss'; // 팝업 스타일링 파일 경로에 맞게 수정하세요
import logo from '../../assets/img/header/meta_logo.png'; // 로고 이미지를 경로에 맞게 수정하세요

function Header() {
    const navigate = useNavigate();
    const [isNavVisible, setIsNavVisible] = useState(false);
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const logoClick = () => {
        navigate('/main');
    }

    const closeIconClick = () => {
        setIsPopupVisible(true);
    }

    const handlePopupClose = () => {
        setIsPopupVisible(false);
    };

    const handlePopupConfirm = () => {
        setIsPopupVisible(false);
        navigate('/goalmain');
    };

    const toggleNavVisibility = () => {
        setIsNavVisible(prev => !prev);
    };

    const closeNav = () => {
        setIsNavVisible(false);
    };

    console.log('Header is rendering');

    return (
        <>
        {isNavVisible && <Nav onClose={closeNav} />}
        <header className="header">
            <div 
                className="menu-icon" 
                onClick={toggleNavVisibility}
            >
                &#9776;
            </div>
            <div className="logo1">
                <img src={logo} alt="Logo" onClick={logoClick}/>
            </div>
            <div 
                className="close-icon" 
                onClick={closeIconClick}
            > 
                &times;
            </div> {/* 닫기 버튼 */}
        </header>
        {isPopupVisible && (
            <div className="popup-overlay">
                <div className="popup-content">
                    <div className='X_div'>
                    <img className='popup_X' src={popup_X} alt="" onClick={handlePopupConfirm}/>
                    </div>
                    <img className='popup_icon' src={popup_icon} alt="" />
                    <p>작성 중단 시 내용이 저장되지 않고 삭제됩니다.<br />그래도 작성을 중단하시겠어요?</p>
                    <div className="popup-buttons">
                        <button onClick={handlePopupConfirm}>예, 그만 쓸래요.</button>
                        <button onClick={handlePopupClose}>아니요, 계속 쓸래요!</button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
}

export default Header;
