'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Edit, Trash, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
interface BankAccount {
  id: number;
  chartOfAccount: string;
  name: string;
  bank: string;
  accountNumber: string;
  currentBalance: string;
  contactNumber: string;
  bankBranch: string;
}

export const Account: React.FC = () => {
  const router = useRouter();
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
    {
      id: 1,
      chartOfAccount: '-',
      name: 'cash',
      bank: '-',
      accountNumber: '-',
      currentBalance: '$0.00',
      contactNumber: '-',
      bankBranch: '-',
    },
  ]);
  const handleAddAccountClick = () => {
    router.push('/account-form');
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const filteredBankAccounts = bankAccounts.filter((account) =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Manage Bank Account</h2>
        <Button variant="outline" className="flex items-center bg-yellow-500 text-white hover:bg-yellow-600"  
        onClick={handleAddAccountClick}>
          <Plus className="mr-2" />
          Add Account
        </Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center ">
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="bg-gray-100 border border-gray-300 text-gray-700 rounded-md px-2 py-1"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
          </select>
          <label className="text-sm text-gray-700 px-5">entries per page</label>
        </div>
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-100 border border-gray-300 text-gray-700 rounded-md px-2 py-1"
        />
      </div>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
            <th className="py-2 px-2 text-center whitespace-nowrap">Chart of Account</th>
            <th className="py-2 px-2 text-center whitespace-nowrap">Name</th>
            <th className="py-2 px-2 text-center whitespace-nowrap">Bank</th>
            <th className="py-2 px-2 text-center whitespace-nowrap">Account Number</th>
            <th className="py-2 px-2 text-center whitespace-nowrap">Current Balance</th>
            <th className="py-2 px-2 text-center whitespace-nowrap">Contact Number</th>
            <th className="py-2 px-2 text-center whitespace-nowrap">Bank Branch</th>
            <th className="py-2 px-2 text-center whitespace-nowrap">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBankAccounts.length > 0 ? (
            filteredBankAccounts.map((account) => (
              <tr key={account.id} className="text-gray-700">
                <td className="py-2 px-4 text-center border-b">{account.chartOfAccount}</td>
                <td className="py-2 px-4 text-center border-b">{account.name}</td>
                <td className="py-2 px-4 text-center border-b">{account.bank}</td>
                <td className="py-2 px-4 text-center border-b">{account.accountNumber}</td>
                <td className="py-2 px-4 text-center border-b">{account.currentBalance}</td>
                <td className="py-2 px-4 text-center border-b">{account.contactNumber}</td>
                <td className="py-2 px-4 text-center border-b">{account.bankBranch}</td>
                <td className="py-2 px-4 text-center border-b">
                  <div className="flex justify-center space-x-2">
                    <Button variant="outline" className="bg-yellow-500 text-white hover:bg-yellow-600 p-1">
                      <Edit size={16} />
                    </Button>
                    <Button variant="destructive" className="bg-red-500 text-white hover:bg-red-600 p-1">
                      <Trash size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center py-4 text-gray-500">
                No entries found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="mt-4 text-sm text-gray-700">
        Showing {filteredBankAccounts.length} to {filteredBankAccounts.length} of {bankAccounts.length} entries
      </div>
    </div>
  );
};
