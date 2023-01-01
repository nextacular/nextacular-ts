import React from 'react';
import Item from './item';

interface MenuProps {
  data: {
    name: string;
    menuItems: {
      name: string;
      path: string;
    }[];
  };
  isLoading?: boolean;
  showMenu: boolean;
}

const Menu: React.FC<MenuProps> = ({ data, isLoading, showMenu }) => {
  return showMenu ? (
    <div className="space-y-2">
      <h5 className="text-sm font-bold text-gray-400">{data.name}</h5>
      <ul className="ml-5 leading-10">
        {data.menuItems.map((entry, index) => (
          <Item key={index} data={entry} isLoading={isLoading} />
        ))}
      </ul>
    </div>
  ) : null;
};

Menu.defaultProps = {
  isLoading: false,
  showMenu: false,
};

export default Menu;
