import { useMemo } from "react";
import {
  PANELS_CATALOG,
  BATTERIES_CATALOG,
  INVERTERS_CATALOG,
} from "../data/ApplianceData";

export function useLoadCalculations(rows, systemType = "hybrid") {
  const totalWatts = useMemo(
    () =>
      rows.reduce(
        (sum, r) => sum + (Number(r.watts) || 0) * (Number(r.qty) || 0),
        0
      ),
    [rows]
  );

  const inverterCatalog = INVERTERS_CATALOG[systemType];
  const panelCatalog = PANELS_CATALOG[systemType];
  const batteryCatalog = BATTERIES_CATALOG[systemType];

  // 🧮 Inverter size
  const inverterKVA = useMemo(() => {
    if (totalWatts <= 0) return 0;
    return Math.ceil(((totalWatts * 1.3) / 1000) * 10) / 10;
  }, [totalWatts]);

  // 🔋 Battery capacity
  const batteryAh = useMemo(() => {
    if (systemType === "onGrid" || totalWatts <= 0) return 0;
    const hours = systemType === "offGrid" ? 6 : 3;
    const dod = 0.5;
    const ah = (totalWatts * hours) / (12 * dod);
    return Math.ceil(ah / 50) * 50;
  }, [totalWatts, systemType]);

  // ☀️ Best Panel
  const bestPanel = useMemo(() => {
    if (totalWatts <= 0 || !panelCatalog?.length) return null;
    let best = null;
    for (const p of panelCatalog) {
      const needed = Math.ceil(totalWatts / p.watt);
      const cost = needed * p.pricePKR;
      if (!best || cost < best.cost) best = { ...p, needed, cost };
    }
    return best;
  }, [totalWatts, panelCatalog]);

  // ⚙️ Best Inverter
  const bestInverter = useMemo(() => {
    if (inverterKVA <= 0 || !inverterCatalog?.length) return null;
    return (
      inverterCatalog.find((i) => i.kva >= inverterKVA) ||
      inverterCatalog[inverterCatalog.length - 1]
    );
  }, [inverterKVA, inverterCatalog]);

  // 🔋 Best Battery
  const bestBattery = useMemo(() => {
    if (batteryAh <= 0 || !batteryCatalog?.length) return null;
    return (
      batteryCatalog.find((b) => b.ah >= batteryAh) ||
      batteryCatalog[batteryCatalog.length - 1]
    );
  }, [batteryAh, batteryCatalog]);

  // 💰 Approx Cost
  const approxCostPKR = useMemo(() => {
    if (!bestPanel || !bestInverter) return 0;
    let total = bestPanel.cost + bestInverter.pricePKR;
    if (systemType !== "onGrid" && bestBattery) total += bestBattery.pricePKR;
    return Math.round(total);
  }, [bestPanel, bestInverter, bestBattery, systemType]);

  return {
    totalWatts,
    inverterKVA,
    batteryAh,
    bestPanel,
    bestBattery,
    bestInverter,
    approxCostPKR,
  };
}
