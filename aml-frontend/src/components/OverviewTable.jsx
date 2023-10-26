import React from 'react';
import { Table } from 'antd';

const OverviewTable = ({ columns, data }) => {
  return (
    <div
      style={{
        zIndex: '0',
        maxHeight: '300px',
        overflowY: 'scroll',
        border: '1px solid #e0e0e0',
        borderRadius: '10px',
      }}
    >
      <Table
        rowSelection={{
          type: 'checkbox',
        }}
        columns={columns.map((column) => ({
          ...column,
          title: (
            <span style={{ color: '#002855', fontWeight: '600', fontSize: '18px', textAlign: 'center' }}>
              {column.title}
            </span>
          ),
        }))}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
};

export default OverviewTable;
