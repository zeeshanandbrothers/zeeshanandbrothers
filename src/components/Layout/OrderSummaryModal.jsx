"use client";

import { useState } from "react";

const OrderSummaryModal = ({ data, onClose }) => {
  if (!data) return null;

  const [isFallback, setIsFallback] = useState(false);
  const grandTotal = data.panel.total + data.inverter.total;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className=" bg-white rounded-lg w-full max-w-lg p-6 relative">
        {/* ❌ Close */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-3 right-3 text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

        <div className="border flex gap-3 p-4 rounded mb-3">
          <img
            src={data.panel.image || "/images/solar-fallback.png"}
            alt={data.panel.name}
            className={`w-20 object-cover rounded ${
              isFallback ? "h-30 w-25" : "h-20"
            }`}
            onError={(e) => {
              setIsFallback(true);
              e.currentTarget.src = "/images/solar-fallback.png";
            }}
            onLoad={(e) => {
              if (e.currentTarget.src.includes("solar-fallback")) {
                setIsFallback(true);
              }
            }}
          />
          <div>
            <h3 className="font-semibold">Solar Panel</h3>
            <p>{data.panel.name}</p>
            <p>
              {data.panel.quantity} × {data.panel.watt}W
            </p>
            <p>PKR {data.panel.total.toLocaleString()}</p>
          </div>
        </div>

        <div className="border flex gap-3 p-4 rounded mb-3">
          <img
            src={data.inverter.image || "/images/inverter-fallback.png"}
            alt={data.inverter.name}
            className={`w-20 object-cover rounded ${
              isFallback ? "h-30 w-25" : "h-20"
            }`}
            onError={(e) => {
              setIsFallback(true);
              e.currentTarget.src = "/images/inverter-fallback.png";
            }}
            onLoad={(e) => {
              if (e.currentTarget.src.includes("inverter-fallback")) {
                setIsFallback(true);
              }
            }}
          />
          <div>
            <h3 className="font-semibold">Inverter</h3>
            <p>{data.inverter.name}</p>
            <p>
              {data.inverter.quantity} × {data.inverter.watt / 1000}kW
            </p>
            <p>PKR {data.inverter.total.toLocaleString()}</p>
          </div>
        </div>

        <div className="border-t pt-3 text-lg font-bold">
          Grand Total: PKR {grandTotal.toLocaleString()}
        </div>

        <button className="mt-4 w-full bg-green-600 text-white py-2 rounded">
          Proceed to WhatsApp / Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderSummaryModal;
