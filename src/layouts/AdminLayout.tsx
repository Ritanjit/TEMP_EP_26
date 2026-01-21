import { Outlet,Link } from 'react-router-dom';
import '../globals.css';

interface Props {
  title: string;
}

const AdminLayout: React.FC<Props> = ({ title }) => {
  return (
    <div className="admin-container flex min-h-screen bg-[var(--color-bg-dark)] text-white">
      {/* Admin Sidebar */}
      <aside className="admin-sidebar w-64 bg-[var(--color-bg-card)] p-4">
        <div className="logo mb-8">
          <h1 className="text-xl font-bold gradient-text">Euphuism Admin</h1>
        </div>
        <nav className="admin-nav">
          <ul className="space-y-2">
            <li><Link to="/admin" className="block p-2 hover:bg-white/10 rounded">Dashboard</Link></li>
            <li><Link to="/admin/events" className="block p-2 hover:bg-white/10 rounded">Events</Link></li>
            <li><Link to="/admin/sponsors" className="block p-2 hover:bg-white/10 rounded">Sponsors</Link></li>
            <li><Link to="/admin/media" className="block p-2 hover:bg-white/10 rounded">Media</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Admin Content Area */}
      <main className="admin-content flex-1 p-8">
        <header className="mb-8">
          <h2 className="text-2xl font-bold">{title}</h2>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
