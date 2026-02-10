"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [list, setList] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/attendance-list");
      setList(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItem = async (id: number) => {
    if (confirm("Yakin mau hapus data ini?")) {
      await axios.delete(`http://127.0.0.1:8000/attendance/${id}`);
      fetchData(); // Refresh data setelah hapus
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">📋 Rekap Presensi QR</h1>
          <button 
            onClick={() => window.location.href = '/scan'}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Buka Scanner
          </button>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Nama</th>
                <th className="px-6 py-4 text-left">NIM</th>
                <th className="px-6 py-4 text-left">Waktu</th>
                <th className="px-6 py-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {list.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium">{item.nama}</td>
                  <td className="px-6 py-4 text-gray-600">{item.nim}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(item.waktu_hadir).toLocaleString('id-ID')}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button 
                      onClick={() => deleteItem(item.id)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}