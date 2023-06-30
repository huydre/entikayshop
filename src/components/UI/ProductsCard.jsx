import React from 'react';
import { motion } from 'framer-motion';
import { Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProductsCard = ({item}) => {


    const navigate = useNavigate();
    return (
        <Col lg='3' md='4' className='flex justify-center '>
            {/* Products items */}
            <div className='cursor-pointer mb-2 max-w-[300px]'>
                {/* Products img */}
                <div>
                    <motion.img
                     onClick={()=>navigate
                    (`/shop/${item.id}`)} whileHover={{scale: 0.9}} className='rounded-xl bg-cover h-[136px] w-[287px] w-full' src={item.imgUrl} alt ='' />
                </div>
                <div class='p-2'>
                    <h3 className='text-md font-medium mt-[15px] hover:text-inherit'><div onClick={()=> {navigate(`/shop/${item.id}`)}}>{item.productName}</div></h3>
                </div>
                {/* product card bottom */}
                <div className='flex items-center space-x-2 p-2'>
                    <span class='text-lg font-semibold'>{Number(item.price).toLocaleString("en")}đ</span>
                    {/* <motion.span whileTap={{scale: 1.2}} onClick={addToCart} className='p-2 bg-black text-white rounded-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    </motion.span> */}
                    <div className='flex items-center space-x-2'>
                        <div className='line-through font-semibold text-gray-400 text-sm'>{Number(item.price*2).toLocaleString("en")}đ</div>
                        <div className='font-semibold bg-red-500 text-white p-1 rounded-md text-xs'>-50%</div>
                    </div>
                </div>
            </div>
        </Col>
    )
}

export default ProductsCard