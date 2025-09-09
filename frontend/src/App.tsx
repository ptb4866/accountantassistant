import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Research from './pages/Research'
import Policy from './pages/Policy'
import Reporting from './pages/Reporting'
import Systems from './pages/Systems'
import Audit from './pages/Audit'
import Advice from './pages/Advice'
import './index.css'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Research />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/reporting" element={<Reporting />} />
        <Route path="/systems" element={<Systems />} />
        <Route path="/audit" element={<Audit />} />
        <Route path="/advice" element={<Advice />} />
      </Routes>
    </Layout>
  )
}
