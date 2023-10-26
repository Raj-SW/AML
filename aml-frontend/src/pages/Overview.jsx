import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OverviewTable from '../components/OverviewTable';
import '../styles/Overview.css';
import OverviewAPIContainer from '../components/OverviewAPIContainer';

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

function Overview() {
    return (
        <div className="container-fluid vh-100" >

            <div className="row">
                <div className="col">
                    <p className='title_name'>Overview</p>
                </div>
            </div>


            <div className="row" id='container_list'>
                <OverviewAPIContainer />
            </div>


            <div className="row">
                <div className="col d-flex justify-content-end">
                    <button className="btn_filterbtn">
                        <img src="https://i.ibb.co/QQNg4mg/Group-11.png" alt="Filter Icon" /> Filter
                    </button>
                </div>
            </div>



            <div className='overview_table'>
                <OverviewTable columns={columns} data={data} />
            </div>



        </div>
    );
}

export default Overview;
