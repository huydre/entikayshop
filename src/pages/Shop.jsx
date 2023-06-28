import React, {useEffect, useState} from 'react';
import CommonSection from '../components/UI/CommonSection';
import Helmet from '../components/Helmet/Helmet';
import { Container,Row ,Col } from 'reactstrap';
import ProductsList from '../components/UI/ProductsList';
import useGetData from '../custom-hooks/useGetData';
import { useNavigate } from 'react-router-dom';


const Shop = () => {

    const navigate = useNavigate();

    const filterSelect = 'cursor-pointer rounded-lg bg-[#F6F6F6] px-4 py-2.5 focus:outline-0 max-[768px]:w-full max-[768px]:mb-4';
    const filterOption = 'text-sm shadow block px-4 py-2 hover:bg-gray-100';

    const {data: products} = useGetData('products')

    const [productsData,setProductsData] = useState([]);
    
    useEffect(() => {
        setProductsData(products);
    },[products])


    const handleFilter = (e) => {
        const filterValue = e.target.value;
        if (filterValue === 'entertainment') {
            const filteredProducts = products.filter(
                (item) => item.category === 'entertainment'
            );
            setProductsData(filteredProducts)
        }
        if (filterValue === 'work') {
            const filteredProducts = products.filter(
                (item) => item.category === 'work'
            );
            setProductsData(filteredProducts)
        }
        if (filterValue === 'learn') {
            const filteredProducts = products.filter(
                (item) => item.category === 'learn'
            );
            setProductsData(filteredProducts)
        }
        if (filterValue === 'other') {
            const filteredProducts = products.filter(
                (item) => item.category === 'other'
            );
            setProductsData(filteredProducts)
        }
        if (filterValue === 'all') {
           navigate(0);
        }
    }

    const handleSort = (e) => {
        const sortValue = e.target.value;
        let sortedProducts;
      
        if (sortValue === "ascending") {
          sortedProducts = [...productsData].sort((a, b) => a.price - b.price);
        }
        if (sortValue === "descending") {
          sortedProducts = [...productsData].sort((a, b) => b.price - a.price);
        }
        if (sortValue === "default") {
            navigate(0);
        }
      
        setProductsData(sortedProducts);
      };

    const handleSearch = e => {
        const searchTerm = e.target.value;
        const searchedProducts = products.filter(
            (item) => item.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setProductsData(searchedProducts)
    }

    console.log(productsData);
    return (
        <Helmet title='Shop'>
            <CommonSection title='Products'/>

            <section>
                <Container>
                    <Row>
                        <Col lg='3' md='6' className='max-[768px]:mb-7 max-[768px]:text-sm'>
                            {/* Filter widget */}
                            <div>
                                <select onChange={handleFilter} className={filterSelect}>
                                    <option className={filterOption} value='all' >Lọc theo danh mục</option>
                                    <option className={filterOption} value="entertainment">Giải trí</option>
                                    <option className={filterOption} value="work">Làm việc</option>
                                    <option className={filterOption} value="learn">Học tập</option>
                                    <option className={filterOption} value="other">Khác</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg='3' md='6' className='max-[768px]:text-end max-[768px]:text-sm'>
                            <div>
                                <select className={filterSelect} onChange={handleSort}>
                                    <option value="default" className={filterOption}>Sắp xếp theo</option>
                                    <option className={filterOption} value="ascending">Giá từ thấp đến cao</option>
                                    <option className={filterOption} value="descending">Giá từ cao đến thấp</option>
                                </select>
                            </div>
                        </Col>
                        <Col lg='6' md='12' className='max-[768px]:text-sm'>
                        {/* Search box */}
                        <div class="relative w-full">
                            <input onChange={handleSearch} type="search" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-l-gray-50 border-l-2 border border-gray-600 focus:outline-0" placeholder="Bạn cần tìm gì?" required></input>
                            <button type="submit" class="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-gray-600 rounded-r-lg border border-gray-600 hover:bg-gray-800">
                                <svg aria-hidden="true" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                <span class="sr-only">Search</span>
                            </button>
                        </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section>
                <Container>
                    <Row>
                        {
                            productsData.length === 0 ? <h1 className='text-center text-lg'>Không có sản phầm phù hợp!</h1> 
                            : <ProductsList data={productsData}/>
                        }
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default Shop