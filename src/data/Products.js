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
  const color = colorway.toLowerCase();

  const colors = [];

  if (
    color.includes("red") ||
    color.includes("toro bravo") ||
    color.includes("chicago")
  ) {
    colors.push("Red");
  }

  if (
    color.includes("black") ||
    color.includes("bred")
  ) {
    colors.push("Black");
  }

  if (
    color.includes("white") ||
    color.includes("sail")
  ) {
    colors.push("White");
  }

  if (
    color.includes("blue") ||
    color.includes("unc")
  ) {
    colors.push("Blue");
  }

  if (color.includes("green")) colors.push("Green");

  if (
    color.includes("grey") ||
    color.includes("gray") ||
    color.includes("silver")
  ) {
    colors.push("Grey");
  }

  if (
    color.includes("brown") ||
    color.includes("mocha")
  ) {
    colors.push("Brown");
  }

  if (color.includes("pink")) colors.push("Pink");
  if (color.includes("purple")) colors.push("Purple");
  if (color.includes("orange")) colors.push("Orange");
  if (color.includes("yellow")) colors.push("Yellow");

  if (
    color.includes("beige") ||
    color.includes("cream")
  ) {
    colors.push("Beige");
  }

  return colors.length > 0 ? colors : ["Other"];
}