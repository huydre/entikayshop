import React, {useEffect, useRef, useState} from 'react'
import { Form, FormGroup, Container,Row, Col } from 'reactstrap'
import { Input, Textarea } from '@nextui-org/react'
import { toast } from 'react-toastify'
import { db, storage } from '../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, getDoc, setDoc, doc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'


const EditProduct = () => {
    const {id} = useParams()
  const [product, setProduct] = useState(
    {
      productName: '',
      shortDesc: '',
      description: '',
      price: '',
      category: '',
      imgUrl: null
    }
  )

    const [loading,setLoading] = useState(false)
    
  const docRef = doc(db,'products',id)

  useEffect(() => {
    const getProduct = async() => {
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            const data = docSnap.data()
            setProduct({
              productName: data.productName,
              shortDesc: data.shortDesc,
              description: data.description,
              price: data.price,
              category: data.category,
              imgUrl: data.imgUrl
            }
            )            
        }
        else {
            console.log("Product not found!")
        }
    }
    getProduct()
},[])

const saveChange = async(e) => {
  e.preventDefault()
  try {
    await setDoc(doc(db,'products',id),{
      productName: product.productName,
      shortDesc: product.shortDesc,
      description: product.description,
      price: product.price,
      category: product.category,
      imgUrl: product.imgUrl
    })
    toast.success('Chỉnh sửa thông tin sản phẩm thành công!')
    
  } catch (err) { 
    toast.error(err.message)
  }
}

  return (
    <section>
      <Container>
        { loading ?
        <Row>
          <Col><h6>Loading...</h6></Col>
        </Row>
        :
        <Row>
          <Col lg='12'>
            <h4 className='text-center font-semibold text-lg '>Chỉnh sửa sản phẩm</h4>

            <Form className='space-y-2' onSubmit={saveChange}>
              <FormGroup>
                <Input required value={product.productName} onChange={(e) => {setProduct((oldState)=>{return{...oldState, productName: e.target.value}})}} fullWidth label='Tên sản phẩm' type='text' placeholder='Tên sản phẩm' />
              </FormGroup>
              <FormGroup>
                <Input required value={product.shortDesc} onChange={(e) => {setProduct((oldState)=>{return{...oldState, shortDesc: e.target.value}})}} fullWidth label='Mô tả ngắn gọn' type='text' placeholder='Nhập mô tả ngắn gọn' />
              </FormGroup>
              <FormGroup>
                <Textarea minRows='6' value={product.description} onChange={(e) => {setProduct((oldState)=>{return{...oldState, description: e.target.value}})}} fullWidth label='Mô tả chi tiết' type='text' placeholder='Nhập mô tả' />
              </FormGroup>

              <div className='flex space-x-12 items-center'>
                <FormGroup className='w-1/2'>
                  <Input required value={product.price} onChange={(e) => {setProduct((oldState)=>{return{...oldState, price: e.target.value}})}} fullWidth label='Giá sản phẩm' type='number' placeholder='100.000' />
                </FormGroup>
                <FormGroup className='w-1/2 flex flex-col space-y-2'>
                  <span className='text-sm text-black'>Chọn danh mục</span>
                  <select required value={product.category} onChange={(e) => {setProduct((oldState)=>{return{...oldState, category: e.target.value}})}} className='bg-gray-100 rounded-xl h-10'>
                    <option>Chọn danh mục sản phẩm</option>
                    <option value='entertainment' >Giải trí</option>
                    <option value='work' >Làm việc</option>
                    <option value='learn' >Học tập</option>
                    <option value='other' >Khác</option>
                  </select>
                </FormGroup>
              </div>

              <div>
              <FormGroup className='flex flex-col space-y-2'>
                  <span className='text-sm'>Thêm hình ảnh sản phẩm</span>
                  <input type='file'/>
                </FormGroup>
              </div>
              <div className='pt-3'>
                <button type='submit' className='bg-black text-sm py-3 shadow-lg rounded-lg px-4 text-white font-semibold focus:bg-slate-400'>Xác nhận</button>
              </div>
            </Form>
          </Col>
        </Row>
        }
      </Container>
    </section>
  )
}

export default EditProduct