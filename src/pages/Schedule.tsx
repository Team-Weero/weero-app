import React from 'react';

const Schedule: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">상담 일정</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">4.1 월요일</h2>
          <div className="h-1 bg-green-500 mb-4"></div>
          
          <div className="border border-green-500 rounded-lg p-4 mb-4">
            <div className="flex justify-between">
              <div>
                <div className="text-lg font-bold">4교시 (11:10)</div>
                <div className="text-gray-600">일반 고민상담</div>
              </div>
              <div className="text-right">
                <div className="text-green-500">2학년</div>
                <div className="font-bold">김*희</div>
              </div>
            </div>
          </div>
          
          <div className="border border-green-500 rounded-lg p-4">
            <div className="flex justify-between">
              <div>
                <div className="text-lg font-bold">5교시 (1:30)</div>
                <div className="text-gray-600">일반 고민상담</div>
              </div>
              <div className="text-right">
                <div className="text-green-500">2학년</div>
                <div className="font-bold">김*희</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">4.3 수요일</h2>
          <div className="h-1 bg-green-500 mb-4"></div>
          
          <div className="border border-green-500 rounded-lg p-4">
            <div className="flex justify-between">
              <div>
                <div className="text-lg font-bold">4교시 (11:10)</div>
                <div className="text-gray-600">일반 고민상담</div>
              </div>
              <div className="text-right">
                <div className="text-green-500">2학년</div>
                <div className="font-bold">김*희</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-2">4.9 목요일</h2>
          <div className="h-1 bg-green-500 mb-4"></div>
          
          <div className="border border-green-500 rounded-lg p-4">
            <div className="flex justify-between">
              <div>
                <div className="text-lg font-bold">4교시 (11:10)</div>
                <div className="text-gray-600">일반 고민상담</div>
              </div>
              <div className="text-right">
                <div className="text-green-500">2학년</div>
                <div className="font-bold">김*희</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;