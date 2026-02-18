"use client";
export default function SystemTypePopup({ onSelect, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold text-center mb-4">
          Select Your Solar System Type <br />
          <span className="text-sm text-gray-600">
            Meherbani krke apna solar system ka type select kren
          </span>
        </h2>

        <div className="space-y-3">
          <button
            onClick={() => onSelect("hybrid")}
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
          >
            Hybrid System
          </button>
          <button
            onClick={() => onSelect("onGrid")}
            className="w-full bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
          >
            On-Grid System
          </button>
          <button
            onClick={() => onSelect("offGrid")}
            className="w-full bg-orange-600 text-white p-2 rounded-md hover:bg-orange-700"
          >
            Off-Grid System
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
