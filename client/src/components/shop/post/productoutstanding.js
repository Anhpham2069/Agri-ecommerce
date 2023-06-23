import React,{useEffect,useState} from 'react'
const apiURL = process.env.REACT_APP_API_URL;
const Productoutstanding = () => {
    const [products, setProducts] = useState([])
    const fetchData = () => {
        fetch("http://localhost:8000/api/product/search")
          .then(response => {
            return response.json()
          })
          .then(data => {
            setProducts(data)
          })
      }
      // console.log(products)
    
    useEffect(() => {
      fetchData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (
        <> 
        {products && products
            .filter(obj => obj.pOffer > 10)
           .map((item)=>{
               return(
                   <div key={item._id} className='featured-item-article'>
                       
                       <img 
                       src={`${apiURL}/uploads/products/${item.pImages[0]}`} alt='anh'/>
                       <div>
                           <span className='name'>{item.pName}</span>
                           <span className='price'>{item.pPrice}</span>
                       </div>
                   </div>
               )
           })}
        </>
    )

}

export default Productoutstanding

