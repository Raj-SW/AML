import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/OverviewAPIContainer.css';
import PieChart from '../components/PieChart';

function OverviewAPIContainer() {

    const data1 = [
        { name: "Active APIs", value: 7 },
        { name: "Inactive APIs", value: 3 }
    ];

    const data2 = [
        { name: "Active APIs", value: 5 },
        { name: "Inactive APIs", value: 5 }
    ];

    return (
        <div className= "row">
            <div className="col-md-4">
                <div className='api_container'>
                    <Container>
                        <Row>
                            <p>Active API</p>
                        </Row>
                        <Row>
                            <Col>
                                <PieChart
                                    data={data1}
                                    colors={["#0088FE", "#C0C0C0"]}
                                    innerRadius={70}
                                    outerRadius={120}
                                />
                            </Col>
                            {/* <Col sm={8}>sm=8</Col> */}
                        </Row>
                    </Container>
                </div>
            </div>
            <div className="col-md-4">
                <p>Column 2</p>
            </div>
            <div className="col-md-4">
                <p>Column 3</p>
            </div>
        </div>



    );
}

export default OverviewAPIContainer;