"use client";
import { capitalizeType } from "../../utils/helper";
import { APPLIANCE_OPTIONS } from "../../data/ApplianceData";
import { useEffect, useState } from "react";

const ApplianceTable = ({
  rows,
  selectedByType,
  updateRow,
  removeRow,
  addSameTypeRow,
  addCustom,
  onSelectOption,
  onCalculate,
}) => {
  const [isCalculationAllowed, setIsCalculationAllowed] = useState(false);

  useEffect(() => {
    const allowed = rows.some((r) => {
      const watts = parseFloat(r.watts);
      const qty = parseFloat(r.qty);
      return r.name?.trim() && watts > 0 && qty >= 1;
    });
    setIsCalculationAllowed(allowed);
  }, [rows]);

  const handleRemoveOrReset = (row) => {
    const isEmpty =
      (!row.name?.trim() || Number(row.watts) === 0) && row.qty <= 1;

    // 🔹 Agar custom load hai — directly remove
    if (row.type === "custom") {
      removeRow(row.id);
      return;
    }

    if (row.isDefault) {
      // 🔹 Default rows: sirf reset karo, delete nahi
      if (isEmpty) return;

      updateRow(row.id, "optionId", null);
      updateRow(row.id, "watts", 0);
      updateRow(row.id, "qty", 1);
      updateRow(row.id, "name", capitalizeType(row.type));
    } else {
      // 🔹 User-added rows: poori delete karo
      removeRow(row.id);
    }
  };

  return (
    <div className="md:col-span-2">
      <div className="rounded-lg border bg-card p-4 shadow-sm overflow-x-auto max-w-full">
        <div className="min-w-[1000px]">
          {/* Header */}
          <div className="grid grid-cols-10 gap-2 text-sm md:text-base font-bold text-muted-foreground">
            <div className="col-span-3">Item</div>
            <div className="col-span-3">Type / Option</div>
            <div className="col-span-1">Power (W)</div>
            <div className="col-span-1">Quantity</div>
            <div className="col-span-1">Total (W)</div>
            <div className="col-span-1 text-right">Remove</div>
          </div>

          {/* Rows */}
          <div className="mt-2 grid gap-2">
            {rows.map((r) => {
              const options = APPLIANCE_OPTIONS[r.type] || [];
              const taken = selectedByType[r.type] || new Set();
              const availableOptions = options.filter(
                (o) => !taken.has(o.id) || o.id === r.optionId
              );

              return (
                <div
                  key={r.id}
                  className="grid grid-cols-10 items-center gap-2"
                >
                  <input
                    aria-label="Item name"
                    className="col-span-3 rounded-md border bg-background px-2 py-1.5 text-sm "
                    value={r.name}
                    disabled={r.type !== "custom"}
                    onChange={(e) =>
                      r.type === "custom" &&
                      updateRow(r.id, "name", e.target.value)
                    }
                    readOnly={r.type !== "custom"}
                  />

                  {/* <div className="col-span-3 flex items-center gap-2">
                    {options.length > 0 ? (
                      <>
                        <select
                          className="flex-1 rounded-md border bg-background px-2 py-1 text-sm"
                          value={r.optionId || ""}
                          onChange={(e) =>
                            onSelectOption(r.id, e.target.value || null)
                          }
                        >
                          <option value="">-- Select --</option>
                          {availableOptions.map((o) => (
                            <option key={o.id} value={o.id}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                        {options.length > 0 &&
                          availableOptions.length > 0 &&
                          availableOptions.length !== 1 && (
                            <button
                              title={`Add another ${capitalizeType(r.type)}`}
                              onClick={() => addSameTypeRow(r.type, r.id)}
                              className="ml-2 h-8 w-8 flex-none rounded border bg-secondary text-xs"
                            >
                              +
                            </button>
                          )}
                      </>
                    ) : (
                      <div className="text-sm italic text-muted-foreground">
                        Custom / Manual
                      </div>
                    )}
                  </div> */}

                  <div className="col-span-3 flex items-center gap-2">
                    {options.length > 0 ? (
                      <>
                        <div className="relative flex-1 min-w-[180px] max-w-[260px]">
                          <select
                            className="w-full truncate rounded-md border bg-background px-2 py-1 text-sm appearance-none"
                            value={r.optionId || ""}
                            onChange={(e) =>
                              onSelectOption(r.id, e.target.value || null)
                            }
                            title={
                              availableOptions.find((o) => o.id === r.optionId)
                                ?.label || ""
                            } // tooltip for full text
                          >
                            <option value="">-- Select --</option>
                            {availableOptions.map((o) => (
                              <option key={o.id} value={o.id}>
                                {o.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {options.length > 0 &&
                          availableOptions.length > 0 &&
                          availableOptions.length !== 1 && (
                            <button
                              title={`Add another ${capitalizeType(r.type)}`}
                              onClick={() => addSameTypeRow(r.type, r.id)}
                              className="ml-2 h-8 w-8 flex-none rounded border bg-secondary text-xs"
                            >
                              +
                            </button>
                          )}
                      </>
                    ) : (
                      <div className="text-sm italic text-muted-foreground">
                        Custom / Manual
                      </div>
                    )}
                  </div>

                  <input
                    aria-label="Power (W)"
                    type="number"
                    className="col-span-1 rounded-md border bg-background px-2 py-1.5 text-sm"
                    disabled={r.type !== "custom"}
                    value={r.watts}
                    onChange={(e) =>
                      r.type === "custom" &&
                      updateRow(r.id, "watts", e.target.value)
                    }
                    readOnly={r.type !== "custom"}
                  />
                  <input
                    aria-label="Quantity"
                    type="number"
                    className="col-span-1 rounded-md border bg-background px-2 py-1.5 text-sm"
                    value={r.qty}
                    onChange={(e) => updateRow(r.id, "qty", e.target.value)}
                  />

                  <div className="col-span-1 text-sm ">
                    {(Number(r.watts) || 0) * (Number(r.qty) || 0)}
                  </div>

                  <div className="col-span-1 text-right">
                    <button
                      className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                        r.type !== "custom" &&
                        (!r.name?.trim() || Number(r.watts) === 0) &&
                        r.qty <= 1
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      }`}
                      disabled={
                        r.type !== "custom" &&
                        (!r.name?.trim() || Number(r.watts) === 0) &&
                        r.qty <= 1
                      }
                      onClick={() => handleRemoveOrReset(r)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="mt-3 flex items-center gap-3">
              <button
                onClick={onCalculate}
                disabled={!isCalculationAllowed}
                title={
                  !isCalculationAllowed
                    ? "Please enter at least one valid load"
                    : ""
                }
                className={`rounded-md px-3 py-1.5 text-xs font-medium text-white transition-colors ${
                  isCalculationAllowed
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-green-600/89 cursor-not-allowed opacity-70"
                }`}
              >
                Calculate Total
              </button>
              {/* Add Custom Button */}
              <button
                onClick={addCustom}
                className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
              >
                Add Custom Load
              </button>
            </div>
            <div className="mt-8 text-sm text-muted-foreground text-right italic">
              Calculations based on 230V supply (Pakistan standard)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplianceTable;
