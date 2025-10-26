export function uid(prefix = "") {
  return `${prefix}${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

export function capitalizeType(t) {
  if (!t) return t;
  if (t === "ac") return "AC";
  if (t === "washer") return "Washing Machine";
  if (t === "bulb") return "Light Bulb";
  if (t === "fan") return "Fan";
  if (t === "custom") return "Custom";
  return t.charAt(0).toUpperCase() + t.slice(1);
}
