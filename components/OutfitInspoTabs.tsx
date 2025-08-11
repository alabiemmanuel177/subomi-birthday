"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";

type Gender = "FEMALE" | "MALE";
type OutfitItem = { title: string; src: string; gender: Gender };

const ITEMS: OutfitItem[] = [
  // Women's outfits
  { title: "Denim corset with rhinestone details", src: "/images/outfits/women/150eeba60cb0a67fa520e9634efcc1b2.jpg", gender: "FEMALE" },
  { title: "Silver sequin dress with denim accents", src: "/images/outfits/women/42f52865692dad9a38faf779305a2b4a.jpg", gender: "FEMALE" },
  { title: "Denim jacket with crystal embellishments", src: "/images/outfits/women/611e85f6a256364bddccdf8be3fc3293.jpg", gender: "FEMALE" },
  { title: "Silver metallic dress with denim accessories", src: "/images/outfits/women/75d2ed667422cc514ede3e5ea01064d9.jpg", gender: "FEMALE" },
  { title: "Denim skirt with silver top", src: "/images/outfits/women/7a7ad7665ea69518fb7686fe720a444d.jpg", gender: "FEMALE" },
  { title: "Crystal-studded denim ensemble", src: "/images/outfits/women/802d912e24d7f629d33d14fbacdd89db.jpg", gender: "FEMALE" },
  { title: "Silver blazer with denim details", src: "/images/outfits/women/893c1c1b8acc35fb6cc691c1132cab7f.jpg", gender: "FEMALE" },
  { title: "Denim dress with rhinestone trim", src: "/images/outfits/women/8bce10f81c631243dbeffa7ab83dd45a.jpg", gender: "FEMALE" },
  { title: "Silver heels with denim accessories", src: "/images/outfits/women/a6d1e9dfabe752ff81d2f4a390376c55.jpg", gender: "FEMALE" },
  { title: "Crystal hair pins with denim outfit", src: "/images/outfits/women/d2a77c5ff26ceb4d2080920b4798a8c6.jpg", gender: "FEMALE" },
  { title: "Silver clutch with denim ensemble", src: "/images/outfits/women/d8cb81798553dd79b9bb9bbed91be7f6.jpg", gender: "FEMALE" },
  { title: "Denim accessories with silver jewelry", src: "/images/outfits/women/e0c710ad5a47f5753aa1934fa103ecbf.jpg", gender: "FEMALE" },
  
  // Men's outfits
  { title: "Denim shirt with silver tie", src: "/images/outfits/men/1988e75f2e2a64fcb7e3890a2e4a1ffd.jpg", gender: "MALE" },
  { title: "Silver blazer with blue jeans", src: "/images/outfits/men/2109b0fd39ca907258caa701a4425e5f.jpg", gender: "MALE" },
  { title: "Denim jacket with crystal details", src: "/images/outfits/men/2750a2eb32164468700641c73490e518.jpg", gender: "MALE" },
  { title: "Silver accessories with denim", src: "/images/outfits/men/372f6433d29fd6320d6728aa3e4c258b.jpg", gender: "MALE" },
  { title: "Denim pants with silver shoes", src: "/images/outfits/men/429f0fd5a2e0f1cf6b0c72ce38f514b9.jpg", gender: "MALE" },
  { title: "Crystal-studded denim shirt", src: "/images/outfits/men/5115360e6eb38cbf23e42e945743aaa5.jpg", gender: "MALE" },
  { title: "Silver belt with denim ensemble", src: "/images/outfits/men/608193718633d0af06080dce14fb8f0b.jpg", gender: "MALE" },
  { title: "Denim vest with silver buttons", src: "/images/outfits/men/67a1964f48cb97c80a017bc2c114cf57.jpg", gender: "MALE" },
  { title: "Silver tie clip with denim", src: "/images/outfits/men/6f8b4b7937148b83346a6bb3eb5ff4c1.jpg", gender: "MALE" },
  { title: "Denim accessories with silver details", src: "/images/outfits/men/73e0261c1a341fd1274a604aa34f3e88.jpg", gender: "MALE" },
  { title: "Silver cufflinks with denim shirt", src: "/images/outfits/men/7cf5f56a3b861b4bc1c1ed644d41e600.jpg", gender: "MALE" },
  { title: "Denim jacket with rhinestone trim", src: "/images/outfits/men/8d6a1f70aa13c4fe5ffb3f79e819c7e5.jpg", gender: "MALE" },
  { title: "Silver watch with denim outfit", src: "/images/outfits/men/b9c3373b3bf754876547427ebe239269.jpg", gender: "MALE" },
  { title: "Crystal-studded denim accessories", src: "/images/outfits/men/f17ed9775c1f790ef628daa5c1dfafb5.jpg", gender: "MALE" },
];

const TABS = ["ALL", "FEMALE", "MALE"] as const;
type Tab = typeof TABS[number];

export default function OutfitInspoTabs() {
  const [tab, setTab] = useState<Tab>("ALL");

  const list = useMemo(() => {
    if (tab === "ALL") {
      // Interleave men's and women's items for a mixed display
      const women = ITEMS.filter(i => i.gender === "FEMALE");
      const men = ITEMS.filter(i => i.gender === "MALE");
      const mixed = [];
      
      const maxLength = Math.max(women.length, men.length);
      for (let i = 0; i < maxLength; i++) {
        if (i < women.length) mixed.push(women[i]);
        if (i < men.length) mixed.push(men[i]);
      }
      
      return mixed;
    }
    return ITEMS.filter(i => i.gender === tab);
  }, [tab]);

  return (
    <section id="outfit" className="section pb-24">
      <div className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl font-bold">Outfit Inspiration</h2>
        <p className="text-silver-200/90 mt-2">Tabs for everyone—sparkle with denim and silver ✨</p>
      </div>

      {/* Tabs */}
      <div role="tablist" aria-label="Outfit categories" className="mx-auto mb-8 flex w-full max-w-xl items-center justify-center gap-2">
        {TABS.map(name => {
          const active = tab === name;
          return (
            <button
              key={name}
              role="tab"
              aria-selected={active}
              aria-controls={`panel-${name}`}
              onClick={() => setTab(name)}
              className={clsx(
                "relative rounded-xl px-4 py-2 text-sm sm:text-base transition",
                "border border-silver-400/30 bg-denim-900/40 backdrop-blur",
                active
                  ? "text-black bg-silver-100 shadow-diamond font-semibold"
                  : "text-silver-100 hover:brightness-110"
              )}
            >
              {name === "ALL" ? "All" : name[0] + name.slice(1).toLowerCase()}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div
        id={`panel-${tab}`}
        role="tabpanel"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {list.map((it, i) => (
          <figure key={i} className="card overflow-hidden group">
            <img
              src={it.src}
              alt={it.title}
              className="w-full h-64 sm:h-72 lg:h-80 object-cover transition group-hover:scale-[1.02] duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `/placeholders/placeholder_${(i % 4) + 1}.svg`;
              }}
            />
          </figure>
        ))}
        {!list.length && (
          <div className="col-span-full text-center text-silver-200/80">
            No looks yet—add images to <code className="px-1 py-0.5 rounded bg-denim-900/60">/public/outfits</code>.
          </div>
        )}
      </div>
    </section>
  );
}
