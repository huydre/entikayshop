import React from 'react';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';

const Checkout = () => {
    return (
        <Helmet title='Checkout'>
            <CommonSection title='Checkout'/>
                <section>
                    <Container>
                        <Row>
                            <Col lg='8'>
                                <h6 className='mb-4 font-bold'>Billing Infomation</h6>
                                <Form>
                                    <FormGroup>
                                        <input type='text' placeholder='Enter your name'/>
                                    </FormGroup>
                                    <FormGroup>
                                        <input type='email' placeholder='Enter your email'/>
                                    </FormGroup>
                                    <FormGroup>
                                        <input type='number' placeholder='Phone number'/>
                                    </FormGroup>
                                </Form>
                            </Col>
                            <Col lg='4'></Col>
                        </Row>
                    </Container>
                </section>
        </Helmet>
    )
}

export default Checkout