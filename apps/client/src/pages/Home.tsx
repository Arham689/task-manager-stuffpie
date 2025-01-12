import Blob from "../componets/Blob"
import WelcomCard from "../componets/WelcomCard"
import { NavLink } from "react-router-dom"
const Home = () => {
  return (
    <div>
        <main className=" absolute -z-10 ">
            <Blob/>
        </main>
        <section className="h-screen w-screen flex flex-col gap-10 justify-center items-center ">
            <WelcomCard/>
            <NavLink to={'/signup'} >
            <button  className="md:text-3xl  active:bg-pink-dark bg-gradient-to-r from-purple-600 to-blue-600 bg-pink  text-white rounded-lg p-2 " >Get Started</button>
            </NavLink>
        </section>
    </div>
  )
}

export default Home
