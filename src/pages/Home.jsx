import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import heroImg from '../assets/images/hero-img-spotify.png';
import { Link } from 'react-router-dom';
import { motion} from 'framer-motion';
import Services from '../components/Services';
import ProductsList from '../components/UI/ProductsList';
import { useEffect, useState } from 'react';
import useGetData from '../custom-hooks/useGetData';


const Home = () => {
    const [trendingProducts,setTrendingProducts] = useState([]);
    const [bestSaleProducts,setBestSaleProducts] = useState([]);
    const year = new Date().getFullYear();

    const {data: products} = useGetData('products')

    useEffect(()=> {
        const filteredTrendingProducts = products.filter(item=> item.category === 'entertainment');
        const filteredBestSaleProducts = products.filter(item=> item.category === 'work');

        setTrendingProducts(filteredTrendingProducts);
        setBestSaleProducts(filteredBestSaleProducts);

    },[products])

    return <Helmet title = {'Home'}>
        <section className='bg-[#62D962] rounded-3xl m-4'>
            <Container>
                <Row>
                    <Col lg='6' md='6'>
                        <motion.div
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0, transition: {
                           type: 'spring',
                           duration: 1.25,
                           delay: 0.5
                        }}}
                        viewport={{ once: true, amount: 0.25}}
                        >
                            <p className='text-black font-semibold bg-white rounded-2xl py-1 px-2 w-[13rem] text-center'>Sản phẩm nổi bật {year}</p>
                        </motion.div>
                        <motion.h2
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0, transition: {
                           type: 'spring',
                           duration: 1.25,
                           delay: 0.5
                        }}}
                        viewport={{ once: true, amount: 0.25}}
                        className='my-6 text-white text-[2.5rem] font-semibold max-[992px]:text-[2rem] max-[768px]:text-[1.rem]'>Tài khoản Spotify giá siêu rẻ !</motion.h2>
                        <motion.p
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0, transition: {
                           type: 'spring',
                           duration: 1.25,
                           delay: 0.5
                        }}}
                        viewport={{ once: true, amount: 0.25}}
                        className='text-white max-[768px]:text-[1rem]'>Chúng tôi cung cấp duy nhất các tài khoản Spotify giá rẻ nhất thị trường, chính chủ ở Việt Nam. Giá chỉ từ 70.000đ 4 tháng, giúp bạn tối ưu chi phí.</motion.p>
                        <motion.button
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0, transition: {
                           type: 'spring',
                           duration: 1.25,
                           delay: 0.5
                        }}}
                        viewport={{ once: true, amount: 0.25}}
                        whileTap={{scale: 1.3}} className='my-5 py-[8px] px-[20px] rounded-[5px] bg-black text-white cursor-pointer text-[1rem]'>
                            <Link to='shop'>Mua ngay!</Link>
                        </motion.button>
                    </Col>
                    <Col lg='6' md='6'>
                        <motion.img 
                        initial={{opacity: 0, y: 50}}
                         whileInView={{opacity: 1, y: 0, transition: {
                            type: 'spring',
                            duration: 1.25,
                            delay: 0.5
                         }}}
                         viewport={{ once: true, amount: 0.25}}
                           className='scale-110 max-[768px]:scale-100' src={heroImg} alt='heroimg'/>
                    </Col>
                </Row>
            </Container>
        </section>
        
        {/* Trending products */}
        <section>
            <Container>
                <Row>
                    <Col lg='12'>
                        <h2 className='text-center text-black font-medium mb-8'>Sản phẩm bán chạy nhất</h2>
                    </Col>
                    <ProductsList data = {trendingProducts}/>
                </Row>
            </Container>
        </section>
        {/* Sản phẩm nổi bật */}
        <section>
            <Container>
                <Row>
                    <Col lg='12'>
                        <h2 className='text-center text-black font-medium mb-8'>Sản phẩm nổi bật</h2>
                    </Col>
                    <ProductsList data = {bestSaleProducts}/>
                </Row>
            </Container>
        </section>
        <section className='bg-black mt-8'>
                <Services/>
        </section>
    </Helmet>
}

export default Home