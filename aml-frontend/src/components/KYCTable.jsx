import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/OverviewAPIContainer.css";
import { Divider, Table } from 'antd';


const columns = [
  {
    title: 'Entity ID',
    dataIndex: 'Entity ID',
    render: (text) => <a style={{ fontSize: '17px', color: '#002855' ,fontWeight: '200',}}>{text}</a>,
  },
  {
    title: 'First Name',
    dataIndex: 'First Name',
    render: (text) => <a style={{ fontSize: '17px', color: '#002855' ,fontWeight: '200',}}>{text}</a>,
  },
  {
    title: 'Last Name',
    dataIndex: 'Last Name',
    render: (text) => <a style={{ fontSize: '17px', color: '#002855' ,fontWeight: '200',}}>{text}</a>,
  },
  {
    title: 'Date Joined',
    dataIndex: 'Date Joined',
    render: (text) => <a style={{ fontSize: '17px', color: '#002855' ,fontWeight: '200',}}>{text}</a>,
  },
  {
    title: "View Docs",
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
];

const KYCTable = () => {
  return (
    <div className="row" id="container_list">
      <div className="api_container padding">
        {/* <Container>
            <Row className="padding">
              <h4>Entity Details</h4>
            </Row>
            <Row>
              <Col className="padding">
              <img src="../assets/images.png" className="rounded float-left" alt="profilephoto"></img>
              </Col>
            </Row>
            <table className="table padding" >
              <thead>
                <tr>
                  <th scope="col">Entity ID</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Date Joined</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </table>
          </Container> */}
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
