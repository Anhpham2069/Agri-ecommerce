import React from 'react'
import Market from './market'
import Fruit from './fruit'
import SpecialtyComponent from './specialty'
import News from './news'
import Category from './Category'
import FeaturedProduct from './Featured'

const ContentComponent = () => {
  return (
    <div>
        <Category/>
        <FeaturedProduct />
       <Market />
       <Fruit />
       <SpecialtyComponent />
       <News />
    </div>
  )
}

export default React.memo(ContentComponent)