import { useState } from 'react'
import './App.css'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import Imp1 from './components/Implimentation1'
import Imp2 from './components/Implimentation2'
import Imp3 from './components/Implimentation3'
import Imp4 from './components/Implimentation4'
import Imp5 from './components/Implimentation5'
import Imp6 from './components/Implimentation6'
import Imp7 from './components/Implimentation7'
import Imp8 from './components/Implimentation8'
import Imp9 from './components/Implimentation9'
import Landing from './components/landing'
import Nav from './components/nav'
import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  // CardHeader,
  // CardTitle,
} from "@/components/ui/card"


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div>
        <div className='w-full'><Nav/></div>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/one' element={<Imp1/>}/>
          <Route path='/two' element={<Imp2/>}/>
          <Route path='/three' element={<Imp3/>}/>
          <Route path='/four' element={<Imp4/>}/>
          <Route path='/five' element={<Imp5/>}/>
          <Route path='/six' element={<Imp6/>}/>
          <Route path='/seven' element={<Imp7/>}/>
          <Route path='/eight' element={<Imp8/>}/>
          <Route path='/nine' element={<Imp9/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
