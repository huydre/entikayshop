import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import heroImg from '../assets/images/hero-img-spotify.png';
import { motion} from 'framer-motion';
import Services from '../components/Services';
import ProductsList from '../components/UI/ProductsList';
import { useEffect, useState } from 'react';
import useGetData from '../custom-hooks/useGetData';
import { useNavigate } from 'react-router-dom';
import lightBanner from '../assets/images/light-banner.png';
import banner1 from '../assets/images/banner_1.png'
import banner2 from '../assets/images/banner_2.png'
import { Loading } from '@nextui-org/react';

const Home = () => {
    const navigate = useNavigate();
    const [trendingProducts,setTrendingProducts] = useState([]);
    const [bestSaleProducts,setBestSaleProducts] = useState([]);

    const {data: products, loading: isLoading} = useGetData('products')

    useEffect(()=> {
        const filteredTrendingProducts = products.filter(item=> item.category === 'entertainment');
        const filteredBestSaleProducts = products.filter(item=> item.category === 'work');

        setTrendingProducts(filteredTrendingProducts);
        setBestSaleProducts(filteredBestSaleProducts);

    },[products])

    // console.log("data: ",products,"loading: ",isLoading)

    return <Helmet title = {'Home'}>
        <section className='pt-4'>
            {/* banner left */}
            <div className='fixed left-5 w-[14rem] top-1/4 z-20 max-[1810px]:hidden'>
                    <img src={banner1} alt='' />
            </div>
            {/* banner right */}
            <div className='fixed right-5 w-[14rem] top-1/4 z-20 max-[1810px]:hidden'>
                    <img src={banner2} alt='' />
            </div>
            <Container className="bg-[#0D81FE] bg-[url('https://firebasestorage.googleapis.com/v0/b/entikayshop.appspot.com/o/images%2Foverlay_ng.png?alt=media&token=2629f9d9-6c81-426c-b079-1eee05218a08')] rounded-3xl p-10 z-0 bg-center bg-cover">
                
                
                <Row className='z-0'>
                    <Col lg='6' md='6'>
                        <motion.h2
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0, transition: {
                           type: 'spring',
                           duration: 1.25,
                           delay: 0.5
                        }}}
                        viewport={{ once: true, amount: 0.25}}
                        className='pl-8 pt-16 text-white text-[4rem] font-bold '>Entikay</motion.h2>
                        <motion.h2
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0, transition: {
                           type: 'spring',
                           duration: 1.25,
                           delay: 0.5
                        }}}
                        viewport={{ once: true, amount: 0.25}}
                        className='text-white pl-8 font-bold '>Có tất cả mọi thứ bạn cần!</motion.h2>
                        <motion.p
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0, transition: {
                           type: 'spring',
                           duration: 1.25,
                           delay: 0.5
                        }}}
                        viewport={{ once: true, amount: 0.25}}
                        className='text-white pl-8 pt-4'>Trải nghiệm tuyệt vời, giá trị vô cùng - Đặt ngay tài khoản Netflix, Spotify và nhiều hơn nữa!</motion.p>
                        <motion.button
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0, transition: {
                           type: 'spring',
                           duration: 1.25,
                           delay: 0.5
                        }}}
                        viewport={{ once: true, amount: 0.25}}
                        onClick={()=> navigate('/shop')}
                        className='shadow-xl my-6 ml-8 py-2 px-4 rounded-[15px] bg-[#F6AB3B] font-bold text-white cursor-pointer text-md hover:text-white z-20  '>Khám phá ngay
                        </motion.button>
                    </Col>
                    <Col lg='6' md='6'>
                           <img className='scale-125 xl:scale-150 lg:translate-x-10 lg:translate-y-3 md:translate-y-14' src={heroImg} alt='heroimg' />    
                    </Col>
                </Row>
            </Container>
            
        </section>
        
        {/* Trending products */}
        <section>
            <Container className='z-10'>
                <Row>
                    <Col lg='12'>
                        <h2 className='text-center text-black font-medium mb-8'>Sản phẩm bán chạy nhất</h2>
                    </Col>
                    {
                        isLoading ?
                        <Loading>Loading</Loading>
                        :
                        <ProductsList data = {trendingProducts}/>
                    }
                </Row>
            </Container>
        </section>

        <section className='py-8 overflow-hidden'>
            <img src={lightBanner} alt=''  className='scale-[2] lg:scale-150 xl:scale-100 bg-cover'/>
        </section>

        {/* Sản phẩm nổi bật */}
        <section>
            <Container>
                <Row>
                    <Col lg='12'>
                        <h2 className='text-center text-black font-medium mb-8'>Sản phẩm nổi bật</h2>
                    </Col>
                    {
                        isLoading ?
                        <Loading>Loading</Loading>
                        :
                        <ProductsList data = {bestSaleProducts}/>
                    }
                </Row>
            </Container>
        </section>
        <section className='bg-black mt-8 py-4'>
                <Services/>
        </section>
        
    </Helmet>
}

export default Home