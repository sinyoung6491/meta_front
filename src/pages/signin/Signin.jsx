import React from 'react'
import Signin01 from '../../components/signin/Signin01'
import Signin02 from '../../components/signin/Signin02'

const Signin = () => {
  return (
    <div className='sign_wrap'>
      {/* 이미지 창 */}
        <Signin01/>
      {/* 정보 입력 창 */}
        <Signin02/>
    </div>
  )
}

export default Signin