import React, {useEffect, useState} from 'react';
import {Link, Outlet, useSearchParams} from 'react-router-dom';
import {getSettings, getSheetList, getSheetData} from '/@/modules/api_modules';

const Sheets = () => {
  const [loading, loadingState] = useState<boolean>(true);
  const [sheetData, sheetDataState] = useState<Data[]>([]);
  const [cerdPath, cerdPathState] = useState<string>('');
  const [currentIndex, currentIndexState] = useState(0);

  const param = window.location.toString().split('/').pop()?.split('?').pop() || 'index=0&data=0';
  const urlParams = new URLSearchParams('?' + param);
  useEffect(() => {
    getSettings().then(async settings => {
      const dataIndex = urlParams.get('index');
      console.log(dataIndex);
      if (dataIndex !== null) {
        const cerdPath = settings[parseInt(dataIndex)] || '';
        cerdPathState(cerdPath);
        const newData = await getSheetList(cerdPath);
        sheetDataState(newData);
        getSheetData({cerdPath: cerdPath, id: newData[parseInt(dataIndex)].id}).then(data => {
          localStorage.setItem('data', JSON.stringify(data));
          loadingState(false);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (sheetData.length !== 0) {
      loadingState(true);
      getSheetData({cerdPath: cerdPath, id: sheetData[currentIndex].id}).then(data => {
        localStorage.setItem('data', JSON.stringify(data));
        loadingState(false);
      });
    }
  }, [currentIndex]);

  return (
    <div className="overflow-hidden flex flex-row w-[100%] h-[100%]">
      <div className="w-[300px] h-[100%] bg-[#ff8af3]">
        <div className="h-[100%] w-[300px] border-black border-r-2 ">
          <h1 className="text-center text-xl font-medium p-[12px] break-words">
            Data Receive from service account
          </h1>
          <div className="h-[400px] w-[100%] overflow-y-auto">
            {sheetData.map((value, index) => (
              <div
                key={value.name}
                className="break-words bg-blue-100 hover:bg-blue-500 duration-300 p-[15px] max-w-[300px]"
              >
                <Link
                  to={`/sheets/${
                    cerdPath.replace(/^.*[\\/]/, '').split('.')[0]
                  }?index=${urlParams.get('index')}&data=${index}`}
                  className="block h-[100%] w-[100%] m-0 p-0 text-left"
                  onClick={() => {
                    currentIndexState(index);
                  }}
                >
                  {value.name}
                </Link>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <Link
              to="/"
              className="text-center px-[10px] py-[5px] rounded-2xl bg-teal-300 hover:bg-blue-600 duration-300"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
      <div className="overflow-auto h-[100%] w-[100%]">
        {!loading ? (
          <Outlet />
        ) : (
          <h1 className="float text-xl text-center align-middle content-center">Loading...</h1>
        )}
      </div>
    </div>
  );
};

export default Sheets;
