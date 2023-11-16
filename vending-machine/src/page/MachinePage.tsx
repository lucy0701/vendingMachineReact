import { useState } from 'react';
import ItemBox from '../components/ItemBox';
import Modal from '../components/Modal';
import UserCoin from '../components/UserCoin';
import { formatPrice } from '../utils/number';
import { useItems } from '../hooks/useItems';
import { useMachineCoins } from '../hooks/useMachineCoins';
import { useUserCoins } from '../hooks/useUserCoins';
import { useTotalAmount } from '../hooks/useTotalAmount';

// TODO: 타입 정리

export default function MachinePage() {
  const { items } = useItems();
  const { machineCoins } = useMachineCoins();
  const { userCoins } = useUserCoins();
  const { totalAmount } = useTotalAmount();

  const [isOpen, setIsOpen] = useState(false);
  const onClickModal = () => (isOpen ? setIsOpen(false) : setIsOpen(true));

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
          <span className="total-num">{formatPrice(totalAmount)}</span>
        </div>
        <button className="ent-coin-btn" onClick={onClickModal}>
          Click
        </button>
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
        {userCoins.map(userCoin => {
          return <UserCoin key={userCoin.coin} userCoin={userCoin} />;
        })}
      </Modal>
    </div>
  );
}
