import React from 'react';

interface UserCoinProps {
  coin: string;
  count: number;
}

const UserCoin: React.FC<UserCoinProps> = ({ coin, count }) => {
  return (
    <>
      <button className="user-coin-btn" value="">
        {coin}
      </button>
      <p className="user-coin-count"> {count} </p>
    </>
  );
};

export default UserCoin;
