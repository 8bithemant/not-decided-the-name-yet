import Link from 'next/link'
import Layout from '../../Components/Layout'
import Admin from '../../Components/auth/Admin'
const AdminIndex =()=>{
    

    return(
        <Admin>
            <Layout>
                <h2 className="center-header">Admin Index Page</h2>
                <div className="admin-create_blogs-li">
                    <Link href="/admin/create-blog">
                        <a>
                            Create Blog
                        </a>
                    </Link>
                    <br/ >
                    <Link href="/admin/manage/category">
                        <a>
                            Category
                        </a>
                    </Link>
                    <br/ >
                    <Link href="/admin/manage/tag">
                        <a>
                            Tag
                        </a>
                    </Link>
                </div>
                <div className="admin-create_blogs-li">
                    
                </div>
            </Layout>
        </Admin>
    )
}

export default AdminIndex