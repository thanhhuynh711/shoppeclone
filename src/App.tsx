import useRouteElements from "./useRouteElements"
import { ToastContainer  } from "react-toastify";
import "react-toastify/ReactToastify.css"


function App() {

  const routeElements = useRouteElements()

  return (
    <div>
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App
