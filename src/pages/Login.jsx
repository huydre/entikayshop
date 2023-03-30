import React, {useState} from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button, Input, useInput } from '@nextui-org/react';
import loginWoman from '../assets/images/login-woman.png';
import bgLight from '../assets/images/light-bg.png'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const singIn = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            const user = userCredential.user

            console.log(user)
            setLoading(false)
            toast.success('Đăng nhập thành công!')
            navigate('/home')

        } catch (error) {
            setLoading(false)
            toast.error(error.message)
        }
    }

    return (
        <Helmet title='Login'>
            <Container>
                { loading ?
                <Row>
                    <Col><h5>Loading....</h5></Col>
                </Row> :
                <Row className='h-screen'>
                    <Col lg='8' className='relative'>
                        <img className='absolute scale-90 -translate-y-8 blur-2xl' src={bgLight} alt=''/>
                        <img className='absolute bg-contain scale-[0.7] -translate-y-8' src={loginWoman} alt=''/>
                        
                    </Col>
                        <Col lg='4' className='mt-24 space-y-10 px-3 '>

                            <h3 className='font-bold text-xl'>Đăng nhập</h3>
                            <p className='text-sm pb-6'>Đăng nhập đê theo dõi đơn hàng, lưu danh sách sản phẩm ưu đãi và nhận nhiều ưu đãi hấp dẫn</p>
                            <Form className='space-y-10' onSubmit={singIn}>
                                <FormGroup >
                                    <Input aria-label='email' onChange={(e)=> {setEmail(e.target.value)}} fullWidth clearable type='email' value={email}  placeholder='Email của bạn'/>
                                </FormGroup>
                                <FormGroup>
                                    <Input.Password value={password} onChange={(e) => {setPassword(e.target.value)}} aria-label='password' fullWidth clearable color='warning' type='password'  placeholder='Mật khẩu'/>
                                </FormGroup>
                                <div>
                                <button type='submit' className='bg-black text-sm py-3 shadow-lg rounded-lg w-full text-white font-semibold'>Đăng nhập</button>
                                </div>
                                <p className='text-sm'>Bạn chưa có tài khoản? <Link to='/signup'>Đăng kí ngay</Link></p>
                            </Form>
                        </Col>
                    
                </Row>
                }
            </Container>
        </Helmet>
    )
}

export default Login