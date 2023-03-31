import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Footer = () => {
    return (
        <footer className='bg-[#F3F4F6]'>
            <Container className='px-0 py-8'>
                <Row>
                    <Col lg ='4'>
                        <div className='flex items-center gap-[8px] cursor-pointer my-3'>
                            <div>
                                <h1 class='font-bold text-[1.2rem] text-[var(--primary-color)]'>Entikay__</h1>
                            </div>
                            
                        </div>
                    </Col>
                    <Col lg ='3'>
                        <h4 className='text-lg font-semibold my-3'>ABOUT US</h4>
                    
                    </Col>
                    <Col lg ='2'>
                        <h4 className='text-lg font-semibold my-3'>SUPPORT</h4>
                        
                    </Col>
                    <Col lg ='3'>
                        <h4 className='text-lg font-semibold my-3'>LEGAL</h4>
                        
                    </Col>
                </Row>
                <section className='pb-1 pt-3 mt-4 text-center text-sm'>Copyright 2023 developed by Hai Nam.All rights reserved.</section>
            </Container>
        </footer>
    );
};

export default Footer;