import Layout from '../../.././Components/Layout'
import Category from '../../../Components/manage/Category'

const CategoryForm =()=>{


    return(
        <Layout>
            <h2 className="center-header">
                Manage Tags and Categories
            </h2>
            <Category />
        </Layout>
    )
}

export default CategoryForm;