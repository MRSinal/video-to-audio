import Image from 'next/image'
import Convert from '../Components/Convert'
import {ModeToggle} from '@/components/ui/toggle-mode'
export default function Home() {
  return (
    <>
    <div className="flex justify-end items-end mr-6 mt-6">
      <ModeToggle ></ModeToggle>
    </div>
    <main className="grid grid-rows-auto mt-[20%]">
        
        <h1 className='transition ease-in-out text-[20px] font-[400] text-muted-foreground flex items-center justify-center underline decoration-transparent  decoration-[3px] hover:decoration-[#51EC89]'>CONVERT IT</h1>
        <div className='text-3xl font-black  flex items-center justify-center text-center'>
          <p> Turn <a className='bg-gradient-to-r from-[#51EC89] to-[#30FCEC] text-transparent bg-clip-text'>your</a> videos into <a className=' bg-gradient-to-r from-[#FBAB7E] to-[#F7CE68] text-transparent bg-clip-text'>beautiful</a> audio files
          <br></br> in <a className='bg-gradient-to-r from-[#51EC89] to-[#30FCEC] text-transparent bg-clip-text'>seconds</a> in a <a className='bg-gradient-to-r from-[#51EC89] to-[#30FCEC] text-transparent bg-clip-text'>click of a button </a></p></div>
        <Convert className="flex items-center justify-center"></Convert>
      </main>
    
    </>
      

  )
}
