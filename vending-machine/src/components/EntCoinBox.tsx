import React from 'react';

interface EntCoinBoxPorps {
  dragInpoMessage: string;
  onClickModal: () => void;
  handleDragInpoMessage: (message: string) => void;
}

const EntCoinBox: React.FC<EntCoinBoxPorps> = ({
  dragInpoMessage,
  onClickModal,
  handleDragInpoMessage,
}) => {
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    console.log('PSJ: dragEnter', e.target);
    handleDragInpoMessage('동전을 놔주세요');
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    console.log('PSJ: dragLeave', e.target);
    handleDragInpoMessage('거기말고! 여기!');
  };

  const handleDropOnMap = (e: React.DragEvent) => {
    e.preventDefault();
    handleDragInpoMessage('갑사합니다 :)');
    setTimeout(() => {
      handleDragInpoMessage('');
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
