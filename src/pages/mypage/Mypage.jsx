import React from 'react'
import Header from '../../components/main/Header'
import Mypage01 from '../../components/mypage/Mypage01'
import Mypage02 from '../../components/mypage/Mypage02'
import gradiant from '../../assets/img/mypage/gradiant.svg'

const Mypage = () => {
  return (
    <>
    <Header/>
    <div className='mypage_wrap'>
      {/*프로필 창 */}
        <Mypage01/>
      {/* 캘린더 창 */}
        <Mypage02/>
        <img src={gradiant} className='gradiant'/>
    </div>
    </>
  )
}

export default Mypage