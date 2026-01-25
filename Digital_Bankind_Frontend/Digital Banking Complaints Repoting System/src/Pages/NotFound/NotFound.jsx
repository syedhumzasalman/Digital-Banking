import React from 'react'
import errorimage from "../../assets/Images/errorimage.png"

const NotFound = () => {
  return (
    <>

      <div className='bg[#F5F5F9] w-full h-full text-center mt-5'>

        <h1 className='text-5xl lg:text-9xl font-bold'>404</h1>
        <p className='text-1xl lg:text-2xl font-bold mt-2'>Page Not Found ⚠️</p>
        <p className='mt-2 text-sm lg:text-1xl'>we couldn't find the page you are looking for</p>
        <div className="flex justify-center items-center w-full">
          <img
            src={errorimage}
            alt="Error Image"
            className="mt-10 w-48 md:w-64 lg:w-110 h-auto object-contain"
          />
        </div>

      </div>

    </>
  )
}

export default NotFound