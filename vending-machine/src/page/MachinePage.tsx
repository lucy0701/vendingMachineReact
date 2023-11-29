import { useState } from 'react';
import ItemBox from '../components/ItemBox';
import Modal from '../components/Modal';
import UserCoin from '../components/UserCoin';
import EntCoinBox from '../components/EntCoinBox';
import GetItemBox from '../components/GetItemBox';
import ReturnCoinButton from '../components/ReturnCoinButton';
import { formatPrice } from '../utils/number';
import { useItems } from '../hooks/useItems';
import { useMachineCoins } from '../hooks/useMachineCoins';
import { useUserCoins } from '../hooks/useUserCoins';
import { useTotalAmount } from '../hooks/useTotalAmount';
import { useMyItems } from '../hooks/useMyItems';
import { MyItem } from '../types/myItem';

export default function MachinePage() {
  const { items } = useItems();
  const { machineCoins } = useMachineCoins();
  const { userCoins } = useUserCoins();
  const { totalAmount } = useTotalAmount();
  const { addMyItem } = useMyItems();

  const [isOpen, setIsOpen] = useState(false);
  const [isGetItem, setIsGetItem] = useState(false);

  const [dragInpoMessage, setDragInpoMessage] = useState('');
  const [isDropField, setIsDropField] = useState(false);
  const [createMyItem, setCreateMyItem] = useState<MyItem>({
    id: 0,
    itemName: '',
    url: '',
  });

  const handleDragInpoMessage = (message: string) => {
    setDragInpoMessage(message);
  };

  const handleMyItem = (name: string, imgUrl: string) => {
    setCreateMyItem({ id: 0, itemName: name, url: imgUrl });
    addMyItem({ id: 0, itemName: name, url: imgUrl });
    setIsGetItem(true);
  };

  const onClickModal = () => (isOpen ? setIsOpen(false) : setIsOpen(true));
  
  const onClickMyItem = () => {
    isGetItem ? setIsGetItem(false) : setIsGetItem(true);
  };

  return (
    <div className="machine-body">
      <div className="body-left">
        <div className="item-display">
          {items.map(item => (
            <ItemBox key={item.id} item={item} handleMyItem={handleMyItem} />
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
        <EntCoinBox
          dragInpoMessage={dragInpoMessage}
          onClickModal={onClickModal}
          handleDragInpoMessage={handleDragInpoMessage}
          setIsDropField={setIsDropField}
        />
        <ReturnCoinButton />
        <GetItemBox
          createMyItem={createMyItem}
          isGetItem={isGetItem}
          onClickMyItem={onClickMyItem}
        />
      </div>
      <Modal
        name="coin-modal"
        isOpen={isOpen}
        onClickModal={onClickModal}
        btnClassName="coin-modal-close-btn"
        btnName="CLOSE"
      >
        {userCoins.map(userCoin => {
          return (
            <UserCoin
              key={userCoin.coin}
              userCoin={userCoin}
              handleDragInpoMessage={handleDragInpoMessage}
              setIsDropField={setIsDropField}
              isDropField={isDropField}
            />
          );
        })}
      </Modal>
    </div>
  );
}
