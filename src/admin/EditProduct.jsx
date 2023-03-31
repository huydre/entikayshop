import React, {useEffect, useRef, useState} from 'react'
import { Form, FormGroup, Container,Row, Col } from 'reactstrap'
import { Input, Textarea, Dropdown, Radio } from '@nextui-org/react'
import { toast } from 'react-toastify'
import { db, storage } from '../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, getDoc, setDoc, doc } from 'firebase/firestore'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

const EditProduct = () => {
    const {id} = useParams()
  const [product, setProduct] = useState(
    {
      productName: '',
      shortDesc: '',
      description: '',
      price: '',
      category: '',
      status: '',
      imgUrl: null
    }
  )

  useEffect(()=> {
    return () => {
      product.imgUrl && URL.revokeObjectURL(product.imgUrl.preview)
    }
  },[product.imgUrl])

  const handleUploadFile = (e) => {
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file)
    setProduct((oldState)=>{return{...oldState, imgUrl: file}})
  }

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
              // category: data.category,
              category: data.category,
              status: data.status,
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

    const storageRef = ref(storage, `productImages/${Date.now() + product.imgUrl.name}`)
    const uploadTask = uploadBytesResumable(storageRef, product.imgUrl)

    uploadTask.on(()=>{
      toast.error('Không thể upload hình ảnh!')
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        await setDoc(doc(db,'products',id),{
          productName: product.productName,
          shortDesc: product.shortDesc,
          description: product.description,
          price: product.price,
          category:  product.category.currentKey ? product.category.currentKey : product.category ,
          status: product.status,
          imgUrl: downloadURL
        })
      })
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
        <Form className='space-y-2' onSubmit={saveChange}>
        <Row>
          <h4 className='font-bold text-xl py-8'>Chỉnh sửa thông tin sản phẩm</h4>
          <Col lg='6'>
            
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
                  {/* <select required value={enterCategory} onChange={(e) => {setEnterCategory(e.target.value)}} className='bg-gray-100 rounded-xl h-10'>
                    <option>Chọn danh mục sản phẩm</option>
                    <option value='entertainment' >Giải trí</option>
                    <option value='work' >Làm việc</option>
                    <option value='learn' >Học tập</option>
                    <option value='other' >Khác</option>
                  </select> */}
                  <Dropdown>
                    <Dropdown.Button>{product.category}</Dropdown.Button>
                    <Dropdown.Menu selectionMode="single" selectedKeys={product.category} disallowEmptySelection aria-label='' onSelectionChange={(e) => {setProduct((oldState)=>{return{...oldState, category: e}})}}>
                      <Dropdown.Item key='entertainment' >Giải trí</Dropdown.Item>
                      <Dropdown.Item key='work' >Làm việc</Dropdown.Item>
                      <Dropdown.Item key='learn' >Học tập</Dropdown.Item>
                      <Dropdown.Item key='other' >Khác</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </FormGroup>
              </div>
          </Col>
          <Col lg='6' className='flex justify-start md:justify-center'>
            <div className='flex flex-col space-y-2'>
              <span className='text-md font-semibold mb-4'>Thêm hình ảnh sản phẩm</span>
              <motion.div onClick={()=>{document.querySelector(".input-field").click()}} whileHover={{scale: 1.1}} className='flex items-center h-[17rem] w-[17rem] bg-white outline-dashed outline-[3px] outline-offset-2 outline-gray-300 rounded-lg'>
                {
                  !product.imgUrl ?
                  <div>
                    <div className='text-center align-middle text-sm text-gray-500'>Tải lên hình ảnh sản phẩm của bạn.</div>
                    <div className='text-center align-middle text-xs text-gray-400'>Chỉ chấp nhận ảnh có định dạng .jpeg .jpg .png .webp .svg.</div>
                  </div>
                  :
                  <div>
                    <img src={!product.imgUrl.preview ? product.imgUrl : product.imgUrl.preview} alt=''  />
                  </div>
                }
              </motion.div>
              <FormGroup className='flex flex-col space-y-2'>
                <input hidden className='input-field' accept='.jpeg, .jpg, .png, .webp, .svg' type='file' onChange={handleUploadFile}/>
              </FormGroup>
              <div>
                <Radio.Group onChange={(e) => {setProduct((oldState)=>{return{...oldState, status: e}})}} label='Tình trạng:' value={product.status}>
                  <Radio size='sm' value='stock' >Còn hàng</Radio>
                  <Radio size='sm' value='out-stock' >Hết hàng</Radio>
                </Radio.Group>
              </div>
            </div>
          </Col>
        </Row>
        <div className='pt-3'>
                <button type='submit' className='bg-black text-sgm py-3 shadow-lg rounded-lg px-4 text-white font-semibold focus:bg-slate-400'>Xác nhận</button>
              </div>
        </Form>
        }
      </Container>
    </section>
  )
}

export default EditProduct