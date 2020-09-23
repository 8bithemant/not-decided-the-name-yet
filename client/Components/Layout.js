import Header from './mains/Header'
import Footer from './mains/Footer'
import MainHeader from './mains/MainHeader'
const Layout =({children})=>{
    return (
        <React.Fragment>
            <Header />
            <MainHeader />
            <section>
                <p>{children}</p>
            </section>
            <div className="footer">
                <h1>
                    Footer
                </h1>
            </div>
        </React.Fragment>
    )
}

export default Layout