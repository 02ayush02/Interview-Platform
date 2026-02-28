import { SignedIn, SignInButton, SignOutButton, SignedOut } from '@clerk/clerk-react'
import React, { useEffect } from 'react'
import toast from "react-hot-toast"
import { useQuery } from '@tanstack/react-query' 

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

  const { data, isLoading, error, refetch,} = useQuery({
    queryFn: () => fetch("/api/books").then(res => res.json())
  })


  return <div>

    <button className='btn btn-secondary'
      onClick={() => toast.success ("This is a success Toast")}
    >
      Click me
    </button>

    <SignedOut>
      <SignInButton mode="model">
        <button>Login</button>
      </SignInButton>
    </SignedOut>

    <SignedIn>
      <SignOutButton />
    </SignedIn>
  </div>
}

export default HomePage