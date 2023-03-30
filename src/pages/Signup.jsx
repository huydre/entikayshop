import React, {useState} from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Input, useInput } from '@nextui-org/react';
import loginWoman from '../assets/images/login-woman.png';
import bgLight from '../assets/images/light-bg.png';
import { setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import {auth} from '../firebase.config'
import { storage } from '../firebase.config';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { async } from '@firebase/util';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate();

    const [username,setUsername] = useState("");
    const [phonenumber,setPhonenumber] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const signups = async(e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            const user = userCredential.user;

            const storageRef = ref(storage, `images/${Date.now() + username}`)
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on((error) => {
                toast.error(error.message)
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadUrl) => {
                    //update user profile
                    await updateProfile(user, {
                        displayName: username,
                        photoURL: downloadUrl,
                    });
                    // store user data in firestore database
                    await setDoc(doc(db,"users",user.uid), {
                        uid: user.uid,
                        displayName: username,
                        email,
                        photoURL: downloadUrl,
                    });
                });
            });

            setLoading(false);
            toast.success("Tạo tài khoản thành công!");
            navigate('/login');

        } catch (error) {
            setLoading(false);
            toast.error('Đăng kí thất bại!')
        }

    }

    return (
        <Helmet title='Signup'>
            <Container>
                {
                    loading ? 
                    <Row>
                        <Col><h5 className='text-center font-bold'>Loading....</h5></Col>
                    </Row> :
                    <Row className='h-screen'>
                    <Col lg='8' className='relative'>
                        <img className='absolute scale-90 -translate-y-8 blur-2xl' src={bgLight} alt=''/>
                        <img className='absolute bg-contain scale-[0.7] -translate-y-8' src={loginWoman} alt=''/>
                        
                    </Col>
                        <Col lg='4' className='mt-24 space-y-10 px-3 '>

                            <h3 className='font-bold text-xl leading-8'>Chúng tôi rất vui vì bạn đã chọn Entikay Shop!</h3>
                            <Form className='space-y-6' onSubmit={signups}>
                                <FormGroup >
                                    <Input label='Tên tài khoản' aria-label='username' onChange={(e)=> {setUsername(e.target.value)}} fullWidth clearable value={username}  placeholder='Nhập tên tài khoản'/>
                                </FormGroup>
                                <FormGroup >
                                    <Input label='Số điện thoại' aria-label='phonenumber' onChange={(e)=> {setPhonenumber(e.target.value)}} fullWidth clearable value={phonenumber}  placeholder='Nhập số điện thoại'/>
                                </FormGroup>
                                <FormGroup >
                                    <Input label='Email' aria-label='email' onChange={(e)=> {setEmail(e.target.value)}} fullWidth clearable  type='email' value={email}  placeholder='Nhập email của bạn'/>
                                </FormGroup>
                                <FormGroup>
                                    <Input.Password label='Mật khẩu' value={password} onChange={(e) => {setPassword(e.target.value)}} aria-label='password' fullWidth clearable type='password'  placeholder='Mật khẩu'/>
                                </FormGroup>
                                <input type='file' onChange={(e) => {setFile(e.target.files[0])}}/>
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