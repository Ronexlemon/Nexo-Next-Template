'use client';

import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import AddForm from '@/components/ui/AddItemForm';
import { useMarketplace } from '@/hooks/useMarketPlace';


export default function Home() {
  const [userAddress, setUserAddress] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const { address, isConnected } = useAccount();
  const router = useRouter();
 

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col justify-center items-center p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        There you go... a canvas for your next Crossfi project!
      </h1>

      {isConnected ? (
        <p className="text-center text-gray-600">
          Your address: <span className="font-mono">{userAddress}</span>
        </p>
      ) : (
        <p className="text-red-500">No Wallet Connected</p>
      )}

      {/* 🧾 AddForm component */}
      <div className="w-full max-w-md">
        <AddForm />
      </div>

      {/* 🔁 Navigate to /marketplace */}
      <button
        onClick={() => router.push('/marketplace')}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Go to Marketplace
      </button>
    </div>
  );
}
