import Link from 'next/link'

const Header = () => {
  return (
    <header>
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-32 ">
          <div className="flex space-x-5">
            <Link className="text-white hover:text-gray-400 text-2xl font-bold" href="/">Home</Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link className="text-white hover:text-gray-400 text-lg font-medium" href="/performance">Performance</Link>
            <Link className="text-white hover:text-gray-400 text-lg font-medium" href="/reliability">Reliability</Link>
            <Link className="text-white hover:text-gray-400 text-lg font-medium" href="/scale">Scale</Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header