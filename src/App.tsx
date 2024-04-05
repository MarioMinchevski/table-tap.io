import { ModalOverlayProvider } from "./Context/ModalOverlayProvider"
import { SelectedTableProvider } from "./Context/SelectedTableProvider"
import { Homepage } from "./Pages/Homepage"


function App() {

  return (
    <>
      <SelectedTableProvider>
        <ModalOverlayProvider>
          <Homepage />
        </ModalOverlayProvider>
      </SelectedTableProvider>
    </>
  )
}

export default App
