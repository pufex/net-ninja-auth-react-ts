import "./assets/App.css"

import { Routes, Route } from "react-router-dom"

import Nav from "./components/Nav/Nav"

import Guides from "./page/Guides/Guides"

import IconsProvider from "./contexts/Icons"
import DatabaseProvider from "./contexts/Database"
import ModalsProvider from "./contexts/Modals/Modals"

function App() {

  return <IconsProvider>
    <DatabaseProvider>
      <ModalsProvider>
        <Nav /> 
        <Routes>
          <Route 
            path="/"
            element={<Guides />}
          />
        </Routes>
      </ModalsProvider>
    </DatabaseProvider>
  </IconsProvider>
  
}

export default App
