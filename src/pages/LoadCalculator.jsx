"use client";

import { useEffect, useMemo, useState } from "react";
import { DEFAULT_ROWS, APPLIANCE_OPTIONS } from "../data/ApplianceData";
import { uid, capitalizeType } from "../utils/helper";
import { useLoadCalculations } from "../hooks/useLoadCalculation";
import ApplianceTable from "../components/Calculator/ApplianceTable";
import SummaryCard from "../components/Calculator/SummaryCard";
import SuggestionBox from "@/components/Calculator/SuggestionBox";

const LoadCalculator = () => {
  const [rows, setRows] = useState(DEFAULT_ROWS);
  const [isCalculationAllowed, setIsCalculationAllowed] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  console.log("showSum", showSummary);
  console.log("iscal", isCalculationAllowed);

  useEffect(() => {
    const allowed = rows.some((r) => {
      const watts = parseFloat(r.watts);
      const qty = parseFloat(r.qty);
      return r.name?.trim() && watts > 0 && qty >= 1;
    });
    setIsCalculationAllowed(allowed);
  }, [rows]);

  useEffect(() => {
    const allEmpty = rows.every((r) => {
      const watts = parseFloat(r.watts);
      const qty = parseFloat(r.qty);
      return !r.name?.trim() || (watts == 0 && qty <= 1);
    });

    // Sirf tab hide karo jab sab rows empty hoon
    if (allEmpty) {
      setShowSummary(false);
    }
  }, [rows]);

  const selectedByType = useMemo(() => {
    const map = {};
    rows.forEach((r) => {
      if (r.optionId) {
        map[r.type] = map[r.type] || new Set();
        map[r.type].add(r.optionId);
      }
    });
    return map;
  }, [rows]);

  const addSameTypeRow = (type) => {
    const options = APPLIANCE_OPTIONS[type] || [];
    if (!options.length) return;

    setRows((prev) => {
      const sameTypeRows = prev.filter((r) => r.type === type);
      const taken = new Set(
        sameTypeRows.map((r) => r.optionId).filter(Boolean)
      );

      const nextOption = options.find((o) => !taken.has(o.id));
      if (!nextOption) return prev; // sab options le liye

      const newRow = {
        id: uid("row-"),
        type,
        optionId: nextOption.id,
        name: nextOption.label,
        watts: nextOption.watts,
        qty: 1,
        isDefault: false, // 🔥 user-added row
      };

      const lastSameTypeIndex = prev.map((r) => r.type).lastIndexOf(type);
      const updated = [...prev];
      updated.splice(lastSameTypeIndex + 1, 0, newRow);
      return updated;
    });
  };

  const addCustom = () =>
    setRows((prev) => [
      ...prev,
      {
        id: uid("row-"),
        type: "custom",
        optionId: null,
        name: "",
        watts: 100,
        qty: 1,
      },
    ]);

  const updateRow = (id, field, value) =>
    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              [field]:
                field === "name"
                  ? value
                  : field === "optionId"
                  ? value
                  : Math.max(0, Number(value) || 0),
            }
          : r
      )
    );

  const removeRow = (id) => setRows((prev) => prev.filter((r) => r.id !== id));

  const onSelectOption = (rowId, optionId) => {
    const row = rows.find((r) => r.id === rowId);
    if (!row) return;

    // agar user ne "-- Select --" choose kiya
    if (!optionId) {
      setRows((prev) =>
        prev.map((r) =>
          r.id === rowId
            ? {
                ...r,
                optionId: null,
                name: capitalizeType(r.type),
                watts: 0,
                qty: 1,
              }
            : r
        )
      );
      return;
    }
    const options = APPLIANCE_OPTIONS[row.type] || [];
    const selected = options.find((o) => o.id === optionId);
    setRows((prev) =>
      prev.map((r) =>
        r.id === rowId
          ? {
              ...r,
              optionId: selected ? selected.id : null,
              name: selected ? selected.label : r.name,
              watts: selected ? selected.watts : r.watts,
            }
          : r
      )
    );
  };

  const calc = useLoadCalculations(rows);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold md:text-3xl">
          Electricity Load Calculator
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Select and edit your appliances. We suggest an inverter, panels, and
          battery bank automatically.
        </p>
      </header>

      <div className="flex flex-col gap-10">
        <ApplianceTable
          rows={rows}
          selectedByType={selectedByType}
          updateRow={updateRow}
          removeRow={removeRow}
          addSameTypeRow={addSameTypeRow}
          addCustom={addCustom}
          onSelectOption={onSelectOption}
          onCalculate={() => setShowSummary(true)}
        />
        {showSummary && isCalculationAllowed && (
          <>
            <SummaryCard calc={calc} />
            <SuggestionBox calc={calc} />
          </>
        )}
      </div>
    </main>
  );
};

export default LoadCalculator;
