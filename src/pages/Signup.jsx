import React, {useState} from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Input, useInput } from '@nextui-org/react';
import loginWoman from '../assets/images/login-woman.png';
import bgLight from '../assets/images/light-bg.png';
import { setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from '../firebase.config'
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate();

    const [username,setUsername] = useState("");
    const [phonenumber,setPhonenumber] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const signups = async(e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            const user = userCredential.user;

            const PhotoURL = "https://firebasestorage.googleapis.com/v0/b/entikayshop.appspot.com/o/images%2FDefault_avt.jpg?alt=media&token=47263799-7bb7-49c4-809b-32aa5b8359cd";

            //update user profile
            await updateProfile(user, {
                displayName: username,
                photoURL: PhotoURL,
                phoneNumber: phonenumber,
            });

            // store user data in firestore database
            await setDoc(doc(db,"users",user.uid), {
                uid: user.uid,
                displayName: username,
                email,
                phonenumber,
                createdDate: Date.now(),
                photoURL: PhotoURL,
            });
            setLoading(false);
            toast.success("Tạo tài khoản thành công!");
            navigate('/home');

        } catch (error) {
            setLoading(false);
            toast.error('Đăng kí thất bại!')
        }
    }

    return (
        <Helmet title='Signup'>
            <Container className='min-h-[800px]'>
                {
                    loading ? 
                    <Row>
                        <Col><h5 className='text-center font-bold'>Loading....</h5></Col>
                    </Row> :
                    <Row className='h-screen'>
                    <Col lg='8' className='relative'>
                        <img className='absolute scale-90 -translate-y-8 blur-2xl' src={bgLight} alt=''/>
                        <img className='max-[990px]:hidden absolute bg-contain scale-[0.7] -translate-y-8' src={loginWoman} alt=''/>
                        
                    </Col>
                        <Col lg='4' className='mt-24 space-y-10 px-3 '>

                            <h3 className='font-bold text-xl leading-8'>Chúng tôi rất vui vì bạn đã chọn Entikay Shop!</h3>
                            <Form className='space-y-6' onSubmit={signups}>
                                <FormGroup >
                                    <Input label='Tên tài khoản' aria-label='username' onChange={(e)=> {setUsername(e.target.value)}} fullWidth clearable   placeholder='Nhập tên tài khoản'/>
                                </FormGroup>
                                <FormGroup >
                                    <Input label='Số điện thoại' aria-label='phonenumber' onChange={(e)=> {setPhonenumber(e.target.value)}} fullWidth clearable   placeholder='Nhập số điện thoại'/>
                                </FormGroup>
                                <FormGroup >
                                    <Input label='Email' aria-label='email' onChange={(e)=> {setEmail(e.target.value)}} fullWidth clearable  type='email' placeholder='Nhập email của bạn'/>
                                </FormGroup>
                                <FormGroup>
                                    <Input.Password label='Mật khẩu' onChange={(e) => {setPassword(e.target.value)}} aria-label='password' fullWidth clearable type='password'  placeholder='Mật khẩu'/>
                                </FormGroup>
                                <div>
                                    <button type='submit' className='bg-black text-sm py-3 shadow-lg rounded-lg w-full text-white font-semibold focus:bg-slate-400'>Đăng kí</button>
                                </div>
                                <p className='text-sm'>Bạn đã có tài khoản? <Link to='/login'>Đăng nhập ngay</Link></p>
                            </Form>
                        </Col>
                        
                    </Row>
                }
            </Container>
        </Helmet>
    )
}

export default Signup