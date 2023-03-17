import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/*
import GroupPage from './components/GroupPage'
import Register from "./components/Register";
import Login from "./components/Login";
*/
import Layout from './components/Layout';
import Users from './pages/users';
import EmployeeCatalog from './pages/employee_catalog';
import Landingpage from './components/Landingpage';
import Testpage from './components/Testpage';
import Twocolumn from './components/Twocolumn';
import AdminOverview from './components/AdminOverview';
import AdminDictionary from './components/AdminDictionary';
import CaseFiles from './pages/casefiles';
import CaseFilesForm from './pages/casefiles/form';
import IncidentManagement from './pages/incident_mng';

/*
import PageNotFound from './components/PageNotFound'
import ProfilePage from './components/ProfilePage'
import Footer from "./components/Footer";
import FAQ from "./components/FAQ";
*/

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Landingpage />} />
          <Route exact path="users" element={<Users />} />
          <Route path="testpage" element={<Testpage />} />
          <Route path="home" element={<Testpage />} />
          <Route path="/table/:incident/*" element={<IncidentManagement />} />
          <Route path="unassigned" element={<Testpage />} />
          <Route path="employee_catalog" element={<EmployeeCatalog />} />
          <Route path="twocolumn" element={<Twocolumn />} />
          <Route exact path="casefiles">
            <Route exact index element={<CaseFiles />} />
            <Route exact path="create" element={<CaseFilesForm />} />
          </Route>
          <Route exact path="admin">
            <Route exact index element={<AdminOverview />} />
            <Route exact path="dictionary" element={<AdminDictionary />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
