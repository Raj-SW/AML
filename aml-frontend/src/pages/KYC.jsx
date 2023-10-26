import React from "react";
import "../styles/Overview.css";
import OverviewContainer from "../components/OverviewContainer";
import KYCTable from "../components/KYCTable";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from 'antd';
import '../styles/KYC.css';

const KYC = () => {
  return (
    <div className="container-fluid vh-100">
      <div className="row">
        <div className="col">
          <p className="title_name">KYC {">"} Entity Name</p>
        </div>
      </div>

      <div className="row" id="container_list">
        <OverviewContainer />
      </div>
      <div className="row" id="container_list">
        <div className="api_container">
          <Container>
            <Row>
              <Col>
                <Row className="padding">Entity ID:</Row>
                <Row className="padding" >#13dsf85</Row>
              </Col>
              <Col>
                 <Row className="padding">KYC Status:</Row>
                <Row className="padding"><Button type="primary">Active</Button></Row>
               </Col>

              <Col>
                <Row className="padding">Edit</Row>
                <Row className="padding"><Button type="primary">Deactivate</Button></Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <div className="kyc_table">
      <KYCTable/>
      </div>
    </div>
  );
};

export default KYC;
