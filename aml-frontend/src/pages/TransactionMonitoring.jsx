import React from "react";
import "../styles/TransactionMonitoring.css";
import OverviewContainer from "../components/OverviewContainer";
import TransactionMonitoringTable from "../components/TransactionMonitoringTable";

const TransactionMonitoring = () => {
  return (
    <div className="container-fluid vh-100">

      <div className="row">
        <div className="col">
          <p className="title_name">Transaction Monitoring {">"} Entity Name</p>
        </div>
      </div>

      <div className="row" id="container_list">
        <OverviewContainer />
      </div>

      <div className="row">
        <div className="col">
          <p className="padding">Incoming Transaction {">"} Entity Name</p>
        </div>
      </div>

      <div className="row" id="container_list">
        <TransactionMonitoringTable />
      </div>

      <div className="row">
        <div className="col">
          <p className="padding">Outgoing Transaction {">"} Entity Name</p>
        </div>
      </div>

      <div className="row" id="container_list">
        <TransactionMonitoringTable />
      </div>


      <div className="row">
        <div className="col">
          <p className="padding">Transactions with Watchlist People {">"} Entity Name</p>
        </div>
      </div>

      <div className="row" id="container_list">
        <TransactionMonitoringTable />
      </div>

    </div>
  );
};

export default TransactionMonitoring;
