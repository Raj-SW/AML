import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/OverviewAPIContainer.css';
import ChartPie from '../components/ChartPie';

function OverviewContainer() {

    const data1 = [
        { name: "Active APIs", value: 7 },
        { name: "Inactive APIs", value: 3 }
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
                            <p className='api_container_title'> PEP Score</p>
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

                        </Row>
                    </Container>
                </div>
            </div>


            <div className="col-md-4">
                <div className='api_container'>
                    <Container>
                        <Row>
                            <p className='api_container_title'>AML Risk Score</p>
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

                        </Row>
                    </Container>
                </div>
            </div>

            <div className="col-md-4">
                <div className='api_container'>
                    <Container>
                        <Row>
                            <p className='api_container_title'>Credit Score</p>
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

                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default OverviewContainer;