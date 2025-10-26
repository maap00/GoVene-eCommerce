import { LuLoader } from 'react-icons/lu'

export const Loading = () => {
  return (
     <div className="w-full h-full flex justify-center mt-20">
            <LuLoader className='animate-spin' size={60} />
          </div>
  )
}
