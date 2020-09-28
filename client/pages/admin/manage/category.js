import Layout from '../../.././Components/Layout'
import Category from '../../../Components/manage/Category'
import Admin from '../../../Components/auth/Admin'
const CategoryForm =()=>{


    return(
        <Admin>
            <Layout>
                <h2 className="center-header">
                    Manage Categories
                </h2>
                <Category />
            </Layout>
        </Admin>
    )
}

export default CategoryForm;