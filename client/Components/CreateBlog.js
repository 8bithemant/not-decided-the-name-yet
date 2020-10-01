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

    const [values, setValues]= useState({
        error: '',
        success:false,
        cover:'',
        title: '',
        body:'',
        tags:[],
        categories:[],
        showPublishedButton :true,
        imgLoading: false,
        imgSuccess:false,
    })

    const {title, body, tags, categories, cover}= values

    const [listTags , setListTags]= useState([])
    const [listCategories, setListCategories] = useState([])

    const showCategories=()=>{
        return (
            listCategories && listCategories.map((c, i)=>{
                return <li className="create-blog show-categories list" key={i}>
                    <input onChange={handleCatsToggle(c._id)} type="checkbox"/>
                    <label className="create-blog shoe-categories label">{c.name}</label>
                </li>
            })
        )
    }

    const [checkedCats,setCheckedCats ] =useState([])

    const handleCatsToggle=(c)=>( )=>{
        setValues({...values, error:''})
        const clickedCats= checkedCats.indexOf(c)
        const all =[...checkedCats]

        if(clickedCats=== -1){
            all.push(c)
            console.log(all)
        }else{
            all.splice(clickedCats, 1)
        }

        setCheckedCats(all)
        setValues({...values, categories: all})
    }

    const showTags=()=>{
        return (
            listTags && listTags.map((t, i)=>(
                 <li className="create-blog show-tags list" key={i}>
                    <input onChange={handleTagsToggle(t._id)} type="checkbox"/>
                    <label className="create-blog show-tags label">{t.name}</label>
                </li>
            ))
        )
    }

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
        setValues({...values, tags: all})
    }



    const initCategories=()=>{
        getCategories().then(data=>{
            if(data.error){
                setValues({...values, error:data.error})
            }else{
                setListCategories(data)
            }
        })
    }

    const initTags=()=>{
        getTag().then(data=>{
            if(data.error){
                setValues({...values, error:data.error})
            }else{
                setListTags(data)
            }
        })
    }

    useEffect(()=>{
        initCategories()
        initTags()
    },[router])

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

    const getBody =(data)=>{
        setValues({...values, error:'', body: data})
    }

    const submitHandler=()=>{
        setValues({...values, error: ''})
        const blog= {cover, title, categories: categories.toString(), tags:tags.toString(), body}

        createBlog(blog, token).then(data=>{
            if(data.error){
                setValues({...values, error: data.error})
            }else{
                setValues({...values,title:'', success:true})
            }
        })
    }

    const handleChange=name=>(e)=>{
        setValues({...values, error:'', success: false, [name]:e.target.value})
    }

    const blogCreateForm =()=>{
        return <React.Fragment>
            <form onSubmit={submitHandler}>
                <div className="title">
                    <label>Title</label>
                    <input value={title} type="text" onChange={handleChange('title')} />
                </div>
                <div className="image">
                    {cover && <img src={cover} height="250px" width="250px"/>}
                </div>
                <div className="upload">
                    <label>
                        Upload image
                        <input type="file" onChange={uploadFile} style={{display:"none"}}/>
                    </label>
                </div>
                <div className="text-editor">
                    <MyComponent callBack={getBody} value={body}/>
                </div>
            </form>
            <button onClick={submitHandler}>
                Submit
            </button>
        </React.Fragment>
    }

    return(
        <React.Fragment>
            <div className="box">
                {showCategories()}
                {showTags()}
                <hr />
                {blogCreateForm()}
            </div>
        </React.Fragment>
    )


}

export default withRouter(BlogCreate)