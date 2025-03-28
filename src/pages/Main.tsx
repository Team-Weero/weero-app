import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// 상담 일정 타입 정의
interface Consultation {
  time: string;
  type: string;
  grade: string;
  name: string;
}

// 목업 데이터 타입 정의
interface ConsultationsData {
  [date: string]: Consultation[];
}

// 목업 데이터
const mockConsultations: ConsultationsData = {
  '2025-03-28': [
    { time: '점심시간 (1:10)', type: '일반 고민상담', grade: '1학년', name: '김*희' },
    { time: '5교시 (1:30)', type: '일반 고민상담', grade: '1학년', name: '김*희' }
  ],
  '2025-03-29': [],  // 주말
  '2025-03-30': [],  // 주말
  '2025-03-31': [
    { time: '3교시 (10:20)', type: '진로상담', grade: '2학년', name: '박*준' }
  ],
  '2025-04-01': [
    { time: '4교시 (11:10)', type: '일반 고민상담', grade: '2학년', name: '김*희' },
    { time: '5교시 (1:30)', type: '일반 고민상담', grade: '2학년', name: '김*희' }
  ],
  '2025-04-02': [],
  '2025-04-03': [
    { time: '4교시 (11:10)', type: '일반 고민상담', grade: '2학년', name: '김*희' }
  ],
  '2025-04-04': [
    { time: '6교시 (2:30)', type: '진로상담', grade: '3학년', name: '이*서' }
  ]
};

const Home: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [weekdays, setWeekdays] = useState<{ date: Date; formattedDate: string }[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [currentWeekIndex, setCurrentWeekIndex] = useState<number>(0);

  const getWeekdaysFromToday = (weekOffset: number = 0) => {
    const days: { date: Date; formattedDate: string }[] = [];
    const today = new Date();
    
    today.setDate(today.getDate() + (weekOffset * 7));
    
    const dayOfWeek = today.getDay();
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // 일요일이면 이전 주 월요일로, 아니면 이번 주 월요일로
    
    let currentDate = new Date(today);
    currentDate.setDate(today.getDate() + diff);
    
    for (let i = 0; i < 5; i++) {
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      
      days.push({
        date: new Date(currentDate),
        formattedDate
      });
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const fetchConsultations = (date: string): Consultation[] => {
    return mockConsultations[date] || [];
  };

  useEffect(() => {
    const days = getWeekdaysFromToday(currentWeekIndex);
    setWeekdays(days);
    
    if (days.length > 0) {
      if (currentWeekIndex === 0) {
        const today = new Date();
        const todayFormatted = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        
        const todayDay = today.getDay();
        if (todayDay >= 1 && todayDay <= 5) {
          const todayInWeek = days.find(day => day.formattedDate === todayFormatted);
          if (todayInWeek) {
            setSelectedDate(todayFormatted);
            setConsultations(fetchConsultations(todayFormatted));
            return;
          }
        }
      }
      
      setSelectedDate(days[0].formattedDate);
      setConsultations(fetchConsultations(days[0].formattedDate));
    }
  }, [currentWeekIndex]);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setConsultations(fetchConsultations(date));
  };

  // 이전 주로 이동
  const handlePrevWeek = () => {
    setCurrentWeekIndex(prev => prev - 1);
  };

  // 다음 주로 이동
  const handleNextWeek = () => {
    setCurrentWeekIndex(prev => prev + 1);
  };

  // 요일 한글 변환
  const getDayName = (day: number) => {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[day];
  };

  // 선택된 날짜 포맷팅 (2025-03-28 -> 3월 28일)
  const formatSelectedDate = (dateString: string) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    return `${month}월 ${day}일`;
  };

  return (
    <div className="bg-white min-h-screen pb-16">
      <div className="p-4">
        <h1 className="text-3xl font-bold mb-2">안녕하세요</h1>
        <h2 className="text-3xl font-bold mb-4">상담쌤님</h2>
        
        <div className="h-1 bg-green-500 my-8"></div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">상담 요청</h2>
          
          <div className="border border-green-500 rounded-lg p-4 mb-4">
            <div className="text-lg">새로운 상담 요청 없음</div>
          </div>
        </div>
        
        <div className="h-1 bg-green-500 my-8"></div>
        
        {/* 날짜 선택 미니 달력 - 사진과 같은 형태로 변경 */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <button onClick={handlePrevWeek} className="p-2">
              <ChevronLeft className="text-gray-400" size={32} />
            </button>
            
            <div className="flex justify-between items-center flex-1 px-4">
              {weekdays.map((day) => (
                <div 
                  key={day.formattedDate}
                  className="flex flex-col items-center justify-center w-1/5 cursor-pointer"
                  onClick={() => handleDateClick(day.formattedDate)}
                >
                  <div className="text-gray-500 text-lg">
                    {getDayName(day.date.getDay())}
                  </div>
                  <div className={`text-4xl ${selectedDate === day.formattedDate ? 'text-green-500' : 'text-gray-500'}`}>
                    {day.date.getDate()}
                  </div>
                </div>
              ))}
            </div>
            
            <button onClick={handleNextWeek} className="p-2">
              <ChevronRight className="text-gray-400" size={32} />
            </button>
          </div>
        </div>
        
        {/* 선택된 날짜의 상담 일정 */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            {formatSelectedDate(selectedDate)} 상담 일정
          </h2>
          
          {consultations.length > 0 ? (
            consultations.map((consultation, index) => (
              <div key={index} className="border border-green-500 rounded-lg p-4 mb-4">
                <div className="flex justify-between">
                  <div>
                    <div className="text-lg font-bold">{consultation.time}</div>
                    <div className="text-gray-600">{consultation.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-500">{consultation.grade}</div>
                    <div className="font-bold">{consultation.name}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="border border-green-500 rounded-lg p-4 mb-4">
              <div className="text-lg">예정된 상담 없음</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;