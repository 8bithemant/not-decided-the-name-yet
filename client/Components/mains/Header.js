import Link from 'next/link'
import Router from 'next/router'
import {isAuth, signout} from '../../actions/auth'
const Header =()=>{

    return(
    
        <nav className="navbar">
            <div className="brand-title">
               <Link href="/about">
                <a>
                    Com_CO
                </a>
               </Link>
            </div>

            {/* <a href="" className="toggle-button">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </a> */}
            <div className="navbar-links">
                <ul>
                    {
                        isAuth() && (
                            <div className="login-now">
                                <a onClick={()=> signout(()=>Router.replace(`/signin`))}>Signout</a>
                            </div>
                        )
                    }
                    {
                        isAuth() ? '' : (
                            <div className="login-now"><a href="/signin"> Log in To Get Started  <i class="icofont-long-arrow-right"></i></a></div>
                        )
                    }
                </ul>
            </div>
        </nav>
    )
}

export default Header