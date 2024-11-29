import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./Components/Homepage";
import Form from "./Components/Form";
import Create from "./Components/Create";
import Edit from "./Components/Edit";
import View from "./Components/View";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route element={<Homepage />} path="/" />
          <Route element={<Form />} path="/form">
            <Route element={<Create />} path="create" />
            <Route element={<Edit />} path=":id/edit" />
            <Route element={<View />} path=":id" />
          </Route>
        </Routes>
        <Toaster toastOptions={{ style: { fontSize: "1.6rem" } }} />
      </div>
    </BrowserRouter>
  );
}

export default App;
