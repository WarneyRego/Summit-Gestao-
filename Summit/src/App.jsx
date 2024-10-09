import Container from './componentes/pages/Container'
import './App.css'
import Company from './componentes/pages/Company'
import Contact from './componentes/pages/Contact'
import  Home from './componentes/pages/Home'
import NewProject from './componentes/pages/NewProject'
import Navbar from './componentes/layouts/Navbar'
import Footer from './componentes/layouts/Footer'
import Projeto from './componentes/pages/Projeto'
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom';
import Projects from './componentes/pages/Project'

function App() {


  return (
  
    <Router>
      <Navbar/>
    <Container customClass='container'>
      
        
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/Projects' element={<Projects />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Company' element={<Company />} />
        <Route path='/NewProject' element={<NewProject />} />
        <Route path='/project/:id' element={<Projeto />} />
      </Routes>
     
    </Container>
    <Footer/>
  </Router>
  )
}

export default App
