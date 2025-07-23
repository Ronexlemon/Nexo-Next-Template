import { useMarketplace } from "@/hooks/useMarketPlace";
import React, { useState } from "react";

const AddForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
  });
    
 const { addItem } = useMarketplace()
  
    

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async(e:any) => {
    e.preventDefault();
      console.log("Submitted:", formData);
      await addItem(formData.name,formData.amount)
    
  };

  return (
    <div className="flex justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded p-2 mt-1"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="number"
            name="amount"
            className="w-full border rounded p-2 mt-1"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddForm;
