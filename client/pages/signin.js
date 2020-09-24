
import Layout from '../Components/Layout'
import SigninComponent from '../Components/auth/SigninComponent'
const Signin=()=>{
    return <React.Fragment>
        <Layout>
            <h2 className="center-header">
                Sign In
            </h2>
            <div className="container">
                <SigninComponent />
            </div>
        </Layout>
    </React.Fragment>
}

export default Signin
