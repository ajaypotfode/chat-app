
export const SmallComponentSpinner = () => {
  return (
    // <div className='flex gap-5 w-[100%] h-20 border-2'>
    <div className='px-4 sm:py-2 md:py-1 rounded-full text-gray-800 lg:px-6 border'>
      <div className="flex justify-center">
        <div className="sm:w-8 sm:h-8 w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>

  )
}

export const PageSpinner = () => {
  return (
    <div className="flex justify-center">
      <div className="w-20 h-20 border-[6px] border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  )
}

export const FormSpinner = () => {
  return (
    <div className='px-4 py-2 sm:w-[30%] w-[50%] h-[20%]  rounded-2xl flex place-content-center justify-center bg-[#2A2A2A] shadow-2xl text-sm md:text-base lg:px-6'>
      <div className="flex justify-center">
        <div className="sm:w-28 sm:h-28 w-20 h-20 border-[6px] border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  )
}