import './App.css'
import TipCalculator from './Components/TipCalculator'
import logo from './images/logo.svg'

function App() {
  return (
    <>
      <img className='logo' src={logo} alt="logo" />
      <TipCalculator />
    </>
  )
}

export default App
