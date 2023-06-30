import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Button } from "@nextui-org/react";


const Services = () => {
    return <section className='p-0'>
        <Container>
            <div className=' text-white w-full items-center'>
                <h1 className='font-semibold mb-3 max-[768px]:text-xl'>Bạn chưa có tài khoản?</h1>
                <p className='text-white text-sm max-[768px]:text-xs'>
                    Hãy tạo ngay một tài khoản để sử dụng đầy đủ các tính năng, 
                    tích lũy ưu đãi khi thanh toán các sản phẩm và tham gia vào 
                    chương trình Giới thiệu bạn bè nhận hoa hồng vĩnh viễn tại Entikay Shop.
                </p>
                <div className='flex items-center space-x-4 mt-4'>
                    <Button auto color="success" className='max-[768px]:text-sm'>Đăng kí ngay</Button>
                    <div className='flex items-center space-x-2'>
                        <p className='text-sm max-[768px]:text-xs'>Hoặc bạn đã có tài khoản?</p>
                        <button className='text-sm max-[768px]:text-xs'>Đăng nhập</button>
                    </div>
                </div>
            </div>
        </Container>
    </section>
}

export default Services