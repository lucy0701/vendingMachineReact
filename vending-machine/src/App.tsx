import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './Router';

// /src
//   /components -> 컴포넌트들
//   /routes 또는 /pages -> 라우터들(페이지)
//   /utils -> 공용으로 쓰는 유틸성 함수들
//   /types -> 공용으로 쓰는 타입들 (타입스크립트에서만)
//   /constants -> 공용으로 쓰는 상수들
//   /hooks -> 커스텀 훅들
//   /services -> API 호출 서비스

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
