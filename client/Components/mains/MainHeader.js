import Router from 'next/router'
import Link from 'next/link'
import {isAuth} from '../../actions/auth'
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
                {/* <a href="" className="toggle-button">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </a> */}
                <div className="main-header-links">
                    <ul>
                        {
                            isAuth() && isAuth().role===0 &&(
                                <Link href="/user">
                                    <li>
                                        <a className="main-header-link">
                                            {`${isAuth().firstName}`}
                                        </a>
                                    </li>
                                </Link>
                            )
                        }
                        {
                            isAuth() && isAuth().role===1 &&(
                                <Link href="/admin">
                                    <li>
                                        <a className="main-header-link">
                                            {`${isAuth().firstName}`}
                                        </a>
                                    </li>
                                </Link>
                            )
                        }
                        {
                            isAuth() &&(
                                <Link href="/user">
                                    <li>
                                        <a className="main-header-link">
                                            Messages
                                        </a>
                                    </li>
                                </Link>
                            )
                        }
                        {
                            isAuth() &&(
                                <Link href="/user">
                                    <li>
                                        <a className="main-header-link">
                                            Status
                                        </a>
                                    </li>
                                </Link>
                            )
                        }

                        {
                            isAuth() ? '':(
                                <React.Fragment>
                                <Link href="/signup">
                                    <li><a href="/signup" className="main-header-link">Signup</a></li>
                                </Link>
                                <Link href="/about">
                                    <li><a href="" className="main-header-link">About</a></li>
                                </Link>
                                </React.Fragment>
                            )
                        }
                        
                        
                        
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MainHeader;