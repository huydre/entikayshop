import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Divider } from '@nextui-org/react';

const Footer = () => {
    return (
        <footer className='bg-[#F3F4F6]'>
            <Container className='px-0 py-8'>
                <Row>
                    <Col lg ='4'>
                        <div className='flex items-center cursor-pointer my-4'>
                            <div>
                                <h1 class='font-bold text-[1.6rem] text-[var(--primary-color)]'>Entikay</h1>
                            </div>
                            
                        </div>
                    </Col>
                    <Col lg ='2' className='flex items-center cursor-pointer'>
                        <h4 className='text-md my-3 font-normal transition-colors hover:text-blue-500 focus:text-blue-500'>About Us</h4>
                    
                    </Col>
                    <Col lg ='2' className='flex items-center cursor-pointer'>
                        <h4 className='text-md font-normal transition-colors hover:text-blue-500 focus:text-blue-500 my-3'>License</h4>
                        
                    </Col>
                    <Col lg ='2' className='flex items-center cursor-pointer'>
                        <h4 className='text-md font-normal transition-colors hover:text-blue-500 focus:text-blue-500 my-3'>Contribute</h4>
                    </Col>
                    <Col lg ='2' className='flex items-center cursor-pointer'>
                        <h4 className='text-md font-normal transition-colors hover:text-blue-500 focus:text-blue-500 my-3'>Contact Us</h4>
                    </Col>
                </Row>
                <Divider/>
                <section className='pb-1 pt-3 mt-4 text-center text-sm'>© 2023 Hai Nam</section>
            </Container>
        </footer>
    );
};

export default Footer;