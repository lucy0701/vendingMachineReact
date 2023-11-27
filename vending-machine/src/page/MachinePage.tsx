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
import { useInsertCoins } from '../hooks/useInsertCoins';
import { useTotalAmount } from '../hooks/useTotalAmount';
import { useMyItems } from '../hooks/useMyItems';
import { Coin } from '../types/coin';
import { Item } from '../types/item';
import { MyItem } from '../types/myItem';
import { useIsPurchased } from '../hooks/useIsPurchased';
// import { useMultipleCoins } from '../hooks/useMultipleCoins';

export default function MachinePage() {
  const { items, saveItem } = useItems();
  const { machineCoins, saveMachineCoin } = useMachineCoins();
  const { userCoins, saveUserCoin } = useUserCoins();
  const { totalAmount, saveTotalAmount } = useTotalAmount();
  const { insertCoins, saveInsertCoin } = useInsertCoins();
  const { addMyItem } = useMyItems();
  const { isPurchased, saveIsPurchased } = useIsPurchased();
  // const { multipleUpdatesCoins } = useMultipleCoins();

  const [isOpen, setIsOpen] = useState(false);
  const [isGetItem, setIsGetItem] = useState(false);
  const [dragInpoMessage, setDragInpoMessage] = useState('');
  const [isDropField, setIsDropField] = useState(false);
  const [createMyItem, setCreateMyItem] = useState<MyItem>({
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
  const handleSaveInsertCoin = (insertCoin: Coin) => {
    saveInsertCoin(insertCoin);
  };
  const handleSaveMachineCoin = (machineCoin: Coin) => {
    saveMachineCoin(machineCoin);
  };
  const handleSaveItem = (item: Item) => {
    saveItem(item);
  };
  const hanaleSaveIsPurchased = (isPurchased: boolean) => {
    saveIsPurchased(isPurchased);
  };

  const handleAddMyItem = (myItem: MyItem) => {
    addMyItem(myItem);
  };

  const handleDragInpoMessage = (message: string) => {
    setDragInpoMessage(message);
  };
  const handleUdateIsPurchased = (isPurchased: boolean) => {
    hanaleSaveIsPurchased(isPurchased);
  };

  const handleMyItem = (name: string, imgUrl: string) => {
    setCreateMyItem({ id: 0, itemName: name, url: imgUrl });
    handleAddMyItem({ id: 0, itemName: name, url: imgUrl });
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
              handleUdateIsPurchased={handleUdateIsPurchased}
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
          setIsDropField={setIsDropField}
        />
        <ReturnCoinButton
          totalAmount={totalAmount}
          userCoins={userCoins}
          insertCoins={insertCoins}
          machineCoins={machineCoins}
          isPurchased={isPurchased}
          handleSaveTotalAmount={handleSaveTotalAmount}
          handleSaveUserCoin={handleSaveUserCoin}
          handleSaveInsertCoin={handleSaveInsertCoin}
          handleSaveMachineCoin={handleSaveMachineCoin}
          handleUdateIsPurchased={handleUdateIsPurchased}

          // multipleUpdatesCoins ={multipleUpdatesCoins}
        />
        <GetItemBox
          createMyItem={createMyItem}
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
              setIsDropField={setIsDropField}
              isDropField={isDropField}
            />
          );
        })}
      </Modal>
    </div>
  );
}
