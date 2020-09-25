import {useState, useEffect} from 'react'
import {getCookie} from '../../actions/auth'
import {create, getCategories, removeCategory} from '../../actions/category'
import{ CLOUDINARY_URL ,CLOUDINARY_NAME} from '../../config'
import fetch from 'isomorphic-fetch'


const Category =()=>{

    const [values, setValues] =useState({
        name:'',
        about:'',
        cover:'',
        error:'',
        success:'',
        categories:[],
        removed: false,
        reload:false
    })

    const token=getCookie('token')

    const loadCategories= ()=>{
        getCategories().then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setValues({...values, categories: data})
            }
        })
    }

    const {name,about,cover,error, success, categories, removed, reload} =values;

    useEffect(()=>{
        loadCategories()
    },[reload])

    const showCategories=()=>{
        return categories.map((c,i)=>{
            return <button onDoubleClick={()=> deleteConfirm(c.slug)} title="Double Click To Delete" key={i} className="btn btn-inner">{c.name}</button>
        })
    }


    const deleteConfirm=slug=>{
        let answer= window.confirm('Are You Sure You Want To Delete?')

        if(answer){
            deleteCategory(slug)
        }
    }

    const deleteCategory=slug=>{
        removeCategory(slug, token).then(info=>{
            if(info.error){
                console.log(info.error)
            }else{
            
                setValues({...values, error: false, success: false, name:'',removed: true, reload:!reload})
            }
    })
    }

    const uploadFile = async e => {
        console.log("Uploading....")
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'ozqik7gw');

        const res = await fetch('https://api.cloudinary.com/v1_1/joshihemant/image/upload', {
            method: 'POST',
            body: data
        });

        const file = await res.json();
        console.log(file.secure_url)
        setValues({...values, cover: file.secure_url, error:''})
        console.log(values)
    }

    const clickSubmit =e=>{
        e.preventDefault()
        const category ={name, about, cover}
        create(category, token).then(data=>{
            if(data.error){
                setValues({...values, error: data.error, success:false})
            }else{
                setValues({...values, error:false, success:true, name:'', about:'', cover:'', remove:false, reload: !reload})
            }
        })
    }

    const handleChange=(name)=>e=>{
        setValues({...values, [name]: e.target.value, error: false, success:false, removed:''})
    }

    const newCategoryForm =()=>{

        return <form className="form" onSubmit={clickSubmit}>
                        { cover &&
                            <img width="200" src={cover} alt="Upload Preview" />}
                    <div className="category-create-form-group" >
                        {/* <label className="category-create-form-group">Name</label> */}
                        <input type="text" className="form-control" onChange={handleChange('name')} value={name} />
                    </div> 
                    <div className="category-create-form-group" >
                        {/* <label className="category-create-form-group">About</label> */}
                        <input type="text" className="form-control" onChange={handleChange('about')} value={about} required/>
                    </div>
                    <label >
                        Upload image
                        <input type="file" id="file" onChange={uploadFile} required placeholder="Upload Image" style={{display:'none'}}/>
                    </label>
                    <div>
                        <button type="submit" className="btn btn-primary">Create</button> 
                    </div>
                    
                </form>
    }

    const showSuccess =()=>{
        if(success){
            return <p className="show-message">Category Created</p>
        }
    }

    const showError =()=>{
        if(error){
            return <p className="show-error">Category Already Exists</p>
        }
    }

    const showRemove =()=>{
        if(removed){
            return <p className="show-error">Category Removed</p>
        }
    }
    
    // const mouseMoveHandler=e=>{
    //     setValues({...values,error: false, success:false, removed:''})
    // }

    return <React.Fragment>
        <div className="show-updates">
        {showError()}
        {showSuccess()}
        {showRemove()}
        </div>
        {showCategories()}
        <div >
            {/* onMouseMove={mouseMoveHandler} */}
            {newCategoryForm()}
        </div>
    </React.Fragment>
}

export default Category