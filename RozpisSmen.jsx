import { format, addWeeks, startOfWeek, addDays } from "date-fns";
import { useState } from "react";

const zamestnanci = {
  "1. směna": {
    Restaurace: ["Honza", "Míša", "Neznámá"],
    Kuchyně: ["Fanda", "Tonda", "Drahuš"],
    Recepce: ["Káťa"],
    Mechanik: ["Filip"],
  },
  "2. směna": {
    Restaurace: ["Petra", "Bára", "Tereza"],
    Kuchyně: ["Fanda", "Tonda", "Drahuš"],
    Recepce: ["Ivet"],
    Mechanik: ["Radek"],
  },
};

const dnyMap = { Po: 0, Út: 1, St: 2, Čt: 3, Pá: 4, So: 5, Ne: 6 };
const dnyDlouhy = ["Po", "Út", "Pá", "So", "Ne"];
const dnyKratky = ["St", "Čt"];

export default function RozpisSmen() {
  const [pocetTydnu] = useState(4);
  const startDate = addDays(new Date(), 1);
  const rozpis = [];

  for (let tyden = 0; tyden < pocetTydnu; tyden++) {
    const typTydne = tyden % 2 === 0 ? "Dlouhý" : "Krátký";
    const smena = tyden % 2 === 0 ? "1. směna" : "2. směna";
    const dny = typTydne === "Dlouhý" ? dnyDlouhy : dnyKratky;
    const zacatekTydne = startOfWeek(addWeeks(startDate, tyden), { weekStartsOn: 1 });

    for (let den of dny) {
      const datum = addDays(zacatekTydne, dnyMap[den]);
      rozpis.push({
        datum: format(datum, "yyyy-MM-dd"),
        den,
        typTydne,
        smena,
        Restaurace: zamestnanci[smena].Restaurace.join(", "),
        Kuchyně: zamestnanci[smena].Kuchyně.join(", "),
        Recepce: zamestnanci[smena].Recepce[0],
        Mechanik: zamestnanci[smena].Mechanik[0],
      });
    }
  }

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h1>Rozpis směn</h1>
      {rozpis.map((radek, idx) => (
        <div key={idx} style={{ border: '1px solid #ccc', margin: '1rem 0', padding: '0.5rem' }}>
          <p><strong>{radek.datum} ({radek.den}) – {radek.typTydne}</strong></p>
          <p>Směna: {radek.smena}</p>
          <p>Restaurace: {radek.Restaurace}</p>
          <p>Kuchyně: {radek.Kuchyně}</p>
          <p>Recepce: {radek.Recepce}</p>
          <p>Mechanik: {radek.Mechanik}</p>
        </div>
      ))}
    </div>
  );
}
