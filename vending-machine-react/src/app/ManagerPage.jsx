import React from 'react';
import ManagerInput from './components/ManagerInput';
import ManagerSelect from './components/ManagerSelect';

export default function ManagerPage() {
  return (
    <form name="manage-page" id="manager-page" method="POST">
      <ManagerSelect />
      <ManagerInput />
      <input type="submit" id="save-item" value="저장" />
    </form>
  );
}
