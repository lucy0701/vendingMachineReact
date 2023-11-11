import { Route, Routes } from 'react-router-dom';
import Template from './page/Template';
import MachinePage from './page/MachinePage';
import ManagerPage from './page/ManagerPage';

export default function Router() {
  return (
    <Routes>
      <Route element={<Template />}>
        <Route path="/" element={<MachinePage />} />
        <Route path="/manager" element={<ManagerPage />} />
      </Route>
    </Routes>
  );
}
