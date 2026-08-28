import './header.css';

export default function Header(){
    return(
        <div>
            <nav>
                <ul className='flex gap-7.5 justify-end border border-solid pr-7.5'>
                    <li>Home</li>
                    <li>Products</li>
                    <li>Services</li>
                    <li>Contact Us</li>
                </ul>
            </nav>
        </div>
    );
};