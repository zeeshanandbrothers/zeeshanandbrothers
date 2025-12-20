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
    bestBattery,
    approxCostPKR,
  } = calc;

  const [selectedSystemType, setSelectedSystemType] = useState(
    systemType || "hybrid"
  );

  const [apiInverters, setApiInverters] = useState([]);
  const [apiPanels, setApiPanels] = useState([]);
  const [requiredPanels, setRequiredPanels] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedPanelId, setSelectedPanelId] = useState(null);
  const [selectedInverterId, setSelectedInverterId] = useState(null);

  useEffect(() => {
    if (!calc?.totalWatts || !systemType) return;

    const fetchSuggestions = async () => {
      setLoading(true);

      const res = await fetch("/api/suggested-inverters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          load: calc.totalWatts,
          selectedSystemType,
        }),
      });

      const data = await res.json();
      console.log("data", data);

      if (data.success) {
        setApiInverters(data.suggestions);
      }

      setLoading(false);
    };

    fetchSuggestions();
  }, [calc.totalWatts, selectedSystemType]);

  useEffect(() => {
    if (systemType) {
      setSelectedSystemType(systemType); // 🔥 FIX APPLIED
    }
  }, [systemType]);
  useEffect(() => {
    if (!totalWatts) return;

    const fetchPanels = async () => {
      const res = await fetch("/api/suggested-panels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ load: totalWatts }),
      });

      const data = await res.json();

      if (data.success) {
        // 🔥 selected + alternatives merge
        const allPanels = [data.selectedPanel, ...data.alternatives];

        setApiPanels(allPanels);
        setSelectedPanelId(data.selectedPanel._id); // default select
      }
    };

    fetchPanels();
  }, [totalWatts]);

  // --- Catalogs filter by systemType ---
  // const panelCatalog = PANELS_CATALOG[selectedSystemType] || [];
  const batteryCatalog = BATTERIES_CATALOG[selectedSystemType] || [];
  const inverterCatalog = apiInverters;

  // --- States for selected items ---

  // When systemType changes → reset selections
  useEffect(() => {
    // if (panelCatalog.length > 0) setSelectedPanelId(panelCatalog[0].id);
    if (apiInverters.length > 0 && !selectedInverterId) {
      setSelectedInverterId(apiInverters[0]._id);
    }
  }, [apiInverters, selectedSystemType, batteryCatalog, inverterCatalog]);

  // --- Find selected items
  const selectedPanel = apiPanels.find((p) => p._id === selectedPanelId);
  console.log("selectedPanel", selectedPanel);
  const selectedBattery = {};
  const selectedInverter = apiInverters.find(
    (inv) => inv._id === selectedInverterId
  );
  console.log("actualWatt", selectedPanel?.actualWatt);

  useEffect(() => {
    const platesNeeded = selectedPanel?.actualWatt
      ? Math.ceil(totalWatts / selectedPanel.actualWatt)
      : 0;
    console.log("platesNeeded", platesNeeded);
    setRequiredPanels(platesNeeded);
  }, [selectedPanelId, selectedPanel]);

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
• Panel: ${selectedPanel?.name} (${
    selectedPanel?.watt
  }W × ${requiredPanels} pcs)
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

  if (loading) {
    return (
      <div className="border rounded p-4 text-center">
        Calculating best inverter for your load...
      </div>
    );
  }

  if (!apiInverters.length) {
    return (
      <div className="border rounded p-4 text-center text-red-500">
        No suitable inverter found for your load.
      </div>
    );
  }
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
              {apiPanels.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.brand} {p.watt}W
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <img
              src={selectedPanel.image}
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
                  {selectedPanel.price.toLocaleString()}
                </span>
              </p>
              <p>
                You need <strong>{requiredPanels}</strong> panels of{" "}
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
      {/* {loading && (
        <div className="text-center text-sm text-muted-foreground">
          Loading inverter suggestions...
        </div>
      )} */}

      {!loading && apiInverters.length > 0 && (
        <div className="mb-5 border p-5 rounded-md shadow-sm">
          <h4 className="font-semibold mb-4">Suggested Inverters</h4>

          <div className="space-y-4">
            {apiInverters.map((inv, index) => {
              const isSelected = selectedInverterId === inv._id;

              return (
                <div
                  key={inv._id}
                  onClick={() => setSelectedInverterId(inv._id)}
                  className={`cursor-pointer border rounded-md p-4 flex gap-4 items-start
              ${isSelected ? "border-blue-600 bg-blue-50" : "border-gray-200"}
            `}
                >
                  {/* 🔘 Radio */}
                  <input
                    type="radio"
                    name="selectedInverter"
                    checked={isSelected}
                    onChange={() => setSelectedInverterId(inv._id)}
                    className="mt-1"
                  />

                  {/* 🖼 Image */}
                  <img
                    src={inv.image}
                    alt={inv.name}
                    className="w-20 h-20 object-cover rounded"
                  />

                  {/* 📄 Info */}
                  <div className="flex-1">
                    <p className="font-semibold">{inv.name}</p>
                    <p className="text-sm text-muted-foreground">{inv.brand}</p>

                    <p className="mt-1">
                      Capacity: {inv.watt / 1000}kW ({inv.actualWatt}W actual)
                    </p>

                    <p>
                      PKR{" "}
                      <span className="font-semibold">
                        {inv.price.toLocaleString()}
                      </span>
                    </p>

                    <p className="text-sm mt-1">
                      You need{" "}
                      <strong>{Math.ceil(totalWatts / inv.actualWatt)}</strong>{" "}
                      inverter(s)
                    </p>

                    {/* {index === 0 && (
                      <span className="inline-block mt-2 text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
                        Recommended
                      </span>
                    )} */}
                  </div>
                </div>
              );
            })}
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
