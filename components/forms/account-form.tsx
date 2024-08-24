'use client';
import { useState, ChangeEvent, FormEvent } from 'react';

const initialAccounts = [
  'Savings Account',
  'Current Account',
  'Fixed Deposit',
  'Recurring Deposit',
  'NRI Account',
];

export default function AccountForm() {
  const [formData, setFormData] = useState({
    account: '',
    bankHolderName: '',
    bankName: '',
    accountNumber: '',
    openingBalance: '',
    contactNumber: '',
    bankAddress: '',
  });

  const [accounts, setAccounts] = useState(initialAccounts);
  const [newAccount, setNewAccount] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleAddAccount = () => {
    if (newAccount && !accounts.includes(newAccount)) {
      setAccounts((prevAccounts) => [...prevAccounts, newAccount]);
      setNewAccount('');
    }
  };

  return (
    <div className="flex-1 p-6 md:p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Create New Bank Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="account" className="font-medium">Account</label>
            <select
              name="account"
              id="account"
              value={formData.account}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            >
              <option value="">Select Account</option>
              {accounts.map((account, index) => (
                <option key={index} value={account}>{account}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="bankHolderName" className="font-medium">Bank Holder Name</label>
            <input
              type="text"
              name="bankHolderName"
              id="bankHolderName"
              placeholder="Enter Bank Holder Name"
              value={formData.bankHolderName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="bankName" className="font-medium">Bank Name</label>
            <input
              type="text"
              name="bankName"
              id="bankName"
              placeholder="Enter Bank Name"
              value={formData.bankName}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="accountNumber" className="font-medium">Account Number</label>
            <input
              type="text"
              name="accountNumber"
              id="accountNumber"
              placeholder="Enter Account Number"
              value={formData.accountNumber}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="openingBalance" className="font-medium">Opening Balance</label>
            <input
              type="text"
              name="openingBalance"
              id="openingBalance"
              placeholder="Enter Opening Balance"
              value={formData.openingBalance}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="contactNumber" className="font-medium">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              id="contactNumber"
              placeholder="Enter Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="bankAddress" className="font-medium">Bank Address</label>
            <input
              type="text"
              name="bankAddress"
              id="bankAddress"
              placeholder="Enter Bank Address"
              value={formData.bankAddress}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
        </div>
        <div className="flex space-x-4 mt-6">
          <button type="button" className="bg-gray-300 text-black px-4 py-2 rounded-lg">
            Cancel
          </button>
          <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded-lg">
           Create
          </button>
        </div>
      </form>
    </div>
  );
}
