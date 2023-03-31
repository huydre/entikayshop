import React, {useEffect, useRef, useState} from 'react'
import { Form, FormGroup, Container,Row, Col, DropdownMenu } from 'reactstrap'
import { Dropdown, Input, Radio, Textarea } from '@nextui-org/react'
import { toast } from 'react-toastify'
import { db, storage } from '../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, addDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const AddProducts = () => {

  const navigate = useNavigate()

  const [enterTitle, setEnterTitle] = useState('');
  const [enterShortDesc, setEnterShortDesc] = useState('');
  const [enterDescription, setEnterDescription] = useState('');
  const [enterCategory, setEnterCategory] = useState(new Set(['entertainment']));
  const [enterPrice, setEnterPrice] = useState('');
  const [enterProductImg, setEnterProductImg] = useState();
  const [enterStatus, setEnterStatus] = useState('stock');
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    return () => {
      enterProductImg && URL.revokeObjectURL(enterProductImg.preview)
    }
  },[enterProductImg])

  const handleUploadFile = (e) => {
    const file = e.target.files[0]
    file.preview = URL.createObjectURL(file)
    setEnterProductImg(file)
  }

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
            category: enterCategory.currentKey,
            price: enterPrice,
            imgUrl: downloadURL,
            status: enterStatus,
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
        <Form className='space-y-2' onSubmit={addProduct}>
        <Row>
          <h4 className='font-bold text-xl py-8'>Thêm sản phẩm</h4>
          <Col lg='6'>
            
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
                  {/* <select required value={enterCategory} onChange={(e) => {setEnterCategory(e.target.value)}} className='bg-gray-100 rounded-xl h-10'>
                    <option>Chọn danh mục sản phẩm</option>
                    <option value='entertainment' >Giải trí</option>
                    <option value='work' >Làm việc</option>
                    <option value='learn' >Học tập</option>
                    <option value='other' >Khác</option>
                  </select> */}
                  <Dropdown>
                    <Dropdown.Button>{enterCategory}</Dropdown.Button>
                    <Dropdown.Menu selectionMode="single" selectedKeys={enterCategory} disallowEmptySelection aria-label='' onSelectionChange={setEnterCategory}>
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
                  !enterProductImg ?
                  <div>
                    <div className='text-center align-middle text-sm text-gray-500'>Tải lên hình ảnh sản phẩm của bạn.</div>
                    <div className='text-center align-middle text-xs text-gray-400'>Chỉ chấp nhận ảnh có định dạng .jpeg .jpg .png .webp .svg.</div>
                  </div>
                  :
                  <div>
                    <img src={enterProductImg.preview} alt=''  />
                  </div>
                }
              </motion.div>
              <FormGroup className='flex flex-col space-y-2'>
                <input hidden className='input-field' accept='.jpeg, .jpg, .png, .webp, .svg' required type='file' onChange={handleUploadFile}/>
              </FormGroup>
              <div>
                <Radio.Group onChange={(e)=>{setEnterStatus(e)}} label='Tình trạng:' defaultValue='stock'>
                  <Radio size='sm' value='stock' >Còn hàng</Radio>
                  <Radio size='sm' value='out-stock' >Hết hàng</Radio>
                </Radio.Group>
              </div>
            </div>
          </Col>
        </Row>
        <div className='pt-3'>
                <button type='submit' className='bg-black text-sgm py-3 shadow-lg rounded-lg px-4 text-white font-semibold focus:bg-slate-400'>Thêm sản phẩm</button>
              </div>
        </Form>
        }
      </Container>
    </section>
  )
}

export default AddProducts