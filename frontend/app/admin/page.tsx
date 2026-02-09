"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [list, setList] = useState([]);

  useEffect(() => {
    // Ambil data dari backend tiap kali halaman dibuka
    axios.get("http://127.0.0.1:8000/attendance-list")
      .then(res => setList(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Rekap Presensi QR</h1>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">NIM</th>
              <th className="px-4 py-2">Waktu Hadir</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item: any) => (
              <tr key={item.id} className="border-b text-center">
                <td className="px-4 py-2">{item.nama}</td>
                <td className="px-4 py-2">{item.nim}</td>
                <td className="px-4 py-2">{new Date(item.waktu_hadir).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}