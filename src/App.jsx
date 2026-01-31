import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import OverviewPage from "./pages/OverviewPage/OverviewPage";
import RepositoriesPage from "./pages/RepositoriesPage/RepositoriesPage";
import ProjectsPage from "./pages/ProjectsPage/ProjectsPage";
import PackagesPage from "./pages/PackagesPage/PackagesPage";
import StarsPage from "./pages/StarsPage/StarsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<OverviewPage />} />
          <Route path="repositories" element={<RepositoriesPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="packages" element={<PackagesPage />} />
          <Route path="stars" element={<StarsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
