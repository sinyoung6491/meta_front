import React from 'react'
import Main01 from '../../components/main/Main01'
import Main02 from '../../components/main/Main02'
import Header from '../../components/main/Header'

const Main = () => {
  return (
    <>
    <Header/>
    <div className='main_wrap'>
        {/* 이미지 슬라이드, nav 창 */}
        <Main01/>
        {/* 메인 페이지 창*/}
        <Main02/>
    </div>
    </>
    
  )
}

export default Main