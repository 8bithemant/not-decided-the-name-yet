import Layout from '../../Components/Layout'
import Admin from '../../Components/auth/Admin'
import BlogCreate from '../../Components/CreateBlog'

const CreateBlog=()=>{


    return (
        <Admin>
            <Layout>
                <h2  className="center-header">
                    Create Blog
                </h2>
                <BlogCreate />
            </Layout>
        </Admin>
    )
}

export default CreateBlog