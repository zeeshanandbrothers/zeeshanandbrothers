// import { useState } from "react";
// import {
//   PANELS_CATALOG,
//   INVERTERS_CATALOG,
//   BATTERIES_CATALOG,
// } from "../../data/ApplianceData";

// const SuggestionBox = ({ totalWatts, inverterKVA, batteryAh }) => {
//   // Smart defaults
//   const defaultPanel = PANELS_CATALOG.reduce((best, panel) => {
//     const plates = Math.ceil(totalWatts / panel.watt);
//     const bestPlates = best ? Math.ceil(totalWatts / best.watt) : Infinity;
//     return plates < bestPlates ? panel : best;
//   }, null);

//   const defaultBattery =
//     BATTERIES_CATALOG.find((b) => b.ah >= batteryAh) ||
//     BATTERIES_CATALOG[BATTERIES_CATALOG.length - 1];

//   // User state
//   const [selectedPanelId, setSelectedPanelId] = useState(defaultPanel.id);
//   const [selectedBatteryId, setSelectedBatteryId] = useState(defaultBattery.id);

//   const selectedPanel = PANELS_CATALOG.find((p) => p.id === selectedPanelId);
//   const selectedBattery = BATTERIES_CATALOG.find(
//     (b) => b.id === selectedBatteryId
//   );

//   const platesNeeded = Math.ceil(totalWatts / selectedPanel.watt);

//   return (
//     <div className="rounded-lg border bg-card p-4 shadow-sm">
//       <h3 className="text-2xl font-semibold mb-4">Suggested Equipment</h3>

//       {/* 🟡 Solar Panel Section */}
//       <div className="mb-5 shadow-[0_0_10px_rgba(0,0,0,0.15)] border p-5 rounded-md">
//         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
//           <h4 className="font-semibold ">Solar Panel</h4>
//           <select
//             className="border rounded px-2 py-1"
//             value={selectedPanelId}
//             onChange={(e) => setSelectedPanelId(e.target.value)}
//           >
//             {PANELS_CATALOG.map((p) => (
//               <option key={p.id} value={p.id}>
//                 {p.brand} {p.watt}W
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="flex flex-col sm:flex-row gap-4 mt-2">
//           <img
//             src={selectedPanel.imgUrl}
//             alt={selectedPanel.name}
//             className="w-full h-full sm:w-24 sm:h-24 object-cover rounded"
//           />
//           <div>
//             <p className="font-semibold text-md">{selectedPanel.name}</p>
//             <p className="text-sm text-muted-foreground">
//               {selectedPanel.brand}
//             </p>
//             <p>
//               PKR
//               <span className="font-semibold">
//                 {" "}
//                 {selectedPanel.pricePKR.toLocaleString()}
//               </span>
//             </p>
//             <p>
//               You need <strong>{platesNeeded}</strong> panels of{" "}
//               {selectedPanel.watt} W
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* 🔋 Battery Section */}
//       <div className="mb-5 shadow-[0_0_10px_rgba(0,0,0,0.15)] border p-5 rounded-md">
//         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
//           <h4 className="font-semibold">Battery</h4>
//           <select
//             className="border rounded px-2 py-1"
//             value={selectedBatteryId}
//             onChange={(e) => setSelectedBatteryId(e.target.value)}
//           >
//             {BATTERIES_CATALOG.map((b) => (
//               <option key={b.id} value={b.id}>
//                 {b.brand} {b.ah}Ah
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="flex flex-col sm:flex-row gap-4 mt-2">
//           <img
//             src={selectedBattery.imgUrl}
//             alt={selectedBattery.name}
//             className="w-full h-full sm:w-24 sm:h-24 object-cover rounded"
//           />
//           <div>
//             <p className="font-semibold text-md ">{selectedBattery.name}</p>
//             <p className="text-sm text-muted-foreground">
//               {selectedBattery.brand}
//             </p>
//             <p>
//               PKR{" "}
//               <span className="font-semibold">
//                 {selectedBattery.pricePKR.toLocaleString()}
//               </span>{" "}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* 🛒 Buttons */}
//       <div className="flex flex-col md:flex-row items-center gap-3">
//         <button
//           onClick={() => {
//             console.log("Selected:", {
//               panel: selectedPanel,
//               battery: selectedBattery,
//             });
//           }}
//           className="bg-blue-600 hover:bg-blue-700 transition cursor-pointer text-white px-4 py-2 rounded-md w-full"
//         >
//           Buy Now
//         </button>
//         <a
//           href={`https://wa.me/923001234567?text=${encodeURIComponent(
//             `Quotation Request:\nPanel: ${selectedPanel.name} (${platesNeeded} pcs)\nBattery: ${selectedBattery.name}`
//           )}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="bg-green-600 hover:bg-green-700 transition w-full text-center inline-block text-white px-4 py-2 rounded-md"
//         >
//           WhatsApp Quotation
//         </a>
//       </div>
//     </div>
//   );
// };

// export default SuggestionBox;

// // const SuggestionBox = ({
// //   totalWatts,
// //   inverterKVA,
// //   batteryAh,
// //   whatsappHrefBase, // base without product selections
// // }) => {
// //   const [selectedPanelId, setSelectedPanelId] = useState(PANELS_CATALOG[0].id);
// //   const [selectedInvId, setSelectedInvId] = useState(null);
// //   const [selectedBatId, setSelectedBatId] = useState(null);

// //   const panel = PANELS_CATALOG.find((p) => p.id === selectedPanelId);
// //   const platesNeeded = panel ? Math.ceil(totalWatts / panel.watt) : 0;

// //   // Default suggestions
// //   const defaultInv = INVERTERS_CATALOG.find((inv) => inv.kva >= inverterKVA);
// //   const defaultBat = BATTERIES_CATALOG.find((bat) => bat.ah >= batteryAh);

// //   // If user hasn't selected, use defaults
// //   const invToShow = selectedInvId
// //     ? INVERTERS_CATALOG.find((inv) => inv.id === selectedInvId)
// //     : defaultInv;
// //   const batToShow = selectedBatId
// //     ? BATTERIES_CATALOG.find((bat) => bat.id === selectedBatId)
// //     : defaultBat;

// //   function onBuyNow() {
// //     console.log("Selected panel:", panel);
// //     console.log("Selected inverter:", invToShow);
// //     console.log("Selected battery:", batToShow);
// //     // future: navigate to checkout or cart
// //   }

// //   // Construct whatsapp text including selections
// //   const selParts = [
// //     `Panel: ${panel.name} × ${platesNeeded}`,
// //     invToShow ? `Inverter: ${invToShow.name}` : null,
// //     batToShow ? `Battery: ${batToShow.name}` : null,
// //   ]
// //     .filter(Boolean)
// //     .join(", ");

// //   const whatsappHref = `${whatsappHrefBase}%0ASuggested%20: ${encodeURIComponent(
// //     selParts
// //   )}`;

// //   return (
// //     <div className="mt-6 rounded-lg border bg-card p-4 shadow-sm">
// //       <h3 className="mb-2 font-semibold">Suggested Products</h3>

// //       {/* Panel selection */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// //         <div className="border p-3 rounded-lg flex items-center gap-3">
// //           <img
// //             src={panel.imgUrl}
// //             alt={panel.name}
// //             className="w-20 h-20 object-contain"
// //           />
// //           <div>
// //             <p className="font-medium">{panel.name}</p>
// //             <p>{panel.watt} W</p>
// //             <p>PKR {panel.pricePKR.toLocaleString()}</p>
// //             <p>
// //               You need ~ <strong>{platesNeeded}</strong> plates
// //             </p>
// //             <button
// //               className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
// //               onClick={() => setSelectedPanelId(panel.id)}
// //             >
// //               Select Panel
// //             </button>
// //           </div>
// //         </div>

// //         {invToShow && (
// //           <div className="border p-3 rounded-lg flex items-center gap-3">
// //             <img
// //               src={invToShow.imgUrl}
// //               alt={invToShow.name}
// //               className="w-20 h-20 object-contain"
// //             />
// //             <div>
// //               <p className="font-medium">{invToShow.name}</p>
// //               <p>{invToShow.kva} kVA</p>
// //               <p>PKR {invToShow.pricePKR.toLocaleString()}</p>
// //               <button
// //                 className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
// //                 onClick={() => setSelectedInvId(invToShow.id)}
// //               >
// //                 Select Inverter
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {batToShow && (
// //           <div className="border p-3 rounded-lg flex items-center gap-3">
// //             <img
// //               src={batToShow.imgUrl}
// //               alt={batToShow.name}
// //               className="w-20 h-20 object-contain"
// //             />
// //             <div>
// //               <p className="font-medium">{batToShow.name}</p>
// //               <p>{batToShow.ah} Ah</p>
// //               <p>PKR {batToShow.pricePKR.toLocaleString()}</p>
// //               <button
// //                 className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
// //                 onClick={() => setSelectedBatId(batToShow.id)}
// //               >
// //                 Select Battery
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       <div className="mt-4 flex gap-3">
// //         <button
// //           className="bg-green-600 px-4 py-2 text-white rounded"
// //           onClick={onBuyNow}
// //         >
// //           Buy Now
// //         </button>
// //         <a
// //           href={whatsappHref}
// //           target="_blank"
// //           rel="noopener noreferrer"
// //           className="bg-accent px-4 py-2 text-white rounded"
// //         >
// //           WhatsApp Quotation
// //         </a>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SuggestionBox;
