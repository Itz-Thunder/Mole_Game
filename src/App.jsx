import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Components/HOme"


const App = () => {
    return (
        <>
            <BrowserRouter>
                <div className="container-fluid p-0">
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    )
}

export default App