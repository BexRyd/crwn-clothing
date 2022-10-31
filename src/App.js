import "./categories.styles.scss"
import Home from "./components/routes/home/home.component"
import Navigation from "./components/routes/navigation/navigation.component"
import {Routes,Route} from "react-router-dom"



const App =()=> {
return(
  <Routes>
    <Route path="/" element={<Navigation/>}>
    <Route index element={ <Home/>}/>
    </Route>
    
  
  </Routes>
)
}

export default App;
