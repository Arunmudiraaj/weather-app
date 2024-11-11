
import MainPanel from '../components/MainPanel'
import SidePanel from '../components/SidePanel'

const Home = () => {
  return (
    <div className='flex w-full flex-col md:h-[100vh] md:flex-row'>
      <div className='md:w-80 bg-blue-950 h-full'>
        <SidePanel/>
      </div>
      <div className='flex-grow bg-white h-full'>
        <MainPanel/>
      </div>
    </div>
  )
}

export default Home