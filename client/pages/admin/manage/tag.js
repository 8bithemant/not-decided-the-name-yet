import Layout from '../../../Components/Layout'
import Tag from '../../../Components/manage/Tag'
import Admin from '../../../Components/auth/Admin'
const TagForm =()=>{
    return(
        <Admin>
            <Layout>
                    <h2 className="center-header">
                        Manage Tags
                    </h2>
                    <Tag />
            </Layout>
        </Admin>
    )
}

export default TagForm;