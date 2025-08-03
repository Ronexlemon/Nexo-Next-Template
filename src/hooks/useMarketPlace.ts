// hooks/useMarketplace.ts
import { useAccount, useWalletClient } from 'wagmi';
import { createPublicClient, http, parseEther } from 'viem';
import { useEffect, useState } from 'react';
import abi from '@/abi/MarketPlace.json';
import { CONTRACT_MARKET as contractAddress } from '@/constant';
import { crossfi } from '@/chains/crossfi';

export const publicClient = createPublicClient({
  chain: crossfi,
  transport: http()
})
type MarketItem = {
  owner: `0x${string}`;
  name: string;
  amount: bigint;
  sold: boolean;
};

export function useMarketplace() {
   //const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();

  const [allItems, setAllItems] = useState<MarketItem[]>([]);
  const [myItems, setMyItems] = useState<MarketItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchItems = async () => {
    if (!publicClient || !address) return;

    try {
      setIsLoading(true);

      const total: any = await publicClient.readContract({
        address: contractAddress,
        abi: abi.abi,
        functionName: 'getMarketItemCount',
      });

      const calls = [];
      for (let i = 0; i < Number(total); i++) {
        calls.push(
          publicClient.readContract({
            address: contractAddress,
            abi: abi.abi,
            functionName: 'getMarketItem',
            args: [i],
          })
        );
      }

      const results = await Promise.all(calls);

      const items: MarketItem[] = results.map((item: any) => ({
        owner: item[0],
        name: item[1],
        amount: item[2],
        sold: item[3],
      }));

      setAllItems(items);
      setMyItems(items.filter((item) => item.owner.toLowerCase() === address?.toLowerCase()));
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (address) fetchItems();
  }, [address]);

  const buy = async (index: number, amount: string) => {
    if (!walletClient) {
      alert("Wallet not connected")
      throw new Error('Wallet not connected');
    } 
    alert("Wallet  connected")
    return await walletClient.writeContract({
      address: contractAddress,
      abi: abi.abi,
      functionName: 'buy',
      args: [index],
      value: parseEther(amount),
      account: walletClient.account,
    });
  };

  const addItem = async (name: string, amount: string) => {
    if (!walletClient) {
      alert("No Wallet")
      console.log("THE IS NO WALLET")
      throw new Error('Wallet not connected');

    }
    alert("Wallet  connected")
    return await walletClient.writeContract({
      address: contractAddress,
      abi: abi.abi,
      functionName: 'addItem',
      args: [name, parseEther(amount)],
      account: walletClient.account,
    });
  };

  return {
    allItems,
    myItems,
    isLoading,
    buy,
    addItem,
    refetch: fetchItems,
    fetchItems
  };
}
