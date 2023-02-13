//@ts-nocheck
import type {HTMLProps} from 'react';
import React, { useMemo, useState} from 'react';
import {useRowSelect, useTable} from 'react-table';
import {getFolder, getFile, dataToDocx} from '/@/modules/api_modules';

function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: {indeterminate?: boolean} & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  );
}

const DataView = () => {
  const [location, locationState] = useState('');
  const [template, templateState] = useState('');

  const urlparam = window.location.toString().split('/').pop()?.split('?').pop() || 'index=0&data=0';
  const param = new URLSearchParams('?' + urlparam);
  const data = JSON.parse(localStorage.getItem('data') || '[]');
  const dataArray: any = Object.values(data[param.get('index') || 0])[0];

  const dataMemo = useMemo(() => dataArray, []);

  const columns = useMemo(() => {
    const array = [];
    for (const key of Object.keys(dataArray[0])) {
      array.push({
        Header: key,
        accessor: key,
      });
    }
    return array;
  }, []);

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, selectedFlatRows} =
    useTable({columns, data: dataMemo}, useRowSelect, hooks => {
      hooks.visibleColumns.push(columns => {
        return [
          {
            id: 'selection',
            Header: ({getToggleAllRowsSelectedProps}) => (
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            ),
            Cell: ({row}) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />,
          },
          ...columns,
        ];
      });
    });

  const addLocation = () => {
    getFolder().then(folder => {
      if (!folder.canceled) {
        locationState(folder.filePaths[0]);
      }
    });
  };

  const getTemplate = () => {
    getFile().then(file => {
      if (file) {
        templateState(file[0]);
      }
    });
  };

  const submitHandler = () => {
    const data = selectedFlatRows.map(value => value.original);

    dataToDocx({
      data: data,
      outputPath: location,
      path: template,
    });
  };

  return (
    <>
      <h1 className="font-bold text-2xl px-[25px] py-[15px]">
        {Object.keys(data[param.get('index') || 0])[0]}
      </h1>
      <div className="mx-[25px]">
        <table
          {...getTableProps}
          className="text-xs"
        >
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    {...column.getHeaderProps()}
                    className="px-[10px] py-[5px] bg-blue-300 font-bold border-[1px] border-black"
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="px-[10px] py-[5px] border-[1px] border-black"
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mx-[25px] my-[15px]">
        <p className="mb-[6px]">
          <u>
            <i>{template}</i>
          </u>
        </p>
        <button
          onClick={getTemplate}
          className="px-[10px] py-[4px] bg-blue-300 hover:bg-blue-500 rounded-2xl duration-300"
        >
          Choose Template
        </button>
      </div>
      <div className="mx-[25px] my-[15px]">
        <p className="mb-[6px]">
          <u>
            <i>{location}</i>
          </u>
        </p>
        <button
          onClick={addLocation}
          className="px-[10px] py-[4px] bg-blue-300 hover:bg-blue-500 rounded-2xl duration-300"
        >
          Save Location
        </button>
      </div>
      <div>
        {location && template && selectedFlatRows.length !== 0 && (
          <button
            onClick={submitHandler}
            className="mx-[25px] font-bold px-[10px] py-[4px] bg-blue-300 hover:bg-blue-500 rounded-2xl duration-300"
          >
            Submit
          </button>
        )}
      </div>
    </>
  );
};

export default DataView;
