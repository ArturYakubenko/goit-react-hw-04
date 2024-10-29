import css from './ImeageGallery.module.css'
import ImageCard from './ImageCard'

const ImageGallery = ({ products, handleImageClick}) => {
    if (products === null) {
        return
    }
    return (
        <ul> 
            {products.length > 0 && products.map((item, index) => (
                 <li key={index}>
                    <ImageCard item={item} handleImageClick={handleImageClick } />
	            </li>))}
        </ul>
    )
}

export default ImageGallery