import React from 'react';

interface ItemsPorps {
    itemName: string;
    price: number;
    stock: number;
    url: string;
  }

 const ItemBox: React.FC<ItemsPorps> = ({ price, stock, url,  itemName}) => {
    return (
        <div className="item-box">
            <div className="item-image">
                <p className="sold-out">Sold Out</p>
                <div className="item-price">{ price }</div>
                <div className="item-stock">{ stock }</div>
                <img className="item-img-print" src={url} alt={itemName} />
            </div>
            <button className="buy-btn">
                구매
            </button>
        </div>
    )
}

export default ItemBox