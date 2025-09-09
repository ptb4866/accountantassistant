import { PropsWithChildren } from 'react'
import { NavLink } from 'react-router-dom'

export default function Layout({ children }: PropsWithChildren) {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-lg text-sm font-medium ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur z-10">
        <div className="container-responsive flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-blue-600" />
            <span className="font-semibold">Tech Accountant</span>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={linkClass} end>Research</NavLink>
            <NavLink to="/policy" className={linkClass}>Policy</NavLink>
            <NavLink to="/reporting" className={linkClass}>Reporting</NavLink>
            <NavLink to="/systems" className={linkClass}>Systems</NavLink>
            <NavLink to="/audit" className={linkClass}>Audit</NavLink>
            <NavLink to="/advice" className={linkClass}>Advice</NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1 container-responsive py-6">
        {children}
      </main>
      <footer className="border-t border-gray-200 dark:border-gray-800 py-4">
        <div className="container-responsive text-xs text-gray-500">© {new Date().getFullYear()} Technical Accountant Assistant</div>
      </footer>
    </div>
  )
}