import { useEffect, useState } from 'react';
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
import { useIsPurchased } from '../hooks/useIsPurchased';
import { MyItem } from '../types/myItem';
import { infoMessageState } from '../recoil/atoms/presentationAtoms/infoMessageState';

import { useRecoilValue } from 'recoil';

export default function MachinePage() {
  
  const { items, saveItem } = useItems();
  const { machineCoins, saveOnlyMachineCoin } = useMachineCoins();
  const { userCoins, saveUserCoin, saveOnlyUserCoin, getUserCoins } = useUserCoins();
  const { totalAmount, saveTotalAmount } = useTotalAmount();
  const { insertCoins, saveInsertCoin, saveOnlyInsertCoin } = useInsertCoins();
  const { addMyItem } = useMyItems();
  const { isPurchased, saveIsPurchased } = useIsPurchased();

  const infoMessage = useRecoilValue(infoMessageState);

  const [isOpen, setIsOpen] = useState(false);
  const [isGetItem, setIsGetItem] = useState(false);
  const [createMyItem, setCreateMyItem] = useState<MyItem>({
    id: 0,
    itemName: '',
    url: '',
  });

  const handleMyItem = (name: string, imgUrl: string) => {
    setCreateMyItem({ id: 0, itemName: name, url: imgUrl });
    addMyItem({ id: 0, itemName: name, url: imgUrl });
    setIsGetItem(true);
  };

  const onClickModal = () => (isOpen ? setIsOpen(false) : setIsOpen(true));

  const onClickMyItem = () => {
    if (isGetItem) setIsGetItem(false);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        onClickModal();
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [isOpen]);

  return (
    <div className="machine-body">
      <div className="body-left">
        <div className="item-display">
          {items.map(item => (
            <ItemBox
              key={item.id}
              item={item}
              handleMyItem={handleMyItem}
              totalAmount={totalAmount}
              saveTotalAmount={saveTotalAmount}
              saveItem={saveItem}
              saveIsPurchased={saveIsPurchased}
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
        <div className="screen">
          <h2>CRYSTAL</h2>
          <div className="info-screen">
            <span className="info-message">{infoMessage}</span>
          </div>
          <div className="total-screen">
            <span className="total-num">{formatPrice(totalAmount)}</span>
          </div>
        </div>
        <EntCoinBox onClickModal={onClickModal} />
        <ReturnCoinButton
          totalAmount={totalAmount}
          saveTotalAmount={saveTotalAmount}
          userCoins={userCoins}
          saveOnlyUserCoin={saveOnlyUserCoin}
          machineCoins={machineCoins}
          saveOnlyMachineCoin={saveOnlyMachineCoin}
          insertCoins={insertCoins}
          saveOnlyInsertCoin={saveOnlyInsertCoin}
          isPurchased={isPurchased}
          saveIsPurchased={saveIsPurchased}
          getUserCoins={getUserCoins}
        />
        <GetItemBox
          createMyItem={createMyItem}
          isGetItem={isGetItem}
          onClickMyItem={onClickMyItem}
        />
      </div>
      <Modal isOpen={isOpen} onClickModal={onClickModal}>
        {userCoins.map(userCoin => {
          return (
            <UserCoin
              key={userCoin.coin}
              userCoin={userCoin}
              totalAmount={totalAmount}
              saveTotalAmount={saveTotalAmount}
              saveUserCoin={saveUserCoin}
              insertCoins={insertCoins}
              saveInsertCoin={saveInsertCoin}
            />
          );
        })}
      </Modal>
    </div>
  );
}
