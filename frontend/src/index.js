import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LayoutComponent from "./component/LayoutComponent";
import EmployeeComponent from "./component/EmployeeComponent";
import DepartmentComponent from "./component/DepartmentComponent";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutComponent />}>
          <Route index element={<EmployeeComponent />} />
          <Route path="DepartmentComponent" element={<DepartmentComponent />} />
          {/* <Route path="contact" element={<Contact />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);