import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/OverviewAPIContainer.css';
import ChartPie from '../components/ChartPie';

function OverviewAPIContainer() {

    const data1 = [
        { name: "Active APIs", value: 7 },
        { name: "Inactive APIs", value: 4 }
    ];

    const data2 = [
        { name: "Active APIs", value: 3 },
        { name: "Inactive APIs", value: 7 }
    ];

    const data3 = [
        { name: "Active APIs", value: 60 },
        { name: "Inactive APIs", value: 40 }
    ];

    return (
        <div className="row">
            <div className="col-md-4">
                <div className='api_container'>
                    <Container>
                        <Row>
                            <p className='api_container_title'> Active API</p>
                        </Row>
                        <Row>
                            <Col>
                                <ChartPie
                                    data={data1}
                                    colors={["#007EA7", "#D9D9D9"]}
                                    innerRadius={70}
                                    outerRadius={100}
                                />
                            </Col>

                            <Col className='api_value_text'>
                                <p>Number of Active API: <span className='bold-data'>{data1.find(item => item.name === "Active APIs").value}</span></p>
                                <p>Total number of API: <span className='bold-data'>{data1.reduce((total, item) => total + item.value, 0)}</span></p>
                            </Col>

                        </Row>
                    </Container>
                </div>
            </div>


            <div className="col-md-4">
                <div className='api_container'>
                    <Container>
                        <Row>
                            <p className='api_container_title'> Down API</p>
                        </Row>
                        <Row>
                            <Col>
                                <ChartPie
                                    data={data2}
                                    colors={["#007EA7", "#D9D9D9"]}
                                    innerRadius={70}
                                    outerRadius={100}
                                />
                            </Col>

                            <Col className='api_value_text'>
                                <p>Number of Down API: <span className='bold-data'>{data2.find(item => item.name === "Active APIs").value}</span></p>
                                <p>Total number of API: <span className='bold-data'>{data2.reduce((total, item) => total + item.value, 0)}</span></p>
                            </Col>

                        </Row>
                    </Container>
                </div>
            </div>


            <div className="col-md-4">
                <div className='api_container'>
                    <Container>
                        <Row>
                            <p className='api_container_title'> Total Efficiency</p>
                        </Row>
                        <Row>
                            <Col>
                                <ChartPie
                                    data={data3}
                                    colors={["#007EA7", "#D9D9D9"]}
                                    innerRadius={70}
                                    outerRadius={100}
                                />
                            </Col>

                            <Col className='api_value_text'>
                                <p>Efficiency Gain: <span className='bold-data'>{data3.find(item => item.name === "Active APIs").value}</span></p>
                                <p>Efficiency Lost: <span className='bold-data'>{data3.reduce((total, item) => total + item.value, 0)}</span></p>
                            </Col>

                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default OverviewAPIContainer;