import { useEffect } from 'react';
import { readMachineCoins, updateMachineCoin } from '../services/machineCoin';
import { Coin } from '../types/coin';
import { useRecoilState } from 'recoil';
import { machineCoinState } from '../recoil/atoms/containerAtoms/machineCoinState';

export const useMachineCoins = () => {
  const [machineCoins, setMachineCoins] =
    useRecoilState<Coin[]>(machineCoinState);

  const getMachineCoins = async () => {
    try {
      const response = await readMachineCoins();
      if (response) {
        setMachineCoins(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveMachineCoin = async (saveMachineCoin: Coin) => {
    const { id,count } = saveMachineCoin;
    try {
      const response = await updateMachineCoin(id, count);
      if (response) {
        return getMachineCoins();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveMachineCoins = async (saveMachineCoins: Coin[]) => {
    try {
      const promises = saveMachineCoins.map(async (updateCoin) => {
        const { id, count } = updateCoin;
        await updateMachineCoin(id, count);
      })
      await Promise.all(promises);
      await getMachineCoins();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMachineCoins();
  }, []);

  return {
    getMachineCoins,
    machineCoins,
    saveMachineCoin,
    saveMachineCoins
  };
};
