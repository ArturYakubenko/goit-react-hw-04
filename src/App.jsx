import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

import SearchBar from './components/SearchBar'
import ImageGallery from './components/ImageGallery'
import Loader from './components/Loader'
import ErrorMessage from './components/ErrorMessage'
import ImageModal from './components/ImageModal'
import LoadMoreBtn from './components/LoadMoreBtn'

function App() {
  //---------------------------------useState-----------------------------------------------------------------------------
  const [products, setProducts] = useState(null)
  const [showLoader, setShowLoader] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isValue, setIsValue] = useState(null)
  //============Modal===================================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  //=========btnMore==========================================
  const [pageCount, setPageCount] = useState(1)

  //------------------------------------------------setLikes-------------------------------------------------------------------

 const triger = (index) => {
    setProducts(prevProducts => {
    
      return prevProducts.map((product, idx) => {
        if (idx === index) {
          return {
            ...product,
            likes: product.likes ? product.likes + 1 : 0, 
          };
        }
        return product
      })
    })
  }
  //-----------------------------------------function--searchBar-------------------------------------------------------------
  const handleSubmit = (event) => {
    event.preventDefault()
    const valueS = event.target[0].value.trim()
   
    if (valueS) {
      setIsValue(valueS)
      setIsError(null)
      setProducts(null)
      setPageCount(1)
      event.target.reset()
    }
    else {
      toast.error('Будь ласка, введіть текст для пошуку зображень.') 
      return
     }

  }
  //---------------------------------------------fetch-------------------------------------------------------------------------------------------
   useEffect(() => {
    if (isValue) {  
      fetchProducts(pageCount, isValue)
    }
  }, [isValue, pageCount])
 
 
  const fetchProducts = async (pageNumbr, isValue) => {
     const key = "mO05oA3k0FuZyD1UR_D__mY-QJgn-q0q0vNtz3bnvEY"
      try {

        setShowLoader(true)
    
        const { data } = await axios.get('https://api.unsplash.com/photos', {
          params: {
          client_id: `${key}`,
          per_page: 30,
          page: `${pageNumbr}`
          }
        })
    const newData = data.filter(value => value.alt_description.toLowerCase().split(" ").includes(isValue.toLowerCase()))
       setProducts(prev => (prev !== null ? [...prev, ...newData] : newData));

      }
      catch {
        setIsError(true)
      }
      finally {
        setShowLoader(false)
      }
  }
  //-----------------------------------------------------btnMore-------------------------------------------------------------------------------
  const BtnMore = () => {
    const newPage = pageCount + 1
    setPageCount(newPage)
  }
  //-----------------------------------------------------Modal----------------------------------------------------------------------------------------
  
  const handleImageClick = (imageSrc) => {

    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

//-----------------------------------------------------rendering-----------------------------------------------------------------------------------
  return (
    <>
      <SearchBar handleSubmit={handleSubmit}/>
      {isError ? <ErrorMessage /> : products !== null && <ImageGallery products={products} handleImageClick={handleImageClick} triger={triger } />}
      <Toaster />  
      {products !== null && products.length > 0 && !showLoader && <LoadMoreBtn BtnMore={ BtnMore } />}
      {showLoader && <Loader />}
      <ImageModal  isOpen={isModalOpen} onRequestClose={closeModal} imageSrc={selectedImage}/>
    </>
  )
}

export default App

