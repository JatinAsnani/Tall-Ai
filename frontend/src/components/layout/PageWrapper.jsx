import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function PageWrapper({ title, children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className="ml-60">
        <TopBar title={title} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
