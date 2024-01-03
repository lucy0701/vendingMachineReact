import React from 'react';
import {
  dragInpoMessageState,
  isDropFieldState,
} from '../recoil/atoms/presentationAtoms/dragAndDropState';
import { useRecoilState, useSetRecoilState } from 'recoil';


interface EntCoinBoxPorps {
  onClickModal: () => void;
}

const EntCoinBox: React.FC<EntCoinBoxPorps> = ({ onClickModal }) => {
  const setIsDropField = useSetRecoilState<boolean>(isDropFieldState);
  const [dragInpoMessage, setdragInpoMessage] =
    useRecoilState<string>(dragInpoMessageState);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropField(true);
    setdragInpoMessage('동전을 놔주세요');
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDropField(false);
    setdragInpoMessage('거기말고! 여기!');
  };

  const handleDropOnMap = (e: React.DragEvent) => {
    e.preventDefault();
    setdragInpoMessage('갑사합니다 :)');
    setTimeout(() => {
      setdragInpoMessage('');
    }, 1000);
  };

  return (
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
  );
};

export default EntCoinBox;
