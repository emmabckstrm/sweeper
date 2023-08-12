import { Sweeper } from "./Sweeper";
import Image from "next/image";
import githubIcon from "../public/github-mark.svg";

export default async function Page() {
  return (
    <div className="min-w-full min-h-full bg-fixed bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-300 to-rose-300">
      <Sweeper />
      {/* <div className="w-full text-center p-2 sm:w-auto sm:fixed sm:bottom-0 sm:right-0 sm:p-4">
        <div className="w-5 inline-block">
          <Image priority src={githubIcon} alt="Github" />
        </div>
      </div> */}
    </div>
  );
}
