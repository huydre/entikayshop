import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Button, Input, Radio, Tooltip } from '@nextui-org/react'
import useAuth from '../custom-hooks/useAuth'

const UserInfomation = () => {

    const {currentUser} = useAuth()



    console.log(currentUser)
  return (
    <div>
        <Container className='space-y-3'>
            <Row>
                    <Col lg='6' className='p-4 space-y-4'>
                        <h3 className='text-xl font-semibold md:mt-5'>Thông tin cá nhân</h3>
                        <div className='text-sm text-gray-400 font-medium'>Bây giờ bạn có thể tự chỉnh sửa thông tin cá nhân.<br/> Thông tin cá nhân có thể mất một vài phút để cập nhật</div>

                        <div className='my-4 bg-slate-200 h-[0.5px]' />

                        <div className='md:text-sm text-xs flex justify-between'>
                            <div>
                                <div>Tên đăng nhập:</div>
                                <div className='font-semibold'>{currentUser.displayName}</div>
                            </div>
                            <div>
                                <div>Email:</div>
                                <div className='font-semibold'>{currentUser.email}</div>
                            </div>
                            <div>
                                <div>Ngày tham gia:</div>
                                <div className='font-semibold'>01-04-2023</div>
                            </div>
                        </div>

                        <div className='my-4 bg-slate-200 h-[0.5px]' />


                        <div className='space-y-10'>
                            <div>
                                <Input fullWidth clearable label='Họ và tên'/>
                            </div>
                            <div>
                                <Input fullWidth clearable type='number' label='Số điện thoại'/>
                            </div>
                            <div>
                                <Input fullWidth clearable type='number' label='Chứng minh nhân dân'/>
                            </div>
                        </div>
                    </Col>
                    <Col lg='6'  className='p-4 space-y-4' >
                        <div className='text-md font-semibold text-gray-500 md:mt-5'>Ảnh đại diện</div>
                        
                        <div className='flex justify-center pt-6'>
                            <Tooltip content='Chọn hình ảnh đại diện khác' color='invert'>
                                <div onClick={()=>{document.querySelector(".input-field").click()}} className='bg-gray-200 h-[15rem] w-[15rem] rounded-full relative overflow-hidden ring-offset-2 ring-2'>
                                    <img className='object-contain' src={currentUser.photoURL} alt=''></img>
                                </div>
                                <input hidden className='input-field' accept='.jpeg, .jpg, .png, .webp, .svg' type='file'/>
                            </Tooltip>
                        </div>
                        <div className='space-y-4 pt-6'>
                            <div className='font-semibold'>Giới tính của bạn</div>
                            <div>
                                <Radio.Group orientation="horizontal" size='sm'>
                                    <Radio className='font-medium' value='male' >Nam</Radio>
                                    <Radio className='font-medium' value='female' >Nữ</Radio>
                                    <Radio className='font-medium' value='non-binary' >Khác</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                    </Col>
                    <div className='flex justify-end mb-8'>
                        <Button  className='bg-black md:my-10' auto>Lưu thay đổi</Button>
                    </div>
            </Row>
        </Container>
    </div>
  )
}

export default UserInfomation