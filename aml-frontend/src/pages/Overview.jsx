import React, { useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import OverviewTable from "../components/OverviewTable";
import "../styles/Overview.css";
import OverviewAPIContainer from "../components/OverviewAPIContainer";
import { Button, Input, Space } from "antd";
import { SearchOutlined } from '@ant-design/icons';

import Highlighter from "react-highlight-words";

function Overview() {
  // columns props
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
// end of column props

//columnd data and structure
const columns = [
  {
    title: "Integration",
    dataIndex: "integration",
    render: (text) => (
      <a style={{ fontSize: "17px", color: "#002855", fontWeight: "200" }}>
        {text}
      </a>
    ),
    ...getColumnSearchProps('integration'),
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text) => (
      <a style={{ fontSize: "17px", color: "#002855", fontWeight: "200" }}>
        {text}
      </a>
    ),
  },
  {
    title: "Uptime",
    dataIndex: "uptime",
    render: (text) => (
      <a style={{ fontSize: "17px", color: "#002855", fontWeight: "200" }}>
        {text}
      </a>
    ),
  },
  {
    title: "Requests",
    dataIndex: "requests",
    render: (text) => (
      <a style={{ fontSize: "17px", color: "#002855", fontWeight: "200" }}>
        {text}
      </a>
    ),
    defaultSortOrder: "descend",
    sorter: (a, b) => a.requests - b.requests,
  },
  {
    title: "Efficiency",
    dataIndex: "efficiency",
    render: (text) => (
      <a style={{ fontSize: "17px", color: "#002855", fontWeight: "200" }}>
        {text}
      </a>
    ),
  },
  {
    title: "Flags",
    dataIndex: "flags",
    render: (text) => (
      <a style={{ fontSize: "17px", color: "#002855", fontWeight: "200" }}>
        {text}
      </a>
    ),
  },
  {
    title: null,
    dataIndex: "null",
    render: (text, record) => (
      <a href="/#">
        <img
          src="https://i.ibb.co/tY7MTNq/pepicons-pop-dots-x.png"
          alt="Click Me"
          style={{ width: "28px", height: "28px" }}
        />
      </a>
    ),
  },
];

const data = [
  {
    key: "1",
    integration: "CDD Integration",
    status: "Online",
    uptime: "85%",
    requests: 102000,
    efficiency: "12%",
    flags: "4523",
    null: "image_placeholder",
  },
  {
    key: "2",
    integration: "KYC Pipeline Integration",
    status: "Down",
    uptime: "45%",
    requests: 300000,
    efficiency: "52%",
    flags: "46K",
    null: "image_placeholder",
  },
  {
    key: "3",
    integration: "AML Risk Scoring",
    status: "Online",
    uptime: "85%",
    requests: 102000,
    efficiency: "12%",
    flags: 4450,
    null: "image_placeholder",
  },
  {
    key: "4",
    integration: "AML Risk Scoring",
    status: "Online",
    uptime: "85%",
    requests: 102001,
    efficiency: "12%",
    flags: 4450,
    null: "image_placeholder",
  },
  {
    key: "5",
    integration: "AML Risk Scoring",
    status: "Online",
    uptime: "85%",
    requests: 15000,
    efficiency: "12%",
    flags: 4450,
    null: "image_placeholder",
  },
];


//end of column data and structure



  return (
    <div className="container-fluid vh-100">
      <div className="row">
        <div className="col">
          <p className="title_name">Overview</p>
        </div>
      </div>

      <div className="row" id="container_list">
        <OverviewAPIContainer />
      </div>

      <div className="row">
        <div className="col d-flex justify-content-end">
          <button className="btn_filterbtn">
            <img
              src="https://i.ibb.co/QQNg4mg/Group-11.png"
              alt="Filter Icon"
            />{" "}
            Filter
          </button>
        </div>
      </div>

      <div className="overview_table">
        <OverviewTable columns={columns} data={data} />
      </div>
    </div>
  );
}

export default Overview;
