import Link from 'next/link'

const Header =()=>{

    return(
    
        <nav className="navbar">
            <div className="brand-title">
               <Link href="/">
                <a>
                    Com_CO
                </a>
               </Link>
            </div>

            <a href="" className="toggle-button">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </a>
            <div className="navbar-links">
                <ul>
                    <li><a href="">Signout</a></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header