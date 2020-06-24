import React, {useState} from 'react'
import {render} from 'react-dom'
import {storage} from '../../firebase'

const ImageUpload = props => {
    const [image, setImage] = useState(null)

    const changeHandlerImg = event => {
        if(event.target.files[0]){
            setImage(event.target.files[0])
        }
    }

    const handleUpload = event => {
        event.preventDefault()
        const uploadTask = storage.ref(`images/${props.name}`).put(image);
        uploadTask.on(
            'state_changed',
            snapshot => {},
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
        <div>
            <input type='file' onChange={changeHandlerImg}/> 
            <button 
                onClick = {handleUpload}
            >загрузить</button>


        </div>
    )

}

export default ImageUpload
