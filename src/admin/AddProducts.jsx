import React, {useEffect, useRef, useState} from 'react'
import { Form, FormGroup, Container,Row, Col } from 'reactstrap'
import { Input, Textarea } from '@nextui-org/react'
import { toast } from 'react-toastify'
import { db, storage } from '../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'


const AddProducts = () => {

  const navigate = useNavigate()

  const [enterTitle, setEnterTitle] = useState('');
  const [enterShortDesc, setEnterShortDesc] = useState('');
  const [enterDescription, setEnterDescription] = useState('');
  const [enterCategory, setEnterCategory] = useState('');
  const [enterPrice, setEnterPrice] = useState('');
  const [enterProductImg, setEnterProductImg] = useState(null);
  const [loading, setLoading] = useState(false);


  const addProduct = async(e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const docRef =  await collection(db,'products')
      const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`)

      const uploadTask = uploadBytesResumable(storageRef, enterProductImg)

      uploadTask.on(()=> {
        toast.error('Không thể upload hình ảnh!')
      }, ()=> {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          await addDoc(docRef, {
            productName: enterTitle,
            shortDesc: enterShortDesc,
            description: enterDescription,
            category: enterCategory,
            price: enterPrice,
            imgUrl: downloadURL
          } )
        })
      })
      setLoading(false)
      toast.success('Thêm sản phẩm thành công')
      navigate('/dashboard/all-products')
    } catch (err) {
        setLoading(false)
        toast.error("Không thể thêm san phẩm này!")
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
            <h4 className='text-center font-semibold text-lg py-8'>Thêm sản phẩm</h4>

            <Form className='space-y-2' onSubmit={addProduct}>
              <FormGroup>
                <Input required value={enterTitle} onChange={(e) => {setEnterTitle(e.target.value)}} fullWidth label='Nhập tên sản phẩm' type='text' placeholder='Nhập tên sản phẩm' />
              </FormGroup>
              <FormGroup>
                <Input required value={enterShortDesc} onChange={(e) => {setEnterShortDesc(e.target.value)}} fullWidth label='Mô tả ngắn gọn' type='text' placeholder='Nhập mô tả ngắn gọn' />
              </FormGroup>
              <FormGroup>
                <Textarea onChange={(e) => {setEnterDescription(e.target.value)}} fullWidth label='Mô tả chi tiết' type='text' placeholder='Nhập mô tả' />
              </FormGroup>

              <div className='flex space-x-12 items-center'>
                <FormGroup className='w-1/2'>
                  <Input required value={enterPrice} onChange={(e) => {setEnterPrice(e.target.value)}} fullWidth label='Giá sản phẩm' type='number' placeholder='100.000' />
                </FormGroup>
                <FormGroup className='w-1/2 flex flex-col space-y-2'>
                  <span className='text-sm text-black'>Chọn danh mục</span>
                  <select required value={enterCategory} onChange={(e) => {setEnterCategory(e.target.value)}} className='bg-gray-100 rounded-xl h-10'>
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
                  <input required type='file' onChange={(e) => {setEnterProductImg(e.target.files[0])}}/>
                </FormGroup>
              </div>
              <div className='pt-3'>
                <button type='submit' className='bg-black text-sm py-3 shadow-lg rounded-lg px-4 text-white font-semibold focus:bg-slate-400'>Thêm sản phẩm</button>
              </div>
            </Form>
          </Col>
        </Row>
        }
      </Container>
    </section>
  )
}

export default AddProducts