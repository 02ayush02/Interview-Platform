import { SignedIn, SignInButton, SignOutButton, SignedOut } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import toast from "react-hot-toast"
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router'
import { ArrowRightIcon, CheckIcon, Code2Icon, SparklesIcon, UserIcon, VideoIcon, ZapIcon} from "lucide-react"

function HomePage() {

  // fetch some data - without using tanstack 

  // const [books, setBooks] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const getBooks = async () => {
  //     setIsLoading(true);

  //     try {
  //       const res = await fetch("/api/books");
  //       const data = await res.json();
  //       setBooks(data);
  //     } catch (err) {
  //       setError(err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   getBooks();
  // }, []);

  // The problem with this is that if the request fails,
  // we need to manually handle:
  // 1. Showing the error
  // 2. Providing a retry mechanism
  // 3. Resetting loading state
  // 4. Re-running the function safely
  // React does NOT automatically retry failed requests,
  // so we must create a refetch function ourselves.


  // using Tanstack help
  // TanStack Query automatically manages:
  // Retry
  // Refetch
  // Caching
  // Loading state
  // Error state
  // Background refresh
  // Deduplication
  // Stale data control

  // This all using a single hook

  // const { data, isLoading, error, refetch,} = useQuery({
  //   queryFn: () => fetch("/api/books").then(res => res.json())
  // })


  return (
    <div className='bg-gradient-to-br from-base-100 via-base-200 to-base-300'>
      {/* Navbar */}
      <nav className='bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0
      z-50 shadow-lg'>
        <div className='max-w-7xl mx-auto flex items-center justify-between'>
          {/* LOGO */}
          <Link
            to="/"
            className="group flex items-start gap-3 transition-all duration-300 hover:scale-105 p-2"
          >
            {/* Icon */}
            <div className="size-11 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent 
                flex items-center justify-center shadow-xl">

              <SparklesIcon className="size-6 text-white drop-shadow-md" />

              {/* subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary via-secondary to-accent opacity-30 blur-md -z-10"></div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col pt-1 pb-2 relative">
              <span className="font-extrabold text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wide">
                Interview Platform
              </span>

              <span className="text-xs text-base-content/60 font-medium -mt-1">
                Code. Collaborate. Conquer.
              </span>

              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </div>
          </Link>


          {/* AUTH BUTTON */}
          <SignInButton mode="modal">
            <button className="group px-6 py-3 bg-gradient-to-r from-primary to-secondary
            rounded-xl text-white font-semibold text-sm shadow-lg hover:shadow-xl
            transition-all duration-200 hover:scale-105 flex items-center gap-2">
              <span>Get Started</span>
              <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </SignInButton>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="space-y-8 text-center lg:text-left">

            <div className="badge badge-primary badge-lg gap-2">
              <ZapIcon className="size-4" />
              Real-Time Collaboration
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent 
              bg-clip-text text-transparent">
                Code Together,
              </span>
              <br />
              <span className="text-base-content">
                Learn Together
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-base-content/70 leading-relaxed 
            max-w-xl mx-auto lg:mx-0">
              The ultimate platform for collaborative coding interviews and pair programming.
              Connect face-to-face, code in real-time, and ace your technical interviews.
            </p>

            {/* FEATURE PILLS */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <div className="badge badge-lg badge-outline gap-2">
                <CheckIcon className="size-4 text-success" />
                Live Video Chat
              </div>
              <div className="badge badge-lg badge-outline gap-2">
                <CheckIcon className="size-4 text-success" />
                Code Editor
              </div>
              <div className="badge badge-lg badge-outline gap-2">
                <CheckIcon className="size-4 text-success" />
                Multi-Language
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <SignInButton mode="modal">
                <button className="btn btn-primary btn-lg gap-2">
                  Start Coding Now
                  <ArrowRightIcon className="size-5" />
                </button>
              </SignInButton>

              <button className="btn btn-outline btn-lg gap-2">
                <VideoIcon className="size-5" />
                Watch Demo
              </button>
            </div>

            {/* STATS */}
            <div className="stats stats-vertical sm:stats-horizontal bg-base-100/80 
            backdrop-blur-md shadow-lg w-full sm:w-auto">
              <div className="stat">
                <div className="stat-value text-primary">10K+</div>
                <div className="stat-title">Active Users</div>
              </div>

              <div className="stat">
                <div className="stat-value text-secondary">50K+</div>
                <div className="stat-title">Sessions</div>
              </div>

              <div className="stat">
                <div className="stat-value text-accent">99.9%</div>
                <div className="stat-title">Uptime</div>
              </div>
            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <img
              src="/hero.png"
              alt="Interview Platform Demo"
              className="w-full rounded-3xl shadow-2xl border border-base-300
              hover:scale-[1.02] transition-transform duration-500"
            />
          </div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-primary font-mono">Succeed</span>
          </h2>

          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Powerful features designed to make your coding interviews seamless and productive.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="card bg-base-100/80 backdrop-blur-md shadow-lg 
          hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl 
              flex items-center justify-center mb-4">
                <VideoIcon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">HD Video Calls</h3>
              <p className="text-base-content/70">
                Crystal clear video and audio for seamless communication during interviews.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card bg-base-100/80 backdrop-blur-md shadow-lg 
          hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl 
              flex items-center justify-center mb-4">
                <Code2Icon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Live Code Editor</h3>
              <p className="text-base-content/70">
                Collaborate in real-time with syntax highlighting and multi-language support.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card bg-base-100/80 backdrop-blur-md shadow-lg 
          hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="card-body items-center text-center">
              <div className="size-16 bg-primary/10 rounded-2xl 
              flex items-center justify-center mb-4">
                <UserIcon className="size-8 text-primary" />
              </div>
              <h3 className="card-title">Real-Time Collaboration</h3>
              <p className="text-base-content/70">
                Share your screen, discuss solutions, and work together smoothly.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}

export default HomePage