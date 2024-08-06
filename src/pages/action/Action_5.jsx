import React, { useEffect,useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../assets/scss/action/action05.scss';
import check from '../../assets/img/action/action_check.svg';
import Header from '../../components/action/Header';
import { saveActionData } from '../../services/apiService'; // API 요청 함수 임포트

const getCurrentFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    return `${year} . ${month} . ${day}`;
};

const Action_5 = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState('');
    useEffect(() => {
        setCurrentDate(getCurrentFormattedDate());
    }, []);
    const { items, action1Value, action3Values, action4Values } = location.state || {
        items: [],
        action1Value: '',
        action3Values: [],
        action4Values: ''
    };
    const userId = localStorage.getItem('userId');
        const data = {
            situation: action1Value,
            emotions: items.map(item => item.value),
            causes: action3Values,
            conclusion: action4Values,
            userId: parseInt(userId),
        };

    useEffect(() => {
        console.log("Received inputValue from Action:",data);
    }, [data]);

    const handleNextClick = async () => {
        const userId = localStorage.getItem('userId');
        const data = {
            situation: action1Value,
            emotions: items.map(item => item.value),
            causes: action3Values,
            conclusion: action4Values,
            userId: parseInt(userId),
        };

        try {
            await saveActionData(data);
            alert('상황 작성이 완료되었습니다!');
            navigate('/circumstancePage');
        } catch (error) {
            console.error(error); // 에러 로그 출력
            alert('상황 작성을 실패하였습니다.');
        }
    };

    return (
        <>
        <Header/>
        <div className="action04">
            <div className="action_back">
                <main>
                    <div className="section">Conclusion</div>
                    <div className="date">{currentDate}</div>
                    <div className="action">{action1Value}</div>
                    <p className="title">상황에서</p>
                    <div className="feeling_div">
                        {items.map((item, index) => (
                            <div className="feel" key={index}>{item.value}</div>
                        ))}
                    </div>
                    <p className="title">을/를 느꼈으며</p>

                    <div className='reason'>
                        {items.map((item, index) => (
                            <div key={index}>
                                <div className="title_div">
                                    <div className="title_emotion_num">{index + 1}</div>
                                    <p className="title_emotion">{item.value}</p>
                                    <p className="title">의 원인은</p>
                                </div>
                                <p className="text">{action3Values[index]}</p>
                            </div>
                        ))}
                    </div>
                    <p className="title">(라)고 생각한다.</p>
                    <p className="title end">따라서</p>

                    <div className="after">{action4Values}</div>
                    <p className="title">와 같은 결론을 내린다.</p>

                    <button className='save_btn' onClick={handleNextClick}>
                        <p>SAVE</p>
                        <img src={check} alt="" />
                    </button>
                </main>
            </div>
        </div>
        </>
    );
}

export default Action_5;
