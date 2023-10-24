import React from 'react';
import { Divider, Table } from 'antd';

const columns = [
  {
    title: 'Integration',
    dataIndex: 'integration',
    render: (text) => <a style={{ fontSize: '17px', color: '#002855' ,fontWeight: '200',}}>{text}</a>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (text) => <a style={{ fontSize: '17px', color: '#002855' ,fontWeight: '200',}}>{text}</a>,
  },
  {
    title: 'Uptime',
    dataIndex: 'uptime',
    render: (text) => <a style={{ fontSize: '17px', color: '#002855' ,fontWeight: '200',}}>{text}</a>,
  },
  {
    title: 'Requests',
    dataIndex: 'requests',
    render: (text) => <a style={{ fontSize: '17px', color: '#002855' ,fontWeight: '200',}}>{text}</a>,
  },
  {
    title: 'Efficiency',
    dataIndex: 'efficiency',
    render: (text) => <a style={{ fontSize: '17px', color: '#002855' ,fontWeight: '200',}}>{text}</a>,
  },
  {
    title: 'Flags',
    dataIndex: 'flags',
    render: (text) => <a style={{ fontSize: '17px', color: '#002855' ,fontWeight: '200',}}>{text}</a>,
  },
  {
    title: null,
    dataIndex: 'null',
    render: (text, record) => (
      <a href="/#">
        <img
          src="https://i.ibb.co/tY7MTNq/pepicons-pop-dots-x.png"
          alt="Click Me"
          style={{ width: '28px', height: '28px' }}
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
  {
    key: '4',
    integration: 'AML Risk Scoring',
    status: 'Online',
    uptime: '85%',
    requests: '102K',
    efficiency: '12%',
    flags: 4450,
    null: 'image_placeholder',
  },
  {
    key: '5',
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
