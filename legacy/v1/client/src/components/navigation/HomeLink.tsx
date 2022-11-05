import { Link } from "react-router-dom"

export const HomeLink = ({ setActive }: { setActive: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <Link to="/" onClick={() => setActive("Home")} className="items-center flex text-white hover:text-black transition ease-in duration-200">
      <img
        className="object-contain h-10 mr-2"
        src="https://cdn.discordapp.com/attachments/627267590862929961/889763083776577546/ot.png"
        alt="logo"
      ></img>
      <span className=" mr-8 block md:hidden lg:flex">osuTracker</span>
    </Link>
  )   
}