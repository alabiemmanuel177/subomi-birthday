"use client";

const items = [
  { title: "Ladies: Denim corset + rhinestones", src: "/outfits/ladies1.jpg" },
  { title: "Gents: Blue jeans + silver blazer", src: "/outfits/men1.jpg" },
  { title: "Ladies: Silver heels & clutch", src: "/outfits/ladies2.jpg" },
  { title: "Gents: Denim shirt + sleek shoes", src: "/outfits/men2.jpg" },
];

export default function OutfitInspo() {
  return (
    <section id="outfit" className="section pb-24">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">What to Wear: Denim & Diamonds</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((it, i) => (
          <figure key={i} className="card overflow-hidden group">
            <img
              src={it.src}
              alt={it.title}
              className="w-full h-48 object-cover transition group-hover:scale-[1.03]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `/placeholders/placeholder_${(i%4)+1}.svg`;
              }}
            />
            <figcaption className="p-3 text-sm text-center text-silver-100/90">{it.title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
