"use client";

export default function Timeline() {
  const years = Array.from({length: 21}, (_,i) => i+1);
  return (
    <section id="timeline" className="section pb-16">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">From 1 to 21</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {years.map((y) => (
          <figure key={y} className="card overflow-hidden">
            <img
              src={`/timeline/${y}.jpg`}
              alt={`Age ${y}`}
              className="w-full h-40 object-cover bg-denim-700"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `/placeholders/placeholder_${(y%4)+1}.svg`;
              }}
            />
            <figcaption className="p-2 text-center text-sm text-silver-200/90">Age {y}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
