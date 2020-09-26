import {useState, useEffect} from 'react'
import {getCookie} from '../../actions/auth'
import {create, getTag, removeTag} from '../../actions/tag'
import{CLOUDINARY} from '../../config'
import {uploadImage} from '../../actions/upload'

const  Tag=()=>{

    const [values, setValues] =useState({
        name:'',
        about:'',
        cover:'',
        error:'',
        success:'',
        tags:[],
        removed: false,
        reload:false,
        imgLoading: false,
        imgSuccess:false
    })

    const token=getCookie('token')

    const loadTags= ()=>{
        getTag().then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setValues({...values, tags: data})
            }
        })
    }

    const {name,about,cover,error, success, tags, removed, reload, imgLoading, imgSuccess} =values;

    useEffect(()=>{
        loadTags()
    },[reload])

    const showTags=()=>{
        return tags.map((t,i)=>{
            return <div className="show-categories">
                    <img src={t.cover} style={{height:'100px', width:'200px'}} />
                    <div className="name">
                        {t.name}
                    </div>
                    <div className="about">
                        {t.about}
                    </div>
                   <button onClick={()=> deleteConfirm(t.slug)} title="Double Click To Delete" key={i} className="btn btn-inner">Delete</button>
                </div>
        })
    }

    const deleteConfirm=slug=>{
        let answer= window.confirm('Are You Sure You Want To Delete?')
        if(answer){
            deleteTags(slug)
        }
    }

    const deleteTags=slug=>{
        removeTag(slug, token).then(info=>{
            if(info.error){
                console.log(info.error)
            }else{
            
                setValues({...values, error: false, success: false, name:'',removed: true, reload:!reload})
            }
    })
    }

    const uploadFile = e => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', `${CLOUDINARY}`);
        setValues({...values, cover:'', error:'', imgLoading:true})

        // const res = await fetch('https://api.cloudinary.com/v1_1/joshihemant/image/upload', {
        //     method: 'POST',
        //     body: data
        // });

        uploadImage(data).then(
            data=>{
                if(data.error){
                    console.log(data.error)
                }
                setValues({...values, cover: data.secure_url, error:'', imgLoading:false, imgSuccess:true})
            }
        )


        // const file = await res.json();
        // console.log(file.secure_url)
        // setValues({...values, cover: file.secure_url, error:''})
        // console.log(values)
    }

    const clickSubmit =e=>{
        e.preventDefault()
        const tag ={name, about, cover}
        create(tag, token).then(data=>{
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

    const newTagForm =()=>{

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

    return <React.Fragment>
        <div className="show-updates">
        {showError()}
        {showSuccess()}
        {showRemove()}
        </div>
        {showTags()}
        <div >
            {/* onMouseMove={mouseMoveHandler} */}
            {newTagForm()}
        </div>
    </React.Fragment>
}

export default Tag