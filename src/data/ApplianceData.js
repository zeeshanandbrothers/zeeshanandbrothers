// src/components/ApplianceData.js
import { uid } from "../utils/helper";

export const APPLIANCE_OPTIONS = {
  fan: [
    { id: "fan-ac", label: "AC Fan (100W)", watts: 100 },
    { id: "fan-acdc", label: "AC/DC Fan (60W)", watts: 60 },
    { id: "fan-inverter", label: "Inverter Fan (40W)", watts: 40 },
    { id: "fan-pedestal", label: "Pedestal Fan (150W)", watts: 150 },
  ],

  bulb: [
    { id: "bulb-led-12", label: "LED Bulb (12W)", watts: 12 },
    { id: "bulb-led-18", label: "LED Bulb (18W)", watts: 18 },
  ],

  tv: [{ id: "tv-led", label: "LED TV (100W)", watts: 100 }],

  refrigerator: [
    { id: "ref-noninv", label: "Non-Inverter Refrigerator (500W)", watts: 500 },
    { id: "ref-inv", label: "Inverter Refrigerator (250W)", watts: 250 },
  ],

  freezer: [
    {
      id: "freezer-noninv",
      label: "Non-Inverter Deep Freezer (800W)",
      watts: 800,
    },
    { id: "freezer-inv", label: "Inverter Deep Freezer (350W)", watts: 350 },
  ],

  ac: [
    { id: "ac-1ton", label: "Air Conditioner 1 Ton (1000W)", watts: 1000 },
    { id: "ac-1_5ton", label: "Air Conditioner 1.5 Ton (1500W)", watts: 1500 },
    { id: "ac-2ton", label: "Air Conditioner 2 Ton (2000W)", watts: 2000 },
  ],

  stove: [
    { id: "stove-1500", label: "Electric Stove (1500W)", watts: 1500 },
    { id: "stove-2000", label: "Electric Stove (2000W)", watts: 2000 },
    { id: "stove-3000", label: "Electric Stove (3000W)", watts: 3000 },
  ],

  geyser: [
    { id: "geyser-1000", label: "Water Geyser (1000W)", watts: 1000 },
    { id: "geyser-1500", label: "Water Geyser (1500W)", watts: 1500 },
    { id: "geyser-2000", label: "Water Geyser (2000W)", watts: 2000 },
  ],

  computer: [{ id: "computer-std", label: "Computer (350W)", watts: 350 }],

  washer: [
    {
      id: "wash-inverter",
      label: "Inverter Washing Machine (500W)",
      watts: 500,
    },
    {
      id: "wash-noninverter",
      label: "Non-Inverter Washing Machine (1000W)",
      watts: 1000,
    },
  ],
};

export const DEFAULT_ROWS = [
  {
    id: uid("row-"),
    type: "fan",
    optionId: null,
    name: "Fan",
    watts: 0,
    qty: 1,
    isDefault: true,
  },
  {
    id: uid("row-"),
    type: "bulb",
    optionId: null,
    name: "Light Bulb",
    watts: 0,
    qty: 1,
    isDefault: true,
  },
  {
    id: uid("row-"),
    type: "tv",
    optionId: null,
    name: "LED TV",
    watts: 0,
    qty: 1,
    isDefault: true,
  },
  {
    id: uid("row-"),
    type: "refrigerator",
    optionId: null,
    name: "Refrigerator",
    watts: 0,
    qty: 1,
    isDefault: true,
  },
  {
    id: uid("row-"),
    type: "freezer",
    optionId: null,
    name: "Deep Freezer",
    watts: 0,
    qty: 1,
    isDefault: true,
  },
  {
    id: uid("row-"),
    type: "ac",
    optionId: null,
    name: "Air Conditioner",
    watts: 0,
    qty: 1,
    isDefault: true,
  },
  {
    id: uid("row-"),
    type: "stove",
    optionId: null,
    name: "Electric Stove",
    watts: 0,
    qty: 1,
    isDefault: true,
  },
  {
    id: uid("row-"),
    type: "geyser",
    optionId: null,
    name: "Water Geyser",
    watts: 0,
    qty: 1,
    isDefault: true,
  },
  {
    id: uid("row-"),
    type: "computer",
    optionId: null,
    name: "Computer",
    watts: 0,
    qty: 1,
    isDefault: true,
  },
  {
    id: uid("row-"),
    type: "washer",
    optionId: null,
    name: "Washing Machine",
    watts: 0,
    qty: 1,
    isDefault: true,
  },
];

export const PANEL_WATT = 550;
export const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER;
// --- PANEL CATALOG ---
export const PANELS_CATALOG = {
  hybrid: [
    {
      id: "panel-550",
      watt: 550,
      brand: "Jinko",
      name: "Jinko 550W Mono PERC",
      pricePKR: 17500,
      imgUrl: "/images/panels/jinko550.jpg",
    },
    {
      id: "panel-575",
      watt: 575,
      brand: "Longi",
      name: "Longi 575W Hi-MO 6",
      pricePKR: 18400,
      imgUrl: "/images/panels/longi575.jpg",
    },
  ],

  onGrid: [
    {
      id: "panel-600",
      watt: 600,
      brand: "Canadian Solar",
      name: "Canadian 600W Bifacial",
      pricePKR: 19200,
      imgUrl: "/images/panels/canadian600.jpg",
    },
    {
      id: "panel-650",
      watt: 650,
      brand: "JA Solar",
      name: "JA Solar 650W Mono PERC",
      pricePKR: 21000,
      imgUrl: "/images/panels/ja650.jpg",
    },
  ],

  offGrid: [
    {
      id: "panel-540",
      watt: 540,
      brand: "Trina Solar",
      name: "Trina 540W Poly",
      pricePKR: 16500,
      imgUrl: "/images/panels/trina540.jpg",
    },
  ],
};

// --- BATTERY CATALOG ---
export const BATTERIES_CATALOG = {
  hybrid: [
    {
      id: "bat-200-lithium",
      ah: 200,
      brand: "Livoltek",
      name: "Livoltek 200Ah Lithium Battery",
      pricePKR: 350000,
      imgUrl: "/images/batteries/livoltek200.png",
    },
    {
      id: "bat-300-lithium",
      ah: 300,
      brand: "Inverex",
      name: "Inverex LiFePO₄ 300Ah",
      pricePKR: 420000,
      imgUrl: "/images/batteries/inverex100.jpg",
    },
  ],

  onGrid: [], // no battery for on-grid

  offGrid: [
    {
      id: "bat-250-gel",
      ah: 250,
      brand: "Phoenix",
      name: "Phoenix 250Ah Deep Cycle GEL",
      pricePKR: 185000,
      imgUrl: "/images/batteries/phoenix250.jpg",
    },
    {
      id: "bat-200-gel",
      ah: 200,
      brand: "AGM Power",
      name: "AGM Power 200Ah GEL Battery",
      pricePKR: 160000,
      imgUrl: "/images/batteries/agm200.jpg",
    },
  ],
};

// --- INVERTER CATALOG ---
export const INVERTERS_CATALOG = {
  hybrid: [
    {
      id: "inv-5-hybrid",
      kva: 5,
      brand: "Growatt",
      name: "Growatt 5kVA Hybrid Inverter",
      type: "hybrid",
      pricePKR: 265000,
      imgUrl: "/images/inverters/growatt5.jpg",
    },
    {
      id: "inv-10-hybrid",
      kva: 10,
      brand: "Livoltek",
      name: "Livoltek 10kVA 3-Phase Hybrid Inverter",
      type: "hybrid",
      pricePKR: 495000,
      imgUrl: "/images/inverters/livoltek10.jpg",
    },
  ],

  onGrid: [
    {
      id: "inv-5-ongrid",
      kva: 5,
      brand: "Huawei",
      name: "Huawei SUN2000 5kVA On-Grid Inverter",
      type: "on-grid",
      pricePKR: 245000,
      imgUrl: "/images/inverters/huawei5.jpg",
    },
    {
      id: "inv-10-ongrid",
      kva: 10,
      brand: "Solis",
      name: "Solis 10kVA On-Grid Inverter",
      type: "on-grid",
      pricePKR: 365000,
      imgUrl: "/images/inverters/solis10.jpg",
    },
  ],

  offGrid: [
    {
      id: "inv-3-offgrid",
      kva: 3.2,
      brand: "Homage",
      name: "Homage 3.2kVA Off-Grid Inverter",
      type: "off-grid",
      pricePKR: 195000,
      imgUrl: "/images/inverters/homage3.jpg",
    },
    {
      id: "inv-5-offgrid",
      kva: 5,
      brand: "Inverex",
      name: "Inverex 5kVA Off-Grid Inverter",
      type: "off-grid",
      pricePKR: 285000,
      imgUrl: "/images/inverters/inverex5.jpg",
    },
  ],
};
