import React from 'react';
import ProductsCard from './ProductsCard';
import { motion } from 'framer-motion';

const ProductsList = ({data}) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 50}}
            whileInView={{opacity: 1, y: 0, transition: {
                type: 'spring',
                duration: 1.25,
                elay: 1.1
            }}}
            viewport={{ once: true, amount: 0.25}}
        >
        {data.map((item, index) => (
            <ProductsCard item={item} key={index}/>
        ))}
        </motion.div>
    )
}

export default ProductsList