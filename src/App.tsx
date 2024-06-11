import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pageComponents/Login'

const App: React.FC = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
