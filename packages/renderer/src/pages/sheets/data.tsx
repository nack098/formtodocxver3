import React from 'react';
import {Link} from 'react-router-dom';

const Data = () => {
  const data: any[] = JSON.parse(localStorage.getItem('data') || '');

  return (
    <>
      {data.map((data: any, dataIndex: any) =>
        Object.getOwnPropertyNames(data).map(name => {
          return (
            <div
              key={name}
              className="py-[8px] px[15px] font-bold bg-gray-400 hover:bg-blue-400"
            >
              <Link
                to={`data/${name}?index=${dataIndex}`}
                relative="route"
                className="block relative [100%] w-[100%]"
              >
                {dataIndex + 1}. {name}
              </Link>
            </div>
          );
        }),
      )}
    </>
  );
};

export default Data;
