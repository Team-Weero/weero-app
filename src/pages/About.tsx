import { FC } from 'react'

const About: FC = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">About 페이지</h1>
      
      <div className="space-y-4 text-gray-700">
        <p>
          이 애플리케이션은 다음 기술을 사용하여 만들어졌습니다:
        </p>
        
        <ul className="list-disc pl-5 space-y-2">
          <li className="flex items-center">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">React</span>
            사용자 인터페이스를 구축하기 위한 JavaScript 라이브러리
          </li>
          <li className="flex items-center">
            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">TypeScript</span>
            JavaScript에 타입 안전성을 추가한 프로그래밍 언어
          </li>
          <li className="flex items-center">
            <span className="bg-cyan-100 text-cyan-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Tailwind CSS</span>
            유틸리티 우선 CSS 프레임워크
          </li>
          <li className="flex items-center">
            <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">Vite</span>
            빠르고 간결한 웹 개발 도구
          </li>
          <li className="flex items-center">
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">React Router</span>
            React 애플리케이션의 네비게이션 라이브러리
          </li>
        </ul>
        
        <p>
          이 프로젝트는 현대적인 웹 개발 도구와 기술을 사용하여 빠르고 반응성이 뛰어난 사용자 경험을 제공합니다.
        </p>
      </div>
    </div>
  )
}

export default About