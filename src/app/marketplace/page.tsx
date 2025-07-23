"use client"
import { useMarketplace } from "@/hooks/useMarketPlace";
import React from "react";

const mockItems = [
  {
    owner: "0x123...abc",
    name: "Laptop",
    amount: "0.5",
    sold: false,
  },
  {
    owner: "0x456...def",
    name: "Camera",
    amount: "0.8",
    sold: true,
  },
  {
    owner: "0x123...abc",
    name: "Phone",
    amount: "0.3",
    sold: false,
  },
];

const currentUser = "0x123...abc";

const Marketplace = () => {
   

    const {allItems } = useMarketplace();
//   const allItems = mockItems;
    const ownerItems = mockItems.filter(item => item.owner === currentUser);
    

  const renderItems = (items:any) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
      {items.map((item:any, i:any) => (
        <div key={i} className="p-4 border rounded shadow bg-white">
          <p><strong>Name:</strong> {item.name}</p>
          <p><strong>Amount:</strong> {item.amount} ETH</p>
          <p><strong>Owner:</strong> {item.owner}</p>
          <p><strong>Sold:</strong> {item.sold ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛒 All Marketplace Items</h1>
      {renderItems(allItems)}

      <h2 className="text-xl font-semibold mt-8">📦 Your Listed Items</h2>
      {renderItems(ownerItems)}
    </div>
  );
};

export default Marketplace;
