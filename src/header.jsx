import { useEffect, useState } from 'react'
import './header.css';



const Header = () =>  {
    return(
        <div>
            <nav>
                <ul className='flex gap-7.5 justify-end pr-7.5 mt-2.5'>
                    <li className='cursor-pointer'>Home</li>
                    <li className='cursor-pointer'>Products</li>
                    <li className='cursor-pointer'>Services</li>
                    <li className='cursor-pointer'>Contact Us</li>
                </ul>
            </nav>
        </div>
    );
};

export default Header