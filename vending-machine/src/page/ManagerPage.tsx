import ItemTable from '../components/ItemTable';

export default function ManagerPage() {
  // TODO: 커스텀 훅 사용 익혀보기
  // TODO: 전역 상태관리 나중에 적용
  // TODO: 가격 제한폭 + 안내문구 추가

  // 컴포넌트 분리 (정리)
  // 자판기 : 동전 드래그
  // 전역 상태관리 나중에 적용

  // TODO: 얕은복사 깊은복사 이해하기
  // TODO: 에러 처리
  // onError,

  return (
    <form name="manage-page" id="manager-page" method="POST">
      <h2 className="manager-page-title">관리자 페이지</h2>
      <ItemTable/>
    </form>
  );
}
