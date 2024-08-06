import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/scss/main/header.scss';
import Nav from './Nav';
import logo from '../../assets/img/header/meta_logo.png'; // 로고 이미지를 경로에 맞게 수정하세요

function Header() {
    const navigate = useNavigate();

    const mypageButtonClick = () => {
        navigate('/mypage');
    }

    const logoutButtonClick = () => {
        navigate('/');
    }

    const logoClick = () => {
        navigate('/main');
    }

    const [isNavVisible, setIsNavVisible] = useState(false);

    const toggleNavVisibility = () => {
        setIsNavVisible(prev => !prev);
    };

    const closeNav = () => {
        setIsNavVisible(false);
    };

    return (
        <>
        {/* Nav 컴포넌트를 상태에 따라 한 번만 렌더링 */}
        {isNavVisible && <Nav onClose={closeNav} />}
        <header className="header">
            <div 
                className="menu-icon" 
                onClick={toggleNavVisibility}
            >
                &#9776;
            </div> {/* 햄버거 메뉴 아이콘 */}
            <div className="logo">
                <img src={logo} alt="Logo" onClick={logoClick}/>
            </div>
            <div className='right'>
                <div className="mypage" onClick={mypageButtonClick}>Mypage</div> 
                <div className="Logout" onClick={logoutButtonClick}>Logout</div>
            </div>
        </header>
        </>
    );
}

export default Header;