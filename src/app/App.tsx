import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CustomCursor } from './components/CustomCursor';
import { AdminContactViewer } from './components/AdminContactViewer';
import { SupabaseTester } from './components/SupabaseTester';
import { HomePage } from './pages/HomePage';

export default function App() {
  return (
    <div className="bg-slate-950 text-white antialiased">
      <CustomCursor />
      <AdminContactViewer />
      <SupabaseTester />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}
