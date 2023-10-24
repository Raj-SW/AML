import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import OverviewTable from '../components/OverviewTable';
import '../styles/Overview.css';
import OverviewAPIContainer from '../components/OverviewAPIContainer';


function Overview() {
    return (
        <div className="container-fluid vh-100" >

            <div className="row">
                <div className="col">
                    <p className='title_name'>Overview</p>
                </div>
            </div>


            <div className="row" id='container_list'>
                <OverviewAPIContainer/>
            </div>


            <div className="row">
                <div className="col">
                    <button className="btn_filterbtn">Filter</button>
                </div>
            </div>

            <div className='overview_table'>
                <OverviewTable/>
            </div>

        </div>
    );
}

export default Overview;
