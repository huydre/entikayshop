import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../custom-hooks/useAuth';
import { Popover, Switch, User, Button, Avatar, Dropdown } from '@nextui-org/react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../../firebase.config'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { collection, getDoc, setDoc, doc } from 'firebase/firestore'
import { saveCartToFirestore } from '../../custom-hooks/firebaseUtils';
import { cartActions } from '../../redux/slices/cartSlice';

const nav__links = [
    {
        path: 'home',
        display: 'Trang chủ'
    },
    {
        path: 'shop',
        display: 'Tất cả sản phẩm'
    },
    {
        path: 'cart',
        display: 'Giỏ hàng'
    },
]

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const {currentUser} = useAuth()

    const [open,setOpen] = useState('false');

    const logout = () => {

        signOut(auth).then(() => {
            toast.success("Đăng xuất thành công")
            navigate('/')
            navigate(0)
        }).catch(err => {
            toast.error(err.message)
        })

    }

    const carts = useSelector(state => state.cart); // Lấy giỏ hàng từ redux

    useEffect(()=> {
        if (currentUser) saveCartToFirestore(currentUser.uid, carts)
    },[carts])

    useEffect(() => {
        const fetchCartFromFirestore = async () => {
          try {
            const cartSnapshot = await getDoc(doc(db, "carts", currentUser.uid));
            const cartData = cartSnapshot.exists() ? cartSnapshot.data() : null;

            // Cập nhật giỏ hàng trong Redux
            dispatch(cartActions.updateCart(cartData));
          } catch (error) {
            console.error('Failed to fetch cart data from Firestore:', error);
          }
        };
    
        fetchCartFromFirestore();
      }, [currentUser]);
    

    return (
        <div class='w-full  h-[70px] leading-[70px] sticky top-0 left-0 z-10 shadow-xl bg-white'>
            <div class='flex items-center justify-around pt-2 max-[768px]:justify-between max-[768px]:px-6'>
                {/* logo */}
                <div class='flex items-center gap-[8px] cursor-pointer'>
                    <div>
                        <h1 onClick={()=>{navigate('/')}} class='font-bold text-[1.2rem] text-[var(--primary-color)]'>Entikay</h1>
                    </div>
                {/* navigation */}
                </div>
                <div className='max-[768px]:fixed max-[768px]:top-0 max-[768px]:left-0 max-[768px]:w-full max-[768px]:h-full max-[768px]:bg-[rgb(0,0,0,0.53)] max-[768px]:z-20 max-[768px]:hidden' >
                    <ul className='flex items-center gap-[2.7rem] mb-0 max-[768px]:absolute max-[768px]:top-0 max-[768px]:right-0 max-[768px]:w-[250px] max-[768px]:h-full max-[768px]:bg-white max-[768px]:z-30 max-[768px]:flex-col max-[768px]:items-center max-[768px]:justify-center'>
                        {nav__links.map((item) => (
                            <li class='text-[var(--primary-color)] font-medium'>
                                <NavLink className={(navClass) => navClass.isActive ? 'font-bold' : ''} to={item.path}>{item.display}</NavLink>
                            </li>
                        ))}
                        
                    </ul>
                </div> 
                {/* nav icon */}
                <div class='flex items-center gap-[1.2rem]'>
                    
                    {/* cart icon */}
                    <span onClick={() => {navigate('/cart')}} class='cursor-pointer relative'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <span class='absolute w-4 h-4 flex items-center justify-center top-[50%] right-[0%] content-none rounded-[50px] text-white bg-[var(--primary-color)] text-[0.7rem] font-semibold z-10' >{totalQuantity}</span>
                    </span>
                    {/* profile */}
                    <div className='max-[768px]:hidden flex items-center'>
                        { currentUser ?
                        <Dropdown>
                            <Dropdown.Trigger>
                                <Avatar as='button' src = {currentUser ? currentUser.photoURL : ''} />
                            </Dropdown.Trigger>
                            {
                                currentUser ?
                                <Dropdown.Menu>
                                    <Dropdown.Item key='info'>
                                        <div onClick={()=> navigate(`/user-infomation/${currentUser.uid}`)} className='font-medium text-sm'>Thông tin tài khoản</div>
                                    </Dropdown.Item>
                                    <Dropdown.Item key='history' withDivider>
                                        <div className='font-medium text-sm'>Lịch sử đơn hàng</div>
                                    </Dropdown.Item>
                                    <Dropdown.Item key='logout' color='error' withDivider>
                                        <div onClick={logout} className='font-medium text-sm'>Đăng xuất</div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                                :
                                <Dropdown.Menu>
                                     <Dropdown.Item key='signup'>
                                        <div onClick={()=> navigate('/signup')} className='font-medium text-sm'>Đăng kí</div>
                                    </Dropdown.Item>
                                    <Dropdown.Item key='login' withDivider>
                                        <div onClick={()=> navigate('/login')} className='font-medium text-sm'>Đăng nhập</div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            }
                        </Dropdown>
                        :
                        <button onClick={()=> navigate('/login')} >Đăng nhập</button>
                        }
                    </div>
                    {/* mobile menu */}
                    <div className='hidden max-[768px]:block z-40'>
                        <span >
                            <div className='flex items-center justify-end border-l lg:border-l=0'>
                                <input type="checkbox" name="hamburger" id="hamburger" class="peer" hidden/>
                                <label for='hamburger' className='peer-checked:hamburger block relative z-20 p-6 -mr-6 cursor-pointer lg:hidden'>
                                    <div aria-hidden='true' className='m-auto h-0.5 w-6 rounded bg-black transition duration-300' />
                                    <div aria-hidden='true' className='m-auto mt-2 h-0.5 w-6 rounded bg-black transition duration-300' />
                                </label>

                                <div className='peer-checked:translate-x-0 flex flex-col fixed inset-0 w-[calc(100%-4rem)] translate-x-[-100%] transition duration-300 bg-white border-r shadow-xl lg:border-l-0 lg:w-auto lg:static lg:shadow-none lg:translate-x-0'>
                                    <div className='flex flex-col h-full lg:flex-row px-6 pt-32 md:px-12'>
                                        <div className='mb-4'>
                                            {
                                                currentUser ? 
                                                <div className='flex space-x-4 items-center'>
                                                    <Avatar size='xl' src={currentUser.photoURL} />
                                                    <div className='flex flex-col'>
                                                        <div className='font-bold text-lg'>{currentUser.displayName}</div>
                                                        <div className='text-sm'>{currentUser.email}</div>
                                                    </div>
                                                </div>
                                                :
                                                <div>
                                                     <div className='w-2/3'>
                                                        <button onClick={()=>{navigate('/login'); navigate(0)}} className='bg-black text-sm py-3 rounded-lg w-4/6 text-white font-semibold focus:bg-slate-400'>Đăng nhập</button>
                                                     </div>
                                                </div>
                                            }
                                        </div>
                                        <ul className=''>
                                                {/* <a href='/home' className='group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:bg-cyan-100'>
                                                    <span className='relative text-lg font-semibold'>Trang chủ</span>
                                                </a> */}
                                                {nav__links.map((item) => (
                                                    <li class='text-[var(--primary-color)] font-medium'>
                                                        <div className='text-lg py-3' onClick={()=> {navigate(item.path); navigate(0)}}>{item.display}</div>
                                                    </li>
                                                ))}
                                        </ul>
                                        {
                                            currentUser ?
                                            <>
                                                <div onClick={()=> {navigate(`/user-infomation/${currentUser.uid}`); navigate(0)}} className='text-[var(--primary-color)] font-medium text-lg py-3'>Thông tin tài khoản</div>
                                                <div className='text-[var(--primary-color)] font-medium text-lg py-3'>Lịch sử đơn hàng</div>
                                            </>
                                            : <></>
                                        }
                                        {
                                            currentUser ?
                                            <div>
                                                <button onClick={logout} className='bg-black text-sm py-3 rounded-lg w-4/6 text-white font-semibold focus:bg-slate-400'>Đăng xuất</button>
                                            </div>
                                            : <></>
                                        }
                                    </div>
                                </div>

                            </div>
                        </span>
                    </div>
                </div>
                
                
            </div>
        </div>
    )
}

export default Header