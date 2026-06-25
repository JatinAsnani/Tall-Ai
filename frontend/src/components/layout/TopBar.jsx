import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function TopBar({ title }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">{user?.business_name || user?.name}</span>
        <button
          onClick={() => { logout(); navigate('/login') }}
          className="text-sm text-gray-500 hover:text-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
