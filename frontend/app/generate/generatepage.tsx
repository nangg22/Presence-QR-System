"use client";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function GenerateQR() {
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [qrValue, setQrValue] = useState("");

  const handleGenerate = () => {
    if (nama && nim) {
      setQrValue(`${nama},${nim}`); // Format sesuai logika scanner kita
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">QR Code Generator Karyawan</h1>
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md space-y-4">
        <input 
          type="text" placeholder="Nama Lengkap" 
          className="w-full p-2 border rounded"
          onChange={(e) => setNama(e.target.value)}
        />
        <input 
          type="text" placeholder="NIM / ID Karyawan" 
          className="w-full p-2 border rounded"
          onChange={(e) => setNim(e.target.value)}
        />
        <button 
          onClick={handleGenerate}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Buat QR Code
        </button>

        {qrValue && (
          <div className="flex flex-col items-center mt-6 p-4 border-t">
            <QRCodeCanvas value={qrValue} size={200} />
            <p className="mt-4 font-mono text-sm">{qrValue}</p>
            <button 
              onClick={() => window.print()} 
              className="mt-2 text-blue-500 underline text-sm"
            >
              Cetak QR
            </button>
          </div>
        )}
      </div>
    </div>
  );
}