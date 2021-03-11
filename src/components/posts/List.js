import React from 'react';
import './style.scss';
import Single from './Single';

const List = ({list}) => {


  return (
    <div className="list">
      {
        list.map((one) => <Single key={one.id} {...one} />).reverse()
      }
    </div>
  )
};

export default List;
