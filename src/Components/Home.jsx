import Greetings from "./Greetings"
import HeroImage from "./HeroImage"

export default function Home() {
  return (
    <section id="home" className="relative flex items-center pt-24 pb-20 overflow-hidden sm:pt-28 sm:pb-24 md:pt-32 md:pb-28">
      <span className="absolute rounded-full pointer-events-none -top-32 -left-32 w-96 h-96 bg-accent-blue/10 blur-3xl -z-10 dark:hidden"></span>
      <span className="absolute rounded-full pointer-events-none -bottom-32 -right-32 w-96 h-96 bg-accent-coral/10 blur-3xl -z-10 dark:hidden"></span>

      <div className="container relative z-10">
        <div className="grid items-center grid-cols-1 gap-14 md:grid-cols-2 md:gap-10">
          <Greetings />
          <HeroImage />
        </div>
      </div>
    </section>
  )
}