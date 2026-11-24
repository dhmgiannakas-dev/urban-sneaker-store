export const comingSoonProducts = [
  {
    id: "coming-1",
    name: "URBAN Shadow X1",
    category: "Coming Soon",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "coming-2",
    name: "URBAN Velocity",
    category: "Coming Soon",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "coming-3",
    name: "URBAN Eclipse",
    category: "Coming Soon",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "coming-4",
    name: "URBAN Nova",
    category: "Coming Soon",
    image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80",
  },
];


export function getColors(colorway = "") {
  const color = String(colorway || "").toLowerCase();

  const colorMap = {
    Red: ["red", "crimson", "burgundy", "maroon", "chicago", "bred", "toro bravo"],
    Black: ["black", "onyx", "bred"],
    White: ["white", "sail", "ivory"],
    Blue: ["blue", "navy", "unc", "cobalt", "royal"],
    Green: ["green", "olive", "mint", "forest", "khaki"],
    Grey: ["grey", "gray", "silver", "graphite", "charcoal"],
    Brown: ["brown", "mocha", "chocolate", "coffee"],
    Pink: ["pink", "rose", "fuchsia"],
    Purple: ["purple", "violet", "lavender", "lilac"],
    Orange: ["orange", "coral", "peach"],
    Yellow: ["yellow", "gold", "mustard"],
    Beige: ["beige", "cream", "sand", "tan", "oatmeal"],
  };

  const words = color.split(/[^a-z]+/).filter(Boolean);
  const normalized = words.join(" ");

  const colors = Object.entries(colorMap)
    .filter(([_, keywords]) =>
      keywords.some((keyword) =>
        normalized.includes(" ") && keyword.includes(" ")
          ? ` ${normalized} `.includes(` ${keyword} `)
          : words.includes(keyword)
      )
    )
    .map(([colorName]) => colorName);

  return colors.length > 0 ? colors : ["Other"];
}