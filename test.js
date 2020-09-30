import {useEffect, useState} from 'react'
import { getCookie } from '../actions/auth'
import {createBlog} from '../actions/blog'
import {getTag} from '../actions/tag'
import {getCategories} from '../actions/category'
import {withRouter} from 'next/router'
// const MyComponent =dynamic(()=>import('./quill'), {srr: false})
import MyComponent from './quill'
import {uploadImage} from '../actions/upload'
import {CLOUDINARY} from '../config'

const BlogCreate=({router})=>{

    const token = getCookie('token')
    const [body, setBody]= useState()
    const [values, setValues]=useState({
        title:'',
        cover:'',
        error:'',
        success: false,
        showPublishButton :false,
        bodyTags:[],
        bodyCategories:[],
        imgLoading:false, 
        imgSuccess: false
    })

    const {cover, title, bodyTags, bodyCategories}= values


    const [categories, setCategories] = useState([])
    const [checkedCats, setCheckedCats]= useState([])

    const handleCatsToggle=(c)=>( )=>{
        setValues({...values, error:''})
        const clickedCats= checkedCats.indexOf(c)
        const all =[...checkedCats]

        if(clickedCats=== -1){
            all.push(c)
            console.log('c')
        }else{
            all.splice(clickedCats, 1)
        }

        setCheckedCats(all)
        setValues({...values, bodyCategories: all})
    }

    const showCategories=()=>{
        return (
            categories && categories.map((c, i)=>{
                return <li className="create-blog show-categories list" key={i}>
                    <input onChange={handleCatsToggle(c._id)} type="checkbox"/>
                    <label className="create-blog shoe-categories label">{c.name}</label>
                </li>
            })
        )
    }

    const [tags, setTags]= useState([])
    const [checkedTag, setCheckedTag]= useState([])

    const handleTagsToggle=(t)=>( )=>{
        setValues({...values, error:''})
        const clickedTags= checkedTag.indexOf(t)
        const all =[...checkedTag]

        if(clickedTags=== -1){
            all.push(t)
            console.log('t')
        }else{
            all.splice(clickedTags, 1)
        }

        setCheckedTag(all)
        setValues({...values, bodyTags: all})
    }

    const showTags=()=>{
        return (
            tags && tags.map((t, i)=>(
                 <li className="create-blog show-tags list" key={i}>
                    <input onChange={handleTagsToggle(t._id)} type="checkbox"/>
                    <label className="create-blog show-tags label">{t.name}</label>
                </li>
            ))
        )
    }
    
    const initTags=()=>{
        getTag().then(data=>{
            if(data.error){
                setValues({...values, error:data.error})
            }else{
                setTags(data)
                // console.log(tags)
            }
        })
    }

    const initCategories=()=>{
        getCategories().then(data=>{
            if(data.error){
                setValues({...values, error:data.error})
            }else{
                setCategories(data)
            }
        })
    }

    useEffect(()=>{
        initCategories()
        initTags()
    },[router])

    const createBlogForm =()=>(
        <React.Fragment>
            <form onSubmit={submitHandler}>
                <div className="form-blog-body">
                <MyComponent callBack={getBody}/>
                </div>
            </form>
            <button onClick={submitHandler} >Create</button>
        </React.Fragment>
    )

    const submitHandler=()=>{
        setValues({...values, error: ''})
        const blog= {cover, title, bodyCategories, bodyTags, body}

        createBlog(blog, token).then(data=>{
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({...values, success:true})
            }
        })
    }

    const uploadFile = e => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', `${CLOUDINARY}`);
        setValues({...values, cover:'', error:'', imgLoading:true})
        uploadImage(data).then(
            data=>{
                if(data.error){
                    setValues({...values, imgLoading: false})
                }
                setValues({...values, cover: data.secure_url, error:'', imgLoading:false, imgSuccess:true})
            }
        )
    }

    const coverUpload= ()=>(
        <React.Fragment>
            {cover && <img src={cover} width="80%" height="200px" object-fit= "cover" />}
            <label>
                Upload Cover Image
                <input type="file" onChange={uploadFile} required placeholder="Upload Image" style={{display:'none'}} />
            </label>
        </React.Fragment>
    )
        
    const getBody =(data)=>{
        setBody(data)
    }

    return(
        <React.Fragment>
            {showCategories()}
            <hr />
            {showTags()}
            <br />
            {coverUpload()}
            <br />
            {createBlogForm()}
        </React.Fragment>
    )
}

export default withRouter(BlogCreate)