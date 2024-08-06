import React from 'react'

// 로그인 창 푸터 (전체 푸터 X)

const Footer = () => {
  return (
    <div className='footer_wrap'>
      <hr className='line'/>
      <div className='contents'>
        <p className='p'>한국어</p>
        <p className='p'>|</p>
        <p className='p'>이용약관</p>
        <p className='p'>|</p>
        <p className='p'>개인정보 처리방침</p>
        <p className='p'>|</p>
        <p className='p'>고객센터</p>
      </div>
      
    </div>
  )
}

export default Footer