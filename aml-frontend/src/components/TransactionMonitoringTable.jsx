import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/OverviewAPIContainer.css";
import { Divider, Table,Button } from 'antd';


const columns = [
  {
    title: 'Transact ID',
    dataIndex: 'Transact ID',
    render: (text) => <a style={{ fontSize: '17px', color: '#002855' ,fontWeight: '200',}}>{text}</a>,
  },
  {
    title: 'Transact From',
    dataIndex: 'Transact From',
    render: (text) => <a style={{ fontSize: '17px', color: '#002855' ,fontWeight: '200',}}>{text}</a>,
  },
  {
    title: 'Date',
    dataIndex: 'Date',
    render: (text) => <a style={{ fontSize: '17px', color: '#002855' ,fontWeight: '200',}}>{text}</a>,
  },
  {
    title: 'Time',
    dataIndex: 'Time',
    render: (text) => <a style={{ fontSize: '17px', color: '#002855' ,fontWeight: '200',}}>{text}</a>,
  },
  {
    title: 'Currency',
    dataIndex: 'Currency',
    render: (text) => <a style={{ fontSize: '17px', color: '#002855' ,fontWeight: '200',}}>{text}</a>,
  },
  {
    title: 'Amount',
    dataIndex: 'Amount',
    render: (text) => <a style={{ fontSize: '17px', color: '#002855' ,fontWeight: '200',}}>{text}</a>,
  },
  {
    title: 'Country From',
    dataIndex: 'Country From',
    render: (text) => <a style={{ fontSize: '17px', color: '#002855' ,fontWeight: '200',}}>{text}</a>,
  },
  {
    title: 'Bank From',
    dataIndex: 'Bank From',
    render: (text) => <a style={{ fontSize: '17px', color: '#002855' ,fontWeight: '200',}}>{text}</a>,
  },
  {
    title: 'Bank From',
    dataIndex: 'Bank From',
    render: (text) => <a style={{ fontSize: '17px', color: '#002855' ,fontWeight: '200',}}>{text}</a>,
  },
  {
    title: "Violations",
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
    {
      title: 'Actions',
      dataIndex: 'Actions',
      render: (text) => <Button type="primary" style={{ fontSize: '17px', color: '#002855' ,fontWeight: '200',}}>Accept</Button>,
    }
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
];

const KYCTable = () => {
  return (
    <div className="row" id="container_list">
      <div className="api_container padding">
          <div
            style={{
              zIndex: "0",
              maxHeight: "300px",
              overflowY: "scroll",
              border: "1px solid #e0e0e0",
              borderRadius: "10px",
            }}
          >
            <Table
              rowSelection={{
                type: "checkbox",
              }}
              columns={columns.map((column) => ({
                ...column,
                title: (
                  <span
                    style={{
                      color: "#002855",
                      fontWeight: "600",
                      fontSize: "18px",
                      textAlign: "center",
                    }}
                  >
                    {column.title}
                  </span>
                ),
              }))}
              dataSource={data}
              pagination={false}
            />
        </div>
      </div>
    </div>
  );
};

export default KYCTable;
