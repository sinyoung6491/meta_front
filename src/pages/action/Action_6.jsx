import React from 'react'
import { useEffect, useState } from 'react';
import '../../assets/scss/action/action06.scss';
import { useParams,useNavigate } from 'react-router-dom';
import check from '../../assets/img/action/action_check.svg';
import Header from '../../components/action/Header';
import { getCircumstance,deleteCircumstance  } from '../../services/apiService';


const Action_6 = () => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        const day = String(date.getDate()).padStart(2, '0');
        return `${year} . ${month} . ${day}`;
    };

    const { id } = useParams();
    const navigate = useNavigate();
    const [circumstance, setCircumstance] = useState({
        id: '',
        situation: '',
        emotions: [],
        causes: [],
        conclusion: '',
        createdDate: '',
        userId: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCircumstance = async () => {
            try {
                const data = await getCircumstance(id);
                setCircumstance(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCircumstance();
    }, [id]);

    const handleDeleteClick = async () => {
        try {
            await deleteCircumstance(id);
            alert('삭제되었습니다.');
            navigate('/circumstancePage');
        } catch (error) {
            console.error('Failed to delete circumstance:', error);
            alert('삭제 실패');
        }
    };
    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data: {error.message}</div>;
    }

    return (
        <>
            <Header />
            <div className="action04">
                <div className="action_back">
                    <main>
                        <div className="section">Conclusion</div>
                        <div className="date">{formatDate(circumstance.createdDate)}</div>
                        <div className="action">{circumstance.situation}</div>
                        <p className="title">상황에서</p>
                        <div className="feeling_div">
                        {circumstance.emotions.map((emotion, index) => (
                                <div className="feel" key={index}>{emotion}</div>
                            ))}
                        </div>
                        <p className="title">을/를 느꼈으며</p>
                        <div className='reason'>
                        {circumstance.emotions.map((emotion, index) => (
                                <div key={index}>
                                    <div className="title_div">
                                        <div className="title_emotion_num">{index + 1}</div>
                                        <p className="title_emotion">{emotion}</p>
                                        <p className="title">의 원인은</p>
                                    </div>
                                    <p className="text">{circumstance.causes[index]}</p>
                                </div>
                            ))}
                        </div>
                        <p className="title">(라)고 생각한다.</p>
                        <p className="title end">따라서</p>
                        <div className="after">{circumstance.conclusion}</div>
                        <p className="title">와 같은 결론을 내린다.</p>


                        <div className='btn_div'>
                            <button
                                className="btn"
                                onClick={handleDeleteClick}
                            >
                                삭제하기
                            </button>
                        </div>

                    </main>
                </div>
            </div>
        </>
    )
}

export default Action_6