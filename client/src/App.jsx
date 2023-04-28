import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import {TasksPage} from './pages/TasksPage'
import {TaskFormPage} from "./pages/TaskFormPage";
import { Navigations } from "./components/Navigations";
function App() {
  return (
    <BrowserRouter>
    <Navigations />
    
    <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/tasks/:id" element={<TaskFormPage />} />
        <Route path="/tasks-create" element={<TaskFormPage />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App