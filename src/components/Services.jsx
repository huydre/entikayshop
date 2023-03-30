import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button } from "@nextui-org/react";


const Services = () => {
    return <section className='p-0'>
        <Container>
            <div className=' text-white w-full items-center'>
                <h1 className='font-semibold mb-3'>Bạn chưa có tài khoản?</h1>
                <p className='text-white'>
                    Hãy tạo ngay một tài khoản để sử dụng đầy đủ các tính năng, 
                    tích lũy ưu đãi khi thanh toán các sản phẩm và tham gia vào 
                    chương trình Giới thiệu bạn bè nhận hoa hồng vĩnh viễn tại Entikay Shop.
                </p>
                <div className='flex items-center space-x-4 mt-4'>
                    <Button auto shadow color="success">Đăng kí ngay</Button>
                    <div className='flex items-center space-x-2'>
                        <p>Hoặc bạn đã có tài khoản?</p>
                        <button>Đăng nhập</button>
                    </div>
                </div>
            </div>
        </Container>
    </section>
}

export default Services