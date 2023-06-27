import React, {useEffect, useState} from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Button } from '@nextui-org/react';
import ProductsList from '../components/UI/ProductsList';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { db } from '../firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import useGetData from '../custom-hooks/useGetData';
import { useNavigate } from 'react-router-dom';


const ProductDetails = () => {
    const navigate = useNavigate();
    const {data: products} = useGetData('products')

    const [product, setProduct] = useState({})
    const dispatch = useDispatch();
    const {id} = useParams()
    const {imgUrl, productName, price, 
        // avgrating, reviews, 
        description, shortDesc, category } = product;
    const [tab,setTab] = useState('desc');
    const relatedProduct = products.filter(item => item.category === category);

    const docRef = doc(db,'products',id)

    useEffect(() => {
        const getProduct = async() => {
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setProduct(docSnap.data())
            }
            else {
                console.log("Product not found!")
            }
        }
        getProduct()
    },[id])


    const addToCart = () => {
        dispatch(cartActions.addItem({
            id,
            imgUrl: imgUrl,
            productName,
            price,
        }));
        toast.success('Product added succesfully!')
    };

    useEffect(() => {
        window.scrollTo(0,0);
    },[product]);

    
    
    let paragraph = null;
    let paragraphs = null;
    if (description) {
        paragraph = description.split("\n");

        const filteredSentences = paragraph.map((sentence) => sentence.trim()) // Loại bỏ khoảng trắng dư thừa
        .filter((sentence) => sentence !== ""); // Loại bỏ các câu trống

        paragraphs = filteredSentences.map((sentence, index) => (
            <p className='py-1' key={index}>{sentence}</p>
        ));
    }
    

    return (
        <Helmet title={productName}>

            <section className='pt-0'>
                <Container>
                    <Row className='pt-4'>
                        <Col lg='6' className='mt-5'>
                            <img className='rounded-xl scale-90' src={imgUrl} alt="" />
                        </Col>
                        <Col lg='6' className='space-y-3'>
                            <div className='mt-5'>
                                <h2 className='text-[1.8rem] font-semibold'>{productName}</h2>
                            </div>
                            <div className='flex space-x-2 font-medium'>
                                <div>Tình trạng: </div>
                                <div className='text-green-500'>Còn hàng</div>
                            </div>
                            <div className='flex space-x-2 font-medium'>
                                <div>Danh mục:</div>
                                <div>{category}</div>
                            </div>
                            <div className='text-xl font-semibold'>{Number(price).toLocaleString("en")}đ</div>
                            <div className='flex items-center space-x-2'>
                                <div className='line-through font-semibold text-gray-400'>{Number(price*2).toLocaleString("en")}đ</div>
                                <div className='font-semibold bg-red-500 text-white p-1 rounded-md text-sm'>-50%</div>
                            </div>
                            <p>{shortDesc}</p>
                            <div className='flex space-x-4'>
                                <Button className='bg-black' auto iconRight={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                </svg>
                                }>Mua ngay</Button>
                                <Button onClick={addToCart} ghost className='text-black border-0 ring-black ring-1 hover:bg-transparent focus:bg-gray-100' auto iconRight={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                                }>Thêm vào giỏ</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section>
                <Container>
                    <Row>
                        <Col>
                        <div className='items-center flex flex-row space-x-4 font-medium cursor-pointer'>
                            <h6 onClick={() => {setTab('desc')}} className={`${tab === 'desc' ? 'font-semibold' : ''}`}>Chi tiết sản phẩm</h6>
                            <h6 onClick={() => {setTab('rev')}} className={`${tab === 'rev' ? 'font-semibold' : ''}`}>Đánh giá </h6>
                        </div>

                        {tab === 'desc' ? 
                            <div className='mt-5 leading-7'>
                                {paragraphs}
                            </div>:
                            <pre className='mt-5 font-semibold text-red-500'>
                                Đang cập nhật bình luận bằng Facebook!
                            </pre>
                        }

                        </Col>
                        <Col lg='12' className='mt-5'>
                            <h2 className='text-[1.2rem] font-semibold mb-4'>Sản phẩm liên quan</h2>
                        </Col>
                        <ProductsList data={relatedProduct}/>
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default ProductDetails