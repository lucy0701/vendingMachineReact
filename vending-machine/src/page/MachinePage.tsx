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
import { useInsertCoins } from '../hooks/useInsertCoins';
import { Coin } from '../types/coin';
import { Item } from '../types/item';
import { MyItem } from '../types/myItem';
import { useMyItems } from '../hooks/useMyItems';

export default function MachinePage() {
  const { items, saveItem } = useItems();
  const { machineCoins } = useMachineCoins();
  const { userCoins, saveUserCoin } = useUserCoins();
  const { totalAmount, saveTotalAmount } = useTotalAmount();
  const { insertCoins, saveInsertCoin } = useInsertCoins();
  const { addMyItem } = useMyItems();

  const [isOpen, setIsOpen] = useState(false);
  const [isGetItem, setIsGetItem] = useState(false);
  const [dragInpoMessage, setDragInpoMessage] = useState('');
  const [updateMyItem, setUpdateMyItem] = useState<MyItem>({
    id: 0,
    itemName: '',
    url: '',
  });

  const handleSaveTotalAmount = (totalNum: number) => {
    saveTotalAmount(totalNum);
  };

  const handleSaveUserCoin = (userCoin: Coin) => {
    saveUserCoin(userCoin);
  };
  const handleSaveInsertCoin = (insertCoins: Coin) => {
    saveInsertCoin(insertCoins);
  };
  const handleSaveItem = (item: Item) => {
    saveItem(item);
  };

  const handleAddMyItem = (myItem:MyItem) => {
    addMyItem(myItem);
  };
  const handleDragInpoMessage = (message: string) => {
    setDragInpoMessage(message);
  };

  const handleMyItem = ( name: string, imgUrl: string) => {
    setUpdateMyItem({ id: 0, itemName: name, url: imgUrl });
    handleAddMyItem({ id: 0, itemName: name, url: imgUrl })
    setIsGetItem(true);
  };

  const onClickModal = () => (isOpen ? setIsOpen(false) : setIsOpen(true));

  const showGetItem = () =>
    isGetItem ? setIsGetItem(false) : setIsGetItem(true);

  const onClickMyItme = () => {
    if (isGetItem) {
      showGetItem();
    }
  };

  return (
    <div className="machine-body">
      <div className="body-left">
        <div className="item-display">
          {items.map(item => (
            <ItemBox
              key={item.id}
              item={item}
              totalAmount={totalAmount}
              handleSaveTotalAmount={handleSaveTotalAmount}
              handleSaveItem={handleSaveItem}
              handleMyItem={handleMyItem}
            />
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
        />
        <ReturnCoinButton />
        <GetItemBox
          updateMyItem={updateMyItem}
          isGetItem={isGetItem}
          onClickMyItme={onClickMyItme}
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
              insertCoins={insertCoins}
              totalAmount={totalAmount}
              handleSaveUserCoin={handleSaveUserCoin}
              handleSaveInsertCoin={handleSaveInsertCoin}
              handleSaveTotalAmount={handleSaveTotalAmount}
              handleDragInpoMessage={handleDragInpoMessage}
            />
          );
        })}
      </Modal>
    </div>
  );
}
