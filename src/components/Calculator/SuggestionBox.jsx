"use client";

import {
  BATTERIES_CATALOG,
  INVERTERS_CATALOG,
  PANELS_CATALOG,
} from "@/data/ApplianceData";
import { useEffect, useState } from "react";

const SuggestionBox = ({ calc, systemType }) => {
  const {
    totalWatts,
    inverterKVA,
    batteryAh,
    bestPanel,
    bestInverter,
    bestBattery,
    approxCostPKR,
  } = calc;

  const [selectedSystemType, setSelectedSystemType] = useState(
    systemType || "hybrid"
  );

  useEffect(() => {
    if (systemType) {
      setSelectedSystemType(systemType); // 🔥 FIX APPLIED
    }
  }, [systemType]);

  // --- Catalogs filter by systemType ---
  const panelCatalog = PANELS_CATALOG[selectedSystemType] || [];
  const batteryCatalog = BATTERIES_CATALOG[selectedSystemType] || [];
  const inverterCatalog = INVERTERS_CATALOG[selectedSystemType] || [];
  console.log("panel", panelCatalog);
  console.log("inv", inverterCatalog);

  // --- States for selected items ---
  const [selectedPanelId, setSelectedPanelId] = useState(bestPanel?.id);
  const [selectedBatteryId, setSelectedBatteryId] = useState(bestBattery?.id);
  const [selectedInverterId, setSelectedInverterId] = useState(
    bestInverter?.id
  );

  // When systemType changes → reset selections
  useEffect(() => {
    if (panelCatalog.length > 0) setSelectedPanelId(panelCatalog[0].id);
    if (batteryCatalog.length > 0) setSelectedBatteryId(batteryCatalog[0].id);
    if (inverterCatalog.length > 0)
      setSelectedInverterId(inverterCatalog[0].id);
  }, [selectedSystemType, panelCatalog, batteryCatalog, inverterCatalog]);

  // --- Find selected items
  const selectedPanel =
    panelCatalog.find((p) => p.id === selectedPanelId) || bestPanel;
  const selectedBattery =
    batteryCatalog.find((b) => b.id === selectedBatteryId) || bestBattery;
  const selectedInverter =
    inverterCatalog.find((i) => i.id === selectedInverterId) || bestInverter;

  const platesNeeded = selectedPanel?.actualWatt
    ? Math.ceil(totalWatts / selectedPanel.actualWatt)
    : 0;

  const inverterNeeded = selectedInverter?.actualWatt
    ? Math.ceil(totalWatts / selectedInverter.actualWatt)
    : 1;

  if (!totalWatts || totalWatts <= 0)
    return (
      <div className="rounded-lg border p-4 text-center text-sm text-muted-foreground">
        Please add some loads to see suggestions.
      </div>
    );

  const whatsappMessage = `
🌞 *Solar System Quotation Request* 🌞

*System Type:* ${selectedSystemType.toUpperCase()}
*Total Load:* ${totalWatts.toLocaleString()} W
*Inverter Required:* ${inverterKVA} kVA
*Battery Capacity:* ${batteryAh} Ah

🔹 *Suggested Equipment:*
• Panel: ${selectedPanel?.name} (${selectedPanel?.watt}W × ${platesNeeded} pcs)
${
  selectedSystemType !== "onGrid"
    ? `• Battery: ${selectedBattery?.name} (${selectedBattery?.ah}Ah)`
    : ""
}
• Inverter: ${selectedInverter?.name} (${selectedInverter?.kva}kVA)

💰 *Estimated Total Cost:* PKR ${approxCostPKR.toLocaleString()}
`.trim();

  const WHATSAPP_NUMBER =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923001234567";
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <div className="rounded-lg border bg-card p-5 shadow-[0_0_15px_rgba(0,0,0,0.15)]">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
        <h3 className=" text-center sm:text-left text-2xl font-semibold">
          Suggested Equipment
        </h3>
        <select
          className="border rounded px-2 py-1 mb-4 sm:w-50 w-full"
          value={selectedSystemType}
          onChange={(e) => setSelectedSystemType(e.target.value)}
        >
          <option value="hybrid">Hybrid System</option>
          <option value="onGrid">On-Grid System</option>
          <option value="offGrid">Off-Grid System</option>
        </select>
      </div>

      {/* ☀️ Solar Panel Section */}
      {selectedPanel && (
        <div className="mb-5 border p-5 rounded-md shadow-sm">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h4 className="font-semibold">Solar Panel</h4>
            <select
              className="border rounded px-2 py-1"
              value={selectedPanelId}
              onChange={(e) => setSelectedPanelId(e.target.value)}
            >
              {panelCatalog.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.brand} {p.watt}W
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <img
              src={selectedPanel.imgUrl}
              alt={selectedPanel.name}
              className="w-full h-full sm:w-24 sm:h-24 object-cover rounded"
            />
            <div>
              <p className="font-semibold">{selectedPanel.name}</p>
              <p className="text-sm text-muted-foreground">
                {selectedPanel.brand}
              </p>
              <p>
                PKR{" "}
                <span className="font-semibold">
                  {selectedPanel.pricePKR.toLocaleString()}
                </span>
              </p>
              <p>
                You need <strong>{platesNeeded}</strong> panels of{" "}
                {selectedPanel.watt} W
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 🔋 Battery Section (hide for On-Grid) */}
      {/* {systemType !== "onGrid" && selectedBattery && (
        <div className="mb-5 border p-5 rounded-md shadow-sm">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h4 className="font-semibold">Battery</h4>
            <select
              className="border rounded px-2 py-1"
              value={selectedBatteryId}
              onChange={(e) => setSelectedBatteryId(e.target.value)}
            >
              {batteryCatalog.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.brand} {b.ah}Ah
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <img
              src={selectedBattery.imgUrl}
              alt={selectedBattery.name}
              className="w-full h-full sm:w-24 sm:h-24 object-cover rounded"
            />
            <div>
              <p className="font-semibold">{selectedBattery.name}</p>
              <p className="text-sm text-muted-foreground">
                {selectedBattery.brand}
              </p>
              <p>
                PKR{" "}
                <span className="font-semibold">
                  {selectedBattery.pricePKR.toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </div>
      )} */}

      {/* ⚙️ Inverter Section */}
      {selectedInverter && (
        <div className="mb-5 border p-5 rounded-md shadow-sm">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h4 className="font-semibold">Inverter</h4>
            <select
              className="border rounded px-2 py-1"
              value={selectedInverterId}
              onChange={(e) => setSelectedInverterId(e.target.value)}
            >
              {inverterCatalog.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.brand} {inv.kva}kVA
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <img
              src={selectedInverter.imgUrl}
              alt={selectedInverter.name}
              className="w-full h-full sm:w-24 sm:h-24 object-cover rounded"
            />
            <div>
              <p className="font-semibold">{selectedInverter.name}</p>
              <p className="text-sm text-muted-foreground">
                {selectedInverter.brand}
              </p>
              <p>
                PKR{" "}
                <span className="font-semibold">
                  {selectedInverter.pricePKR.toLocaleString()}
                </span>
              </p>
              <p>{selectedInverter.kva} kVA Capacity</p>
              <p>
                You need <strong>{inverterNeeded}</strong> inverter(s) of{" "}
                {selectedInverter.kva} kVA ({selectedInverter.actualWatt}W
                actual)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 🛒 Footer Buttons */}
      <div className="flex flex-col md:flex-row gap-3 mt-4">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full"
          onClick={() => alert("Redirect to Buy Now page (coming soon)")}
        >
          Buy Now
        </button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full text-center"
        >
          WhatsApp Quotation
        </a>
      </div>
    </div>
  );
};

export default SuggestionBox;
