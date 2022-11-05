import { GitHub } from "@material-ui/icons"
import TwitterIcon from "@material-ui/icons/Twitter";

export const Footer = () => {
  return (
    <div className="h-16 bg-gray-700 dark:bg-dark03 main-width w-full flex justify-center items-center text-white gap-4">
      <span className="">Site by nzbasic</span>
      <a
        href="https://github.com/nzbasic/osutracker"
        target="_blank"
        rel="noreferrer"
        className="flex items-center"
      >
        <GitHub fontSize="small" />
      </a>
      <a
        href="https://osu.ppy.sh/users/9008211"
        target="_blank"
        rel="noreferrer"
        className="flex items-center hover:text-main-four cursor-pointer"
      >
        osu!
      </a>
      <a
        href="https://twitter.com/nzbasic"
        target="_blank"
        rel="noreferrer"
        className="flex items-center"
      >
        <TwitterIcon fontSize="small" />
      </a>
      <a href="https://buymeacoffee.com/nzbasic" target="_blank" rel="noreferrer" >Donate</a>
    </div>
  )
}