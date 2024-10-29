import { useState } from 'react'
import css from './ImageCard.module.css'


const ImageCard = ({ item, handleImageClick }) => {
    const [like, setLike] = useState(item.likes)

    const addLiks = () => {
        setLike(prev => prev+1)
    }

    console.log
    return (
        <div className={css.imageWrap} onClick={() => handleImageClick(item.urls.regular)}>
            <img src={item.urls.small} alt={item.alt_description} className={css.itemPicture} />
            <div className={css.discribe}>
                <p>{item.alt_description}</p>
            </div>
            <div className={css.likes}>
                <p>likes: {like}</p>
                <button onClick={addLiks}>❤</button>
            </div>
        </div>
    )
}

export default ImageCard