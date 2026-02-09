"use client";
import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

export default function ScanPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    }, false);

    const handleScan = async (decodedText: string) => {
      setScanResult(decodedText);
      // Anggap isi QR Code adalah "Nama,NIM" (Contoh: Danang,2024001)
      const [nama, nim] = decodedText.split(",");
      
      try {
        await axios.post(`http://127.0.0.1:8000/attend?nama=${nama}&nim=${nim}`);
        alert(`Absen Berhasil: ${nama}`);
        scanner.clear(); // Berhenti scan setelah sukses
      } catch (err) {
        console.error("Gagal absen", err);
      }
    };

    scanner.render(
      handleScan,
      (err) => { console.warn(err); }
    );

    return () => scanner.clear();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Scan QR Presensi</h1>
      <div id="reader" className="w-full max-w-md"></div>
      {scanResult && <p className="mt-4 text-green-600">Hasil Scan: {scanResult}</p>}
    </div>
  );
}