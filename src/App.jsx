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
  const [isError, setIsError] = useState(null)
  const [vL, setVL] = useState(null)
 
 //============Modal===================================
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  //=========btnMore==========================================
  const [pageCount, setPageCount] = useState(1)

  //-----------------------------------------function--searchBar-------------------------------------------------------------
  const handleSubmit = (event) => {
    const valueS = event.target[0].value.trim()
    setVL(valueS)
    setIsError(null)
    setProducts(null)
    setPageCount(1)
    event.preventDefault()
    event.target.reset()
 
     if (!valueS) {
      toast.error('Будь ласка, введіть текст для пошуку зображень.') 
      return
     }


     fetchProducts(pageCount, valueS)
  }
  //---------------------------------------------fetch-------------------------------------------------------------------------------------------
  const fetchProducts = async (pageNumbr, vL) => {
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
    const newData = data.filter(value => value.alt_description.toLowerCase().split(" ").includes(vL.toLowerCase()))
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
    fetchProducts(newPage, vL)
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
      { isError ? <ErrorMessage/> : <ImageGallery products={products} handleImageClick={handleImageClick} />}
      <Toaster />  
      {products !== null && products.length > 0 && !showLoader && <LoadMoreBtn BtnMore={ BtnMore } />}
      {showLoader && <Loader />}
      <ImageModal  isOpen={isModalOpen} onRequestClose={closeModal} imageSrc={selectedImage}/>
    </>
  )
}

export default App

