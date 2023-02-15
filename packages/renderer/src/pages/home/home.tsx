import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {getFile as getKey, getSettings, updateSettings} from '/@/modules/api_modules';

const Home: React.FC = () => {
  const [path, pathState] = useState<string[]>([]);

  const remove = (index: number) => {
    const newPath = [...path];
    newPath.splice(index, 1);
    pathState(newPath);
  };

  useEffect(() => {
    getSettings().then(data => pathState(data as string[]));
  }, []);

  useEffect(() => {
    updateSettings(path);
  }, [path]);

  return (
    <div className="h-[100%] flex flex-col justify-center justify-items-center bg-[#00d7db]">
      <div className="flex flex-col h-72 ml-64 mr-64  text-center justify-center">
        <div className="overflow-y-scroll border-black h-[100%] border-4 bg-gray-100">
          {path.map((data: string, index: number) => (
            <div
              className="flex justify-between pt-[5px] pb-[5px] hover:bg-blue-400 duration-300"
              key={data}
            >
              <Link
                to={`/sheets/${data.replace(/^.*[\\/]/, '').split('.')[0]}?index=${index}&data=0`}
                className="w-[100%]"
              >
                {data.replace(/^.*[\\/]/, '')}
              </Link>
              <button
                onClick={() => remove(index)}
                className="font-bold text-center bg-red-600 rounded-xl p-[4px] pt-0 pb-0 hover:bg-red-800 duration-300 mr-[10px]"
              >
                <img
                  className="h-[15px] w-[15px]"
                  src="../../assets/remove.svg"
                />
              </button>
            </div>
          ))}
        </div>
        <div>
          <button
            onClick={() =>
              getKey().then(e => {
                pathState(e || path);
              })
            }
            className="mt-[10px] rounded-2xl border-black border-2 bg-gray-100 hover:bg-blue-500 duration-300 p-[2px] ml-[431px]"
          >
            Open Key
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
