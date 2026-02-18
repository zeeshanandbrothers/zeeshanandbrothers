const SummaryCard = ({ calc }) => {
  const { totalWatts } = calc;
  const totalKW = (totalWatts / 1000).toFixed(2);
  const currentA = (totalWatts / 230).toFixed(2);
  const recommendedVA = (totalWatts * 1.25).toFixed(0);

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h2 className="mb-4 text-2xl text-center sm:text-left font-semibold">
        Results
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
        <div className="rounded-md bg-muted/25 p-4 text-center shadow-md">
          <p className="text-sm text-muted-foreground">Total Power (W)</p>
          <p className="text-2xl font-bold">{totalWatts} W</p>
        </div>

        <div className="rounded-md bg-muted/25 p-4 text-center shadow-md">
          <p className="text-sm text-muted-foreground ">Total (kW)</p>
          <p className="text-2xl font-bold">{totalKW} kW</p>
        </div>

        <div className="rounded-md bg-muted/25 p-4 text-center shadow-md">
          <p className="text-sm text-muted-foreground">
            Estimated Current (A) @230V
          </p>
          <p className="text-2xl font-bold">{currentA} A</p>
        </div>

        <div className="rounded-md bg-muted/25 p-4 text-center shadow-md">
          <p className="text-sm text-muted-foreground">
            Recommended Inverter / Generator Size (VA)
          </p>
          <p className="text-2xl font-bold">{recommendedVA} VA</p>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        Note: This is an estimate. Actual startup currents (especially for ACs
        and compressor-driven appliances) may be higher.
      </p>
    </div>
  );
};

export default SummaryCard;
