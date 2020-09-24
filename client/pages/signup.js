import { Signin } from '../actions/auth'
import Layout from '../Components/Layout'
import SignupComponent from '../Components/auth/Signupcomponent'
const Signup=()=>{
    return <React.Fragment>
        <Layout>
            <h2 className="center-header">Signup</h2>
            <div className="container">
                <SignupComponent />
            </div>
        </Layout>
    </React.Fragment>
}

export default Signup