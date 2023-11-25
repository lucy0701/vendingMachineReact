import { useEffect, useState } from 'react';
import ItemBox from '../components/ItemBox';
import Modal from '../components/Modal';
import UserCoin from '../components/UserCoin';
import { formatPrice } from '../utils/number';
import { useItems } from '../hooks/useItems';
import { useMachineCoins } from '../hooks/useMachineCoins';
import { useUserCoins } from '../hooks/useUserCoins';
import { useTotalAmount } from '../hooks/useTotalAmount';
import { Coin } from '../types/coin';
import { TotalAmount } from '../types/totalAmount';
import { useInsertCoins } from '../hooks/useInsertCoins';

export default function MachinePage() {
  const { items } = useItems();
  const { machineCoins } = useMachineCoins();
  const { userCoins, saveUserCoin } = useUserCoins();
  const { totalAmount, saveTotalAmount } = useTotalAmount();
  const { insertCoins, saveInsertCoin } = useInsertCoins();

  const [isOpen, setIsOpen] = useState(false);
  const onClickModal = () => (isOpen ? setIsOpen(false) : setIsOpen(true));

  const [dragInpoMessage, setDragInpoMessage] = useState('');

  const copyUserCoins: Coin[] = JSON.parse(JSON.stringify(userCoins));
  const copyInsertCoin: Coin[] = JSON.parse(JSON.stringify(insertCoins));

  const [updateUserCoinCount, setUpdateUserCoinCount] = useState<Coin>({
    id: -1,
    coin: '',
    count: 0,
  });
  const [updateInsertCoinCount, setUpdateInsertCoinCount] = useState<Coin>({
    id: -1,
    coin: '',
    count: 0,
  });

  const [totalNum, setTotalNum] = useState<TotalAmount>({ total: 0 });
  useEffect(() => {
    setTotalNum({ total: totalAmount });
  }, [totalAmount]);

  const handleDragStart = (e: React.DragEvent) => {
    const target = e.target as HTMLElement;
    const value = target.getAttribute('value');

    if (value) {
      e.dataTransfer.setData('text/plain', value);
    }
    setDragInpoMessage('여기에요!');
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    console.log('PSJ: dragEnter', e.target);
    setDragInpoMessage('동전을 놔주세요');
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    console.log('PSJ: dragLeave', e.target);
    setDragInpoMessage('거기말고! 여기!');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.preventDefault();

    handleSaveTotalAmount(totalNum);
    handleSaveUserCoin(updateUserCoinCount);
    handleSaveInsertCoin(updateInsertCoinCount);

    setTimeout(() => {
      setDragInpoMessage('');
    }, 1000);
  };

  const insertUserCoin = (value: string) => {
    const updateTotalNum = Number(value) + totalNum.total;
    const findUserCoin = copyUserCoins.find(
      userCoin => value === userCoin.coin,
    );
    const findInsertCoin = copyInsertCoin.find(
      insertCoin => value === insertCoin.coin,
    );
    if (
      findUserCoin !== undefined &&
      findInsertCoin !== undefined &&
      findUserCoin.count > 0
    ) {
      const userCoinCount = findUserCoin.count - 1;
      const insertCoinCount = findInsertCoin.count + 1;

      setUpdateUserCoinCount({
        id: findUserCoin.id,
        coin: value,
        count: userCoinCount,
      });
      setUpdateInsertCoinCount({
        id: findInsertCoin.id,
        coin: value,
        count: insertCoinCount,
      });
      setTotalNum(prev => ({ ...prev, total: updateTotalNum }));
    }
  };

  const handleDropOnMap = (e: React.DragEvent) => {
    e.preventDefault();
    const value = e.dataTransfer.getData('text/plain');
    insertUserCoin(value);

    setDragInpoMessage('갑사합니다 :)');
    setTimeout(() => {
      setDragInpoMessage('');
    }, 1000);
  };

  const handleSaveTotalAmount = (total: TotalAmount | number) => {
    saveTotalAmount(total as TotalAmount);
  };
  const handleSaveUserCoin = (coin: Coin | number) => {
    saveUserCoin(coin as Coin);
  };
  const handleSaveInsertCoin = (coin: Coin | number) => {
    saveInsertCoin(coin as Coin);
  };

  return (
    <div className="machine-body">
      <div className="body-left">
        <div className="item-display">
          {items.map(item => (
            <ItemBox key={item.id} item={item} />
          ))}
        </div>
        <div className="machine-coin">
          {machineCoins.map(machineCoin => {
            return (
              <p className="machine-coin-screen" key={machineCoin.coin}>
                <span className="machine-coin-name">{machineCoin.coin} :</span>
                {machineCoin.count}
              </p>
            );
          })}
        </div>
      </div>
      
      <div className="body-rigth">
        <h2>CRYSTAL</h2>
        <div className="total-screen">
          <span className="total-num">
            {formatPrice(Number(totalNum.total))}
          </span>
        </div>
        <div className="ent-coin-box">
          <div
            className="ent-coin-map ent-coin"
            onDragEnter={handleDragEnter}
            onDrop={handleDropOnMap}
            onDragLeave={handleDragLeave}
            onDragOver={e => e.preventDefault()}
          >
            {dragInpoMessage}
          </div>
          <button className="ent-coin-btn ent-coin" onClick={onClickModal}>
            Click
          </button>
        </div>

        <button className="return-coin-btn">반환</button>
        <div className="get-item-box" />
      </div>

      <Modal
        name="coin-modal"
        isOpen={isOpen}
        onClickModal={onClickModal}
        btnClassName="coin-modal-close-btn"
        btnName="CLOSE"
      >
        {copyUserCoins.map(userCoin => {
          return (
            <UserCoin
              key={userCoin.coin}
              userCoin={userCoin}
              handleDragStart={handleDragStart}
              handleDragEnd={handleDragEnd}
            />
          );
        })}
      </Modal>
    </div>
  );
}
