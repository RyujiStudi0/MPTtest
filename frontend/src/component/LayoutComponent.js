import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">EmployeeComponent</Link>
          </li>
          <li>
            <Link to="/DepartmentComponent">DepartmentComponent</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;