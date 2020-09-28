import Layout from '../../Components/Layout'
import Link from 'next/link'
import User from '../../Components/auth/User'

const UserIndex= ()=>{
    return(
        <User>
            <Layout>
                Hii This is User
            </Layout>
        </User>
    )
}

export default UserIndex;