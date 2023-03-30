import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useAuth from '../../custom-hooks/useAuth';
import { Link } from 'react-router-dom';
import { Popover, Switch, User, Button, Avatar } from '@nextui-org/react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



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
    const navigate = useNavigate()
    const totalQuantity = useSelector(state => state.cart.totalQuantity);
    const {currentUser} = useAuth()

    const logout = () => {

        signOut(auth).then(() => {
            toast.success("Đăng xuất thành công")
            navigate('/home')
        }).catch(err => {
            toast.error(err.message)
        })

    }

    return (
        <div class='w-full  h-[70px] leading-[70px] sticky top-0 left-0 z-10 shadow-xl bg-white'>
            <div class='flex items-center justify-around pt-2 max-[768px]:justify-between max-[768px]:px-6'>
                {/* logo */}
                <div class='flex items-center gap-[8px] cursor-pointer'>
                    <div>
                        <h1 class='font-bold text-[1.2rem] text-[var(--primary-color)]'>Entikay</h1>
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
                    {/* fav icon */}
                    <span class='text-[1.3rem] cursor-pointer relative'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                        </svg>
                        <span class='absolute w-4 h-4 flex items-center justify-center top-[50%] right-[0%] content-none rounded-[50px] text-white bg-[var(--primary-color)] text-[0.7rem] font-semibold z-10' >1</span>
                    </span>
                    {/* cart icon */}
                    <span onClick={() => {navigate('/cart')}} class='cursor-pointer relative'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                        <span class='absolute w-4 h-4 flex items-center justify-center top-[50%] right-[0%] content-none rounded-[50px] text-white bg-[var(--primary-color)] text-[0.7rem] font-semibold z-10' >{totalQuantity}</span>
                    </span>
                    {/* profile */}
                    <div className='max-[768px]:hidden flex items-center'>
                    <Popover  triggerType='menu'>
                    {/* user icon */}
                        <Popover.Trigger>
                            <User src = {currentUser ? currentUser.photoURL : ''} />
                        </Popover.Trigger>
                        <Popover.Content>
                            {
                                currentUser ? 
                                <div className='p-2 flex flex-col'>
                                    <div className='flex justify-between items-center'>
                                        <User src={currentUser ? currentUser.photoURL : ''} name={currentUser.displayName} description={currentUser.email} size='sm' />
                                        <div className='text-xs font-medium py-0.5 px-1 rounded-lg bg-pink-400 text-white'>Pro</div>
                                    </div>

                                    <div className='h-[1px] w-full bg-gray-200 my-2' />

                                    <div className='flex space-x-2 items-center pl-3'>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                            </svg>
                                        </span>
                                        <span className='text-sm font-medium'>Cài đặt tài khoản</span>
                                    </div>

                                    <div className='flex space-x-2 items-center pl-3 mt-3 justify-between'>
                                        <div className='flex space-x-2'>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                                </svg>
                                            </span>
                                            <span className='text-sm font-medium'>Dark mode</span>
                                        </div>
                                        <div>
                                            <Switch size='sm' />
                                        </div>
                                    </div>

                                    <div className='h-[1px] w-full bg-gray-200 my-2' />

                                    <span onClick={logout} className='pl-3 text-sm font-medium text-red-500 cursor-pointer'>Đăng xuất</span> 
                                </div>
                                :
                                <div className='p-3 flex flex-col text-sm font-medium'>
                                    <Link to= '/login'>Đăng nhập</Link>
                                    <div className='h-[1px] w-full bg-gray-200 my-2' />
                                    <Link to= '/signup'>Đăng kí</Link>
                                </div>
                                
                            }
                        </Popover.Content>
                    </Popover>
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

                                <div className='peer-checked:translate-x-0 flex flex-col fixed inset-0 w-[calc(100%-13rem)] translate-x-[-100%] transition duration-300 bg-white border-r shadow-xl lg:border-l-0 lg:w-auto lg:static lg:shadow-none lg:translate-x-0'>
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
                                                    <div className='text-xs font-medium py-0.5 px-1 rounded-lg bg-pink-400 text-white'>Pro</div>
                                                </div>
                                                :
                                                <div>
                                                     <div className='w-2/3'>
                                                        <button onClick={() => {navigate('/login')}} className='bg-black text-sm py-3 rounded-lg w-4/6 text-white font-semibold focus:bg-slate-400'>Đăng nhập</button>
                                                     </div>
                                                </div>
                                            }
                                        </div>
                                        <ul className=''>
                                            <li>
                                                <a href='#' className='group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:bg-cyan-100'>
                                                    <span className='relative text-lg font-semibold'>Trang chủ</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href='#' className='group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:bg-cyan-100'>
                                                    <span className='relative text-lg font-semibold'>Tất cả sản phẩm</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href='#' className='group relative before:absolute before:inset-x-0 before:bottom-0 before:h-2 before:bg-cyan-100'>
                                                    <span className='relative text-lg font-semibold'>Giỏ hàng</span>
                                                </a>
                                            </li>
                                        </ul>
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