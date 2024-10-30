import { useState } from 'react'
import css from './ImageCard.module.css'


const ImageCard = ({item, handleImageClick, index, triger}) => {

    

    return (
        <div className={css.imageWrap} >
            <img src={item.urls.small} alt={item.alt_description} className={css.itemPicture} onClick={() => handleImageClick(item.urls.regular)} />
            <div className={css.discribe}>
                <p>{item.alt_description}</p>
            </div>
            <div className={css.likes}>
                <p>likes: {item.likes}</p>
                <button onClick={()=>triger(index)}>❤</button>
            </div>
        </div>
    )
}

export default ImageCard