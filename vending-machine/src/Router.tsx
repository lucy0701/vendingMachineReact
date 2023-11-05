import { Route, Routes } from 'react-router-dom';
import Template from './app/page/Template';
import MachinePage from './app/page/MachinePage';
import ManagerPage from './app/page/ManagerPage';

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
