import { useState } from 'react';
import Link from 'next/link';

export default function Modal({ showModal, handleClose }) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Lütfen kayıt olun</h2>
        <div className="flex justify-between">
          <button onClick={handleClose} className="bg-gray-500 text-white px-4 py-2 rounded-md">
            İptal
          </button>
          <Link href="/login">
            <a className="bg-blue-600 text-white px-4 py-2 rounded-md">
              Kayıt Ol
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
