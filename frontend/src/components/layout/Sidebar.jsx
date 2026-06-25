import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Dashboard', icon: '📊' },
  { to: '/chat', label: 'AI Chat', icon: '🤖' },
  { to: '/invoices', label: 'Invoices', icon: '📄' },
  { to: '/expenses', label: 'Expenses', icon: '💸' },
  { to: '/customers', label: 'Customers', icon: '👥' },
  { to: '/vendors', label: 'Vendors', icon: '🏭' },
  { to: '/payments', label: 'Payments', icon: '💰' },
  { to: '/ledger', label: 'Ledger', icon: '📒' },
  { to: '/stock', label: 'Stock', icon: '📦' },
  { to: '/reports', label: 'Reports', icon: '📈' },
  { to: '/gst', label: 'GST', icon: '🧾' },
  { to: '/settings', label: 'Settings', icon: '⚙️' },
]

export default function Sidebar() {
  return (
    <aside className="w-60 bg-sidebar min-h-screen flex flex-col fixed left-0 top-0">
      <div className="p-5 border-b border-slate-700">
        <h1 className="text-white font-bold text-xl">TallAI</h1>
        <p className="text-slate-400 text-xs mt-0.5">AI Accounting</p>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`
            }
          >
            <span>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
