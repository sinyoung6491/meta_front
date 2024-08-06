import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import book01 from '../../assets/img/circumstance_page/book01.svg';
import book02 from '../../assets/img/circumstance_page/book02.svg';
import book03 from '../../assets/img/circumstance_page/book03.svg';
import pen from '../../assets/img/circumstance_page/pen.svg';
import Header from '../../components/main/Header';

import axios from 'axios';
import { gettotalCircumstances } from '../../services/apiService';

// axios 인스턴스 설정
const apiClient = axios.create({
  baseURL: 'http://15.165.73.36:1234',
  headers: {
    'Content-Type': 'application/json',
  },
});



const getCurrentFormattedDate = () => {
  const date = new Date();
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date).replace(/\./g, ' . ');
};

const chunkArray = (array, chunkSize) => {
  const results = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    results.push(array.slice(i, i + chunkSize));
  }
  return results;
};


const CircumstancePage = () => {
  const [data, setData] = useState([]);
  const [swiperSlides, setSwiperSlides] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [currentDate, setCurrentDate] = useState('');
  const [entries, setEntries] = useState([]);
  const [isTodayEntryExists, setIsTodayEntryExists] = useState(false);

  useEffect(() => {
    // 데이터 요청
    apiClient.get('/circumstance')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data:', error);
      });
  }, []);

  useEffect(() => {
    // SwiperSlide 생성
    if (data.length > 4) {
      const chunks = [];
      for (let i = 0; i < data.length; i += 4) {
        chunks.push(data.slice(i, i + 4));
      }
      setSwiperSlides(chunks);
    } else {
      setSwiperSlides([data]);
    }
  }, [data]);

  // 오늘 날짜 가져오기
  const today = new Date();
  const formattedToday = `${today.getFullYear()}. ${String(today.getMonth() + 1).padStart(2, '0')}. ${String(today.getDate()).padStart(2, '0')}`;

  const handleNewButtonClick = () => {
    navigate('/action1'); // NEW 버튼 클릭 시 /action 경로로 이동
  };
  const handleBookClick = (id) => {
    navigate(`/action6/${id}`);
  };
  

  useEffect(() => {
    setCurrentDate(getCurrentFormattedDate());
    // API를 통해 글 목록을 가져오는 로직을 여기에 추가할 수 있습니다.
    const fetchData = async () => {
      try {
        const data = await gettotalCircumstances();
        setEntries(data.circumstances);

        // 오늘 날짜와 같은 날이 있는지 확인
        const todayFormattedDate = getCurrentFormattedDate();
        console.log('Today\'s formatted date:', todayFormattedDate); // 오늘 날짜 출력
        const todayEntry = data.circumstances.some(entry => {
          const entryDate = new Date(entry.createdDate).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }).replace(/\./g, ' . ');
          console.log('Entry date:', entryDate); // 각 항목의 날짜 출력
          return entryDate === todayFormattedDate;
        });

        setIsTodayEntryExists(todayEntry);

      } catch (error) {
        console.error('Failed to fetch circumstances:', error);
      }
    };

    fetchData();
  }, []);

  const slides = chunkArray(entries, 4);

  return (
    <>
      <Header />
      <div className='circumstance_cognition_wrap'>
        <h1 className='main'>Circumstance Cognition</h1>
        <div className='hr' />
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          modules={[Navigation, Pagination]}
          className='swiper-container'
        >

          {slides.map((slide, index) => (
            <SwiperSlide key={index} className='swiper-slide'>
              <div className='bookshelf'>
                {slide.map((entry, idx) => (
                  <div className='book-container' key={entry.id} onClick={() => handleBookClick(entry.id)}
                  style={{ cursor: 'pointer' }} >
                    <img
                      src={idx === 0 ? book01 : idx === 1 ? book02 : idx === 2 ? book02 : book03}
                      alt='book'
                      className={idx === 0 ? 'book01' : idx === 1 ? 'book02' : idx === 2 ? 'book02' : 'book03'}
                    />
                    <div className={idx === 0 ? 'book-text01' : idx === 1 || idx === 2 ? 'book-text' : 'book-text02'}>
                      {new Date(entry.createdDate).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      }).replace(/\./g, ' .')}
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <h2 className='date'>{currentDate}</h2>
        {isTodayEntryExists ? (
          <p className='p'>오늘의 상황 작성을 완료하였어요!<br />다른 상황이 있다면 또 작성할 수 있어요.</p>
        ) : (
          <p className='p'>오늘의 상황은 아직 비어있어요.<br />지금 바로 작성해 볼까요?</p>
        )}
        <button className='button' onClick={handleNewButtonClick}>NEW<img src={pen} className='pen' /></button>
      </div>
    </>
  );
}

export default CircumstancePage;