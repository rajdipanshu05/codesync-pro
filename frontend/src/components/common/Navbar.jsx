import { LogOut, Code2 } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { user, logout } = useAuthStore()

  return (
    <nav className='w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between'>
        {/* LEFT SECTION */}
        <div className='flex items-center gap-4 sm:gap-8'>
          {/* LOGO */}
          <Link to='/' className='flex items-center gap-3 shrink-0'>
            <div className='p-2 rounded-xl bg-blue-500/10 border border-blue-500/20'>
              <Code2 className='text-blue-500' size={22} />
            </div>

            <h1 className='hidden sm:block text-2xl font-bold text-white'>
              CodeSync
            </h1>
          </Link>

          {/* PROBLEMS */}
         <Link
  to='/problems'
  className='
    relative
    px-3 py-2
    font-semibold
    text-white
  '
>
  Code Gym 🏋️
<span
    className="
      hidden md:inline-flex
      items-center
      px-2 py-0.5
      text-[10px]
      font-bold
      rounded-full
      bg-blue-500
      text-white
      animate-pulse
    "
  >
    NEW
  </span>
  <span
    className='
      absolute
      left-0
      bottom-[-12px]

      h-[2px]
      w-full

      bg-blue-500
    '
  />
</Link>
        </div>

        {/* RIGHT SECTION */}
        <div className='flex items-center gap-2 sm:gap-4'>
          {/* USER AVATAR */}
          <div
            className='
              size-8 sm:size-10
              rounded-full
              bg-blue-500
              flex
              items-center
              justify-center
              font-bold
              text-sm sm:text-base
              text-white
              shrink-0
            '
            title={user?.username}
          >
            {user?.username?.[0]?.toUpperCase()}
          </div>

          {/* LOGOUT */}
          <button
            onClick={logout}
            className='
              flex
              items-center
              gap-2
              px-2 sm:px-4
              py-2
              rounded-xl
              bg-zinc-900
              border
              border-zinc-800
              hover:bg-zinc-800
              transition-all
              cursor-pointer
              text-white
            '
          >
            <LogOut size={18} />

            <span className='hidden sm:inline'>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
