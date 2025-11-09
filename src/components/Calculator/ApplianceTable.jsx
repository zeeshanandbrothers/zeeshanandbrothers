"use client";
import { useState, useEffect } from "react";
import { APPLIANCE_OPTIONS } from "../../data/ApplianceData";
import { ChevronDown, ChevronUp } from "lucide-react";

const ApplianceTable = ({
  rows,
  updateRow,
  onCalculate,
  addCustom,
  removeRow,
}) => {
  const [appliances, setAppliances] = useState({});
  const [isCalculationAllowed, setIsCalculationAllowed] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState(null);

  // 🔹 Initialize appliance list (only once)
  useEffect(() => {
    const initial = {};
    Object.entries(APPLIANCE_OPTIONS).forEach(([category, items]) => {
      initial[category] = items.map((item) => ({
        ...item,
        qty: 0,
        total: 0,
      }));
    });
    setAppliances(initial);
  }, []);

  // 🔹 Toggle category collapse/expand
  const toggleCategory = (cat) => {
    setExpandedCategory(expandedCategory === cat ? null : cat);
  };

  // 🔹 Handle quantity changes & sync with parent
  const handleQtyChange = (category, id, qty) => {
    const numericQty = Math.max(0, Number(qty) || 0);

    // Update local appliance state
    setAppliances((prev) => {
      const updated = { ...prev };
      updated[category] = updated[category].map((item) =>
        item.id === id
          ? { ...item, qty: numericQty, total: numericQty * item.watts }
          : item
      );
      return updated;
    });

    // 🔹 Sync with parent "rows"
    const item = APPLIANCE_OPTIONS[category]?.find((i) => i.id === id);
    const rowId = `${category}-${id}`;

    if (!item) return;

    // Always send all fields to parent for accurate rows update
    updateRow(rowId, "name", item.label);
    updateRow(rowId, "watts", item.watts);
    updateRow(rowId, "qty", numericQty);
  };

  // 🔹 Enable / Disable calculate button based on local appliances
  useEffect(() => {
    const allowed = Object.values(appliances).some((items) =>
      items.some((i) => i.qty > 0 && i.watts > 0)
    );
    setIsCalculationAllowed(allowed);
  }, [appliances]);
  useEffect(() => {
    const allowed = rows.some((r) => {
      const watts = parseFloat(r.watts);
      const qty = parseFloat(r.qty);
      return r.name?.trim() && watts > 0 && qty >= 1;
    });
    setIsCalculationAllowed(allowed);
  }, [rows]);

  const handleCalculate = () => {
    const totalLoad = Object.values(appliances)
      .flat()
      .reduce((sum, i) => sum + (i.total || 0), 0);

    onCalculate?.(totalLoad);
  };

  return (
    <div className="md:col-span-2">
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">
          Select Your Appliances
        </h3>

        <div className="space-y-3">
          {Object.entries(appliances).map(([category, items]) => (
            <div
              key={category}
              className="border rounded-md overflow-hidden bg-white"
            >
              {/* 🔹 Category Header */}
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex justify-between items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 font-semibold text-left capitalize"
              >
                {category}
                {expandedCategory === category ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>

              {/* 🔹 Expand Items */}
              {expandedCategory === category && (
                <div className="p-4 bg-gray-50 animate-slide-down">
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead className="bg-blue-100 text-gray-700 font-semibold">
                        <tr>
                          <th className="text-left p-2">Appliance</th>
                          <th className="p-2 text-center">Power (W)</th>
                          <th className="p-2 text-center">Quantity</th>
                          <th className="p-2 text-center">Total (W)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item) => (
                          <tr
                            key={item.id}
                            className="border-b hover:bg-gray-100"
                          >
                            <td className="p-2 min-w-[160px]">{item.label}</td>
                            <td className="p-2 text-center">{item.watts}</td>
                            <td className="p-2 text-center">
                              <input
                                type="number"
                                min={0}
                                className="w-16 border rounded px-2 py-1 text-center"
                                value={item.qty}
                                onChange={(e) =>
                                  handleQtyChange(
                                    category,
                                    item.id,
                                    e.target.value
                                  )
                                }
                              />
                            </td>
                            <td className="p-2 text-center text-gray-700">
                              {item.total}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* 🔹 Custom Loads Section */}
        {rows.filter((r) => r.type === "custom").length > 0 && (
          <div className="mt-6 border rounded-md bg-white ">
            <div className="px-4 py-2 bg-gray-100 font-semibold flex justify-between items-center">
              <span>Custom Loads</span>
              <span className="hidden sm:inline text-xs text-gray-500 italic">
                Add your own appliances
              </span>
            </div>

            <div className="p-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-blue-100 text-gray-700 font-semibold">
                  <tr>
                    <th className="text-left p-2">Name</th>
                    <th className="p-2 text-center">Power (W)</th>
                    <th className="p-2 text-center">Quantity</th>
                    <th className="p-2 text-center">Total (W)</th>
                    <th className="p-2 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {rows
                    .filter((r) => r.type === "custom")
                    .map((r) => (
                      <tr key={r.id} className="border-b hover:bg-gray-50">
                        {/* 🔹 Name */}
                        <td className="p-2">
                          <input
                            type="text"
                            placeholder="Enter item name"
                            className="w-full border rounded px-2 py-1 focus:ring-1 focus:ring-blue-400 min-w-[150px]"
                            value={r.name}
                            onChange={(e) =>
                              updateRow(r.id, "name", e.target.value)
                            }
                          />
                        </td>

                        {/* 🔹 Watts */}
                        <td className="p-2 text-center">
                          <input
                            type="number"
                            className="w-20 border rounded px-2 py-1 text-center disabled:bg-gray-100 disabled:text-gray-400"
                            value={r.watts}
                            disabled={!r.name?.trim()}
                            placeholder={
                              r.name?.trim()
                                ? "Enter watts"
                                : "Enter name first"
                            }
                            onChange={(e) =>
                              updateRow(r.id, "watts", e.target.value)
                            }
                          />
                        </td>

                        {/* 🔹 Quantity */}
                        <td className="p-2 text-center">
                          <input
                            type="number"
                            min={1}
                            className="w-16 border rounded px-2 py-1 text-center disabled:bg-gray-100 disabled:text-gray-400"
                            value={r.qty}
                            disabled={!(Number(r.watts) > 0)}
                            placeholder={
                              Number(r.watts) > 0
                                ? "Enter qty"
                                : "Enter watts first"
                            }
                            onChange={(e) =>
                              updateRow(r.id, "qty", e.target.value)
                            }
                          />
                        </td>

                        {/* 🔹 Total */}
                        <td className="p-2 text-center text-gray-700">
                          {(Number(r.watts) || 0) * (Number(r.qty) || 0)}
                        </td>

                        {/* 🔹 Remove Button */}
                        <td className="p-2 text-center">
                          <button
                            onClick={() => removeRow(r.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                            title="Remove this custom load"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 🔹 Buttons */}
        <div className="mt-5 flex flex-wrap gap-3 justify-between items-center">
          <div className="flex gap-3">
            <button
              onClick={handleCalculate}
              disabled={!isCalculationAllowed}
              title={
                !isCalculationAllowed
                  ? "Please enter at least one valid load"
                  : ""
              }
              className={`rounded-md px-4 py-2 text-sm font-medium text-white ${
                isCalculationAllowed
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-600/80 opacity-60 cursor-not-allowed"
              }`}
            >
              Calculate Total
            </button>

            <button
              onClick={addCustom}
              className="rounded-md bg-blue-600 hover:bg-blue-700 px-4 py-2 text-sm font-medium text-white"
            >
              Add Custom Load
            </button>
          </div>

          <div className="text-sm italic text-gray-500">
            Based on 230V supply (Pakistan Standard)
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplianceTable;

// "use client";
// import { capitalizeType } from "../../utils/helper";
// import { APPLIANCE_OPTIONS } from "../../data/ApplianceData";
// import { useEffect, useState } from "react";

// const ApplianceTable = ({
//   rows,
//   selectedByType,
//   updateRow,
//   removeRow,
//   addSameTypeRow,
//   addCustom,
//   onSelectOption,
//   onCalculate,
// }) => {
//   const [isCalculationAllowed, setIsCalculationAllowed] = useState(false);
//   const [expandedRow, setExpandedRow] = useState(null);

//   useEffect(() => {
//     const allowed = rows.some((r) => {
//       const watts = parseFloat(r.watts);
//       const qty = parseFloat(r.qty);
//       return r.name?.trim() && watts > 0 && qty >= 1;
//     });
//     setIsCalculationAllowed(allowed);
//   }, [rows]);

//   const handleRemoveOrReset = (row) => {
//     const isEmpty =
//       (!row.name?.trim() || Number(row.watts) === 0) && row.qty <= 1;

//     // 🔹 Agar custom load hai — directly remove
//     if (row.type === "custom") {
//       removeRow(row.id);
//       return;
//     }

//     if (row.isDefault) {
//       // 🔹 Default rows: sirf reset karo, delete nahi
//       if (isEmpty) return;

//       updateRow(row.id, "optionId", null);
//       updateRow(row.id, "watts", 0);
//       updateRow(row.id, "qty", 1);
//       updateRow(row.id, "name", capitalizeType(row.type));
//     } else {
//       // 🔹 User-added rows: poori delete karo
//       removeRow(row.id);
//     }
//   };

//   return (
//     <div className="md:col-span-2">
//       <div className="rounded-lg border bg-card p-4 shadow-sm overflow-x-auto max-w-full">
//         <div className="min-w-[1000px]">
//           {/* Header */}
//           <div className="grid grid-cols-10 gap-2 text-sm md:text-base font-bold text-muted-foreground">
//             <div className="col-span-3">Item</div>
//             <div className="col-span-3">Type / Option</div>
//             <div className="col-span-1">Power (W)</div>
//             <div className="col-span-1">Quantity</div>
//             <div className="col-span-1">Total (W)</div>
//             <div className="col-span-1 text-right">Remove</div>
//           </div>

//           {/* Rows */}
//           <div className="mt-2 grid gap-2">
//             {rows.map((r) => {
//               const options = APPLIANCE_OPTIONS[r.type] || [];
//               const taken = selectedByType[r.type] || new Set();
//               const availableOptions = options.filter(
//                 (o) => !taken.has(o.id) || o.id === r.optionId
//               );

//               return (
//                 <div
//                   key={r.id}
//                   className="grid grid-cols-10 items-center gap-2"
//                 >
//                   <input
//                     aria-label="Item name"
//                     className="col-span-3 rounded-md border bg-background px-2 py-1.5 text-sm "
//                     value={r.name}
//                     disabled={r.type !== "custom"}
//                     onChange={(e) =>
//                       r.type === "custom" &&
//                       updateRow(r.id, "name", e.target.value)
//                     }
//                     readOnly={r.type !== "custom"}
//                   />

//                   <div className="col-span-3 flex items-center gap-2">
//                     {options.length > 0 ? (
//                       <>
//                         <div className="relative flex-1 min-w-[180px] max-w-[260px]">
//                           <select
//                             className="w-full truncate rounded-md border bg-background px-2 py-1 text-sm appearance-none"
//                             value={r.optionId || ""}
//                             onChange={(e) =>
//                               onSelectOption(r.id, e.target.value || null)
//                             }
//                             title={
//                               availableOptions.find((o) => o.id === r.optionId)
//                                 ?.label || ""
//                             } // tooltip for full text
//                           >
//                             <option value="">-- Select --</option>
//                             {availableOptions.map((o) => (
//                               <option key={o.id} value={o.id}>
//                                 {o.label}
//                               </option>
//                             ))}
//                           </select>
//                         </div>

//                         {options.length > 0 &&
//                           availableOptions.length > 0 &&
//                           availableOptions.length !== 1 && (
//                             <button
//                               title={`Add another ${capitalizeType(r.type)}`}
//                               onClick={() => addSameTypeRow(r.type, r.id)}
//                               className="ml-2 h-8 w-8 flex-none rounded border bg-secondary text-xs"
//                             >
//                               +
//                             </button>
//                           )}
//                       </>
//                     ) : (
//                       <div className="text-sm italic text-muted-foreground">
//                         Custom / Manual
//                       </div>
//                     )}
//                   </div>

//                   <input
//                     aria-label="Power (W)"
//                     type="number"
//                     className="col-span-1 rounded-md border bg-background px-2 py-1.5 text-sm"
//                     disabled={r.type !== "custom"}
//                     value={r.watts}
//                     onChange={(e) =>
//                       r.type === "custom" &&
//                       updateRow(r.id, "watts", e.target.value)
//                     }
//                     readOnly={r.type !== "custom"}
//                   />
//                   <input
//                     aria-label="Quantity"
//                     type="number"
//                     className="col-span-1 rounded-md border bg-background px-2 py-1.5 text-sm"
//                     value={r.qty}
//                     onChange={(e) => updateRow(r.id, "qty", e.target.value)}
//                   />

//                   <div className="col-span-1 text-sm ">
//                     {(Number(r.watts) || 0) * (Number(r.qty) || 0)}
//                   </div>

//                   <div className="col-span-1 text-right">
//                     <button
//                       className={`rounded-md px-2 py-1 text-xs font-medium transition-colors ${
//                         r.type !== "custom" &&
//                         (!r.name?.trim() || Number(r.watts) === 0) &&
//                         r.qty <= 1
//                           ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                           : "bg-destructive text-destructive-foreground hover:bg-destructive/90"
//                       }`}
//                       disabled={
//                         r.type !== "custom" &&
//                         (!r.name?.trim() || Number(r.watts) === 0) &&
//                         r.qty <= 1
//                       }
//                       onClick={() => handleRemoveOrReset(r)}
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="mt-4 flex items-center justify-between">
//             <div className="mt-3 flex items-center gap-3">
//               <button
//                 onClick={onCalculate}
//                 disabled={!isCalculationAllowed}
//                 title={
//                   !isCalculationAllowed
//                     ? "Please enter at least one valid load"
//                     : ""
//                 }
//                 className={`rounded-md px-3 py-1.5 text-xs font-medium text-white transition-colors ${
//                   isCalculationAllowed
//                     ? "bg-green-600 hover:bg-green-700"
//                     : "bg-green-600/89 cursor-not-allowed opacity-70"
//                 }`}
//               >
//                 Calculate Total
//               </button>
//               {/* Add Custom Button */}
//               <button
//                 onClick={addCustom}
//                 className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
//               >
//                 Add Custom Load
//               </button>
//             </div>
//             <div className="mt-8 text-sm text-muted-foreground text-right italic">
//               Calculations based on 230V supply (Pakistan standard)
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplianceTable;
