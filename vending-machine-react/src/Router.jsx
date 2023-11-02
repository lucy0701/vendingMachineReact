import { Route, Routes } from 'react-router-dom';
import ManagerPage from './app/page/ManagerPage';
import Template from './app/page/Template';
import VendingBody from './app/page/VendingBody';

export default function Router() {
  return (
    <Routes>
      <Route element={<Template />}>
        <Route path="/" element={<VendingBody />} />
        <Route path="/manager" element={<ManagerPage />} />
      </Route>
    </Routes>
  );
}
