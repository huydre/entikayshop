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
import lightBanner from '../assets/images/light-banner.png'
import overlayBG from '../assets/images/overlay_bg.png'

const Home = () => {
    const navigate = useNavigate();
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
        <section>
            <Container className='bg-[#0D81FE] rounded-3xl p-8 relative'>
            <img className='absolute mix-blend-color-dodge	' src={overlayBG} alt='' />
                <Row>
                    <Col lg='6' md='6'>
                        {/* <motion.div
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0, transition: {
                           type: 'spring',
                           duration: 1.25,
                           delay: 0.5
                        }}}
                        viewport={{ once: true, amount: 0.25}}
                        >
                            <p className='text-black font-semibold bg-white rounded-2xl py-1 px-2 w-[13rem] text-center'>Sản phẩm nổi bật {year}</p>
                        </motion.div> */}
                        <motion.h2
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0, transition: {
                           type: 'spring',
                           duration: 1.25,
                           delay: 0.5
                        }}}
                        viewport={{ once: true, amount: 0.25}}
                        className='pl-8 pt-16 text-white text-[4rem] font-bold max-[992px]:text-[3rem] max-[768px]:text-[1.rem]'>Spotify</motion.h2>
                        <motion.h2
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0, transition: {
                           type: 'spring',
                           duration: 1.25,
                           delay: 0.5
                        }}}
                        viewport={{ once: true, amount: 0.25}}
                        className='text-white pl-8 font-bold max-[768px]:text-[1rem]'>Nghe nhạc thả ga <br></br> không lo về phí</motion.h2>
                        <motion.button
                        onClick={()=> navigate('/shop')}
                        initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0, transition: {
                           type: 'spring',
                           duration: 1.25,
                           delay: 0.5
                        }}}
                        viewport={{ once: true, amount: 0.25}}
                        whileHover={{scale: 1.2}} className='shadow-md my-6 ml-8 py-2 px-4 rounded-[15px] bg-[#F6AB3B] font-bold text-white cursor-pointer text-md hover:text-white'>Mua ngay
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
                           className=' max-[768px]:scale-100' src={heroImg} alt='heroimg'/>
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

        <section className='p-0'>
            <img src={lightBanner} alt=''  className='scale-[2] lg:scale-150 xl:scale-100'/>
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