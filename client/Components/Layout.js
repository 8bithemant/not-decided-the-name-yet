import Header from './mains/Header'
import Footer from './mains/Footer'
const Layout =({children})=>{
    return (
        <React.Fragment>
            <Header />
            <p>{children}</p>
            <Footer />
        </React.Fragment>
    )
}

export default Layout