import React from 'react';
import Link from 'next/link';

type Props = {
  data: {
    name: string;
    path: string;
  };
  isLoading: boolean;
};

const Item: React.FC<Props> = ({ data, isLoading }) => {
  return isLoading ? (
    <div className="h-6 mb-3 bg-gray-600 rounded animate-pulse" />
  ) : (
    <li>
      <Link href={data.path} className="text-gray-300 hover:text-white">
        {data.name}
      </Link>
    </li>
  );
};

Item.defaultProps = {
  data: {
    name: '',
    path: '',
  },
  isLoading: false,
};

export default Item;
