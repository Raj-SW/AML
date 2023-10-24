import React from 'react';
import { Divider, Table } from 'antd';

const columns = [
  {
    title: 'Integration',
    dataIndex: 'integration',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Uptime',
    dataIndex: 'uptime',
  },
  {
    title: 'Requests',
    dataIndex: 'requests',
  },
  {
    title: 'Efficiency',
    dataIndex: 'efficiency',
  },
  {
    title: 'Flags',
    dataIndex: 'flags',
  },
  {
    title: null,
    dataIndex: 'null',
    render: (text, record) => (
      <a href="#" onClick={() => handleImageClick(record.key)}>
        <img
          src="https://www.svgrepo.com/show/124304/three-dots.svg"
          alt="Click Me"
          style={{ width: '24px', height: '24px' }} 
        />
      </a>
    ),
  },
];

const data = [
  {
    key: '1',
    integration: 'CDD Integration',
    status: 'Online',
    uptime: '85%',
    requests: '102K',
    efficiency: '12%',
    flags: '4523',
    null: 'image_placeholder',
  },
  {
    key: '2',
    integration: 'KYC Pipeline Integration',
    status: 'Down',
    uptime: '45%',
    requests: '3M',
    efficiency: '52%',
    flags: '46K',
    null: 'image_placeholder',
  },
  {
    key: '3',
    integration: 'AML Risk Scoring',
    status: 'Online',
    uptime: '85%',
    requests: '102K',
    efficiency: '12%',
    flags: 4450,
    null: 'image_placeholder',
  },
];

const OverviewTable = () => {
//   const handleImageClick = (key) => {
//     
//   };

  return (
    <div style={{ zIndex: '0', maxHeight: '300px', overflowY: 'scroll' }}>
      <Table
        rowSelection={{
          type: 'checkbox',
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
};

export default OverviewTable;
