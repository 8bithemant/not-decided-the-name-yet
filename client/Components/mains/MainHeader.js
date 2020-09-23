import Router from 'next/router'
import Link from 'next/link'

const MainHeader =()=>{
    return (
        <React.Fragment>
            <div className="main-header">
                <div className="main-header-logo">
                    <Link href="/">
                        <a>
                            Logo
                        </a>
                    </Link>
                </div>
                <a href="" className="toggle-button">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </a>
                <div className="main-header-links">
                    <ul>
                        <Link href="/signin"><li><a  className="main-header-link">Signin</a></li>
                        </Link><li><a href="" className="main-header-link">Signup</a></li>
                        <li><a href="" className="main-header-link">About</a></li>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MainHeader;