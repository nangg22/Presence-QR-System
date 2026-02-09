"use client";
import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import axios from "axios";

export default function ScanPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    // 1. Inisialisasi scanner
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      aspectRatio: 1.0, // Tambahan biar kotak kamera kotak sempurna
    }, false);

    // 2. Fungsi handle scan yang lebih aman
    const onScanSuccess = async (decodedText: string) => {
      // Supaya tidak terjadi pengiriman data berulang kali saat scan
      if (scanResult === decodedText) return; 

      setScanResult(decodedText);
      const [nama, nim] = decodedText.split(",");

      if (!nama || !nim) {
        alert("Format QR Salah! Gunakan format: Nama,NIM");
        return;
      }

      try {
        // Kirim ke Backend FastAPI
        await axios.post(`http://127.0.0.1:8000/attend?nama=${nama.trim()}&nim=${nim.trim()}`);
        alert(`Absen Berhasil: ${nama}`);
        
        // Refresh halaman biar scanner bisa dipakai lagi atau redirect
        window.location.reload(); 
      } catch (err: any) {
        console.error("Gagal absen", err);
        alert("Gagal kirim data ke server. Pastikan backend nyala!");
      }
    };

    const onScanFailure = (err: any) => {
      // Kita biarkan kosong agar tidak memenuhi console log tiap detik
    };

    scanner.render(onScanSuccess, onScanFailure);

    // Cleanup saat komponen ditutup
    return () => {
      scanner.clear().catch(error => console.error("Failed to clear scanner", error));
    };
  }, [scanResult]); // Dependency ditambahkan

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4 text-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Danang Presence QR</h1>
      
      <div className="bg-white p-4 rounded-xl shadow-2xl w-full max-w-md">
        <div id="reader" className="overflow-hidden rounded-lg"></div>
      </div>

      {scanResult && (
        <div className="mt-6 p-4 bg-green-500/20 border border-green-500 rounded-lg">
          <p className="text-green-400 font-semibold">Berhasil Mendeteksi: {scanResult}</p>
        </div>
      )}

      <button 
        onClick={() => window.location.href = '/admin'}
        className="mt-8 text-sm text-gray-400 underline hover:text-white transition"
      >
        Lihat Rekap Absen
      </button>
    </div>
  );
}