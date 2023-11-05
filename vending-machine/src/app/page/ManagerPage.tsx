import { Link } from 'react-router-dom';

export default function ManagerPage() {
  return (
    <form name="manage-page" id="manager-page" method="POST">
      <h2 className="manager-page-title">관리자 페이지</h2>

      <div className="manager-page-setting">
        <label htmlFor="manager-input">
          아이템
          <select className="manager-input" id="manager-input">
            <option disabled>
              아이템 선택
            </option>
            <option key="" value="">
              수정
            </option>
          </select>
        </label>

        <label htmlFor="stock-change">
          재고
          <input
            type="number"
            id="stock-change"
            className="manager-input"
            min="0"
            max="20"
            placeholder="재고"
          />
          <input
            type="submit"
            id="save-stock"
            className="save-btn"
            value="저장"
          />
        </label>

        <label htmlFor="price-change">
          가격
          <input
            type="number"
            id="price-change"
            className="manager-input"
            min="1"
            max="2000"
            placeholder="가격"
          />
          <input
            type="submit"
            id="save-price"
            className="save-btn"
            value="저장"
          />
        </label>
      </div>

      <table className="manager-item-list">
        <tbody>
          <tr>
            <th>List</th>
            <th>Stock</th>
            <th>Price</th>
          </tr>
          <tr key="" className="item-list">
            <td className="item-list-name">이름</td>
            <td>재고</td>
            <td>가격</td>
          </tr>
        </tbody>
      </table>

      <div className="manager-btn-box">
        <Link to="/" className="manager-btn home-btn">
          홈으로
        </Link>
      </div>
    </form>
  );
}
