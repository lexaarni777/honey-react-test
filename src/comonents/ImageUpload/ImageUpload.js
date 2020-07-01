import React, {useState} from 'react'
import {render} from 'react-dom'
import {storage} from '../../firebase'
import Botton from '../UI/Button/Button'
import classes from './ImageUpload.module.css'
import Progress from '../UI/Progress/Progress'

const ImageUpload = props => {
    const [image, setImage] = useState(null)
    const [url, setUrl] = useState('')
    const [progress, setProgress] = useState(0)

    const changeHandlerImg = event => {
        if(event.target.files[0]){
            setImage(event.target.files[0])
            var file = document.getElementById ('uploaded-file').value
            file = file.slice(file.lastIndexOf('\\')+1)
            props.onValueName(file)


        }
    }

    
    const handleUpload = event => {
        event.preventDefault()
        props.onDisplay()
        const uploadTask = storage.ref(`images/${props.name}`).put(image);
        uploadTask.on(
            'state_changed',
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                )
                setProgress(progress)
            },
            error => {
                console.log(error)
            },
            ()=>{
                storage.ref('images').child(props.name).getDownloadURL().then(url => {
                    props.onChange(url)
                })
            }

        )
    }

    console.log('image: ', image)
    console.log('props: ', props)


    return (
        <div className={classes.ImageUpload}>
            <label>
                <input id = 'uploaded-file' className={classes.input} type='file' onChange={changeHandlerImg} />
                <span >Выбрать фото</span>
                <div className={classes.Upload}>
                    <div id="file-name"> {props.valueName}</div>
                    <Progress isDisplay = {props.isDisplay} value={progress}/>
                </div>
            </label>
            
            
            <Botton 
                onClick = {handleUpload}
            >Загрузить</Botton>
        </div>
    )

}

export default ImageUpload
