import css from './ImeageGallery.module.css'
import ImageCard from './ImageCard'

const ImageGallery = ({ products, handleImageClick, triger}) => {

    return (
        <ul className={css.galleryList}> 
            {products.length > 0 && products.map((item, index) => 
             (
                <li className={css.galleryItem} key={index}>
                    <ImageCard item={item} handleImageClick={handleImageClick} index={index} triger={triger} />
	            </li>))}
        </ul>
    )
}

export default ImageGallery