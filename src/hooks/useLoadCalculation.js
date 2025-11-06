import { useMemo } from "react";
import {
  PANELS_CATALOG,
  INVERTERS_CATALOG,
  BATTERIES_CATALOG,
} from "../data/ApplianceData";

export function useLoadCalculations(rows, systemType = "hybrid") {
  // 🔹 1. Total load
  const totalWatts = useMemo(
    () =>
      rows.reduce(
        (sum, r) => sum + (Number(r.watts) || 0) * (Number(r.qty) || 0),
        0
      ),
    [rows]
  );

  // 🔹 2. Filter catalogs
  const panelCatalog = PANELS_CATALOG[systemType] || [];
  const inverterCatalog = INVERTERS_CATALOG[systemType] || [];
  const batteryCatalog = BATTERIES_CATALOG[systemType] || [];
  // 🔹 3. Inverter sizing (kVA)
  const inverterKVA = useMemo(() => {
    if (totalWatts <= 0) return 0;
    return Math.ceil(((totalWatts * 1.3) / 1000) * 10) / 10;
  }, [totalWatts]);

  // 🔹 4. Battery sizing (Ah)
  const batteryAh = useMemo(() => {
    if (systemType === "onGrid" || totalWatts <= 0) return 0;
    const hours = systemType === "offGrid" ? 6 : 3;
    const dod = 0.5;
    const ah = (totalWatts * hours) / (12 * dod);
    return Math.ceil(ah / 50) * 50;
  }, [totalWatts, systemType]);

  // 🔹 5. Best Panel (actual watt)
  const bestPanel = useMemo(() => {
    if (totalWatts <= 0 || !panelCatalog.length) return null;

    let best = null;
    for (const p of panelCatalog) {
      const actualWatt = p.actualWatt || p.watt;
      const needed = Math.ceil(totalWatts / actualWatt);
      const cost = needed * (p.pricePKR || 0);
      if (!best || cost < best.cost) best = { ...p, needed, cost };
    }
    return best;
  }, [totalWatts, panelCatalog]);

  // 🔹 6. Best Inverter (actual output watt)
  const bestInverter = useMemo(() => {
    if (totalWatts <= 0 || !inverterCatalog.length) return null;

    // ab buffer nahi dena — direct compare actualWatt se
    let best = inverterCatalog.find((inv) => inv.actualWatt >= totalWatts);
    console.log("best", best);

    // agar koi match nahi mila to sabse bada inverter lo
    if (!best) best = inverterCatalog[inverterCatalog.length - 1];

    return best;
  }, [totalWatts, inverterCatalog]);

  // 🔹 7. Best Battery
  const bestBattery = useMemo(() => {
    if (batteryAh <= 0 || !batteryCatalog.length) return null;
    return (
      batteryCatalog.find((b) => b.ah >= batteryAh) ||
      batteryCatalog[batteryCatalog.length - 1]
    );
  }, [batteryAh, batteryCatalog]);

  // 🔹 8. Approx total cost
  const approxCostPKR = useMemo(() => {
    if (!bestPanel || !bestInverter) return 0;
    let total = (bestPanel.cost || 0) + (bestInverter.pricePKR || 0);
    if (systemType !== "onGrid" && bestBattery)
      total += bestBattery.pricePKR || 0;
    return Math.round(total);
  }, [bestPanel, bestInverter, bestBattery, systemType]);

  return {
    totalWatts,
    inverterKVA,
    batteryAh,
    bestPanel,
    bestInverter,
    bestBattery,
    approxCostPKR,
  };
}
