"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const OrderSummaryModal = ({ data, onClose }) => {
  if (!data) return null;

  const [isFallback, setIsFallback] = useState(false);
  const [step, setStep] = useState("summary");
  const [isLoading, setIsLoading] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const handleConfirmOrder = async () => {
    if (!customer.name || !customer.phone || !customer.address) {
      toast.error("Please fill all fields");
      return;
    }
    setIsLoading(true);

    const payload = {
      customer,
      panel: data.panel,
      inverter: data.inverter,
      total: grandTotal,
    };

    const res = await fetch("/api/place-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
      setIsLoading(false);
      setStep("success");
    }
  };

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
        {step === "summary" && (
          <>
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
                  {data.inverter.quantity > 1 && (
                    <>{data.inverter.quantity} × </>
                  )}
                  {data.inverter.watt / 1000}kW
                </p>

                <p>PKR {data.inverter.total.toLocaleString()}</p>
              </div>
            </div>

            <div className="border-t pt-3 text-lg font-bold">
              Grand Total: PKR {grandTotal.toLocaleString()}
            </div>
          </>
        )}
        {step === "details" && (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              Customer Information
            </h2>

            <input
              type="text"
              placeholder="Full Name"
              value={customer.name}
              onChange={(e) =>
                setCustomer({ ...customer, name: e.target.value })
              }
              required
              className="border w-full p-2 rounded mb-2"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={customer.phone}
              onChange={(e) =>
                setCustomer({ ...customer, phone: e.target.value })
              }
              required
              className="border w-full p-2 rounded mb-2"
            />

            <textarea
              placeholder="Complete Address"
              value={customer.address}
              onChange={(e) =>
                setCustomer({ ...customer, address: e.target.value })
              }
              required
              className="border w-full p-2 rounded mb-4"
            />

            <button
              disabled={isLoading}
              onClick={handleConfirmOrder}
              className=" 
    w-full py-2 rounded text-white
    bg-blue-600 hover:bg-blue-700
    disabled:bg-gray-400
    disabled:cursor-not-allowed
    disabled:hover:bg-gray-400
  "
            >
              {isLoading ? "Processing..." : "Confirm Order"}
            </button>
          </>
        )}
        {step === "success" && (
          <div className="text-center py-10">
            <h2 className="text-2xl font-semibold text-green-600 ">
              ✅ Order Confirmed!
            </h2>
            <p className="mt-2 text-muted-foreground">
              Thank you for your order. Our team will contact you shortly on
              your phone number.
            </p>

            <button
              onClick={onClose}
              className="mt-6 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-6 py-2 rounded"
            >
              Close
            </button>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {step === "summary" && (
            <button
              onClick={() => setStep("details")}
              className="cursor-pointer mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Proceed to Checkout
            </button>
          )}

          {/* <a
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full text-center"
          >
            WhatsApp Quotation
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryModal;
