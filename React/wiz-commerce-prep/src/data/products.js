// B2B wholesale mock catalog — use across all exercises
export const CATEGORIES = ["Furniture", "Lighting", "Textiles", "Tableware"];

export const PRODUCTS = [
  {
    id: "1",
    sku: "FUR-001",
    name: "Oak Dining Table",
    category: "Furniture",
    price: 45000,
    moq: 2,
    inStock: true,
  },
  {
    id: "2",
    sku: "FUR-002",
    name: "Walnut Sideboard",
    category: "Furniture",
    price: 32000,
    moq: 1,
    inStock: true,
  },
  {
    id: "3",
    sku: "LGT-001",
    name: "Brass Pendant Light",
    category: "Lighting",
    price: 8500,
    moq: 6,
    inStock: true,
  },
  {
    id: "4",
    sku: "LGT-002",
    name: "Ceramic Table Lamp",
    category: "Lighting",
    price: 4200,
    moq: 12,
    inStock: false,
  },
  {
    id: "5",
    sku: "TXT-001",
    name: "Linen Napkin Set",
    category: "Textiles",
    price: 1800,
    moq: 24,
    inStock: true,
  },
  {
    id: "6",
    sku: "TXT-002",
    name: "Cotton Throw Blanket",
    category: "Textiles",
    price: 3500,
    moq: 10,
    inStock: true,
  },
  {
    id: "7",
    sku: "TBL-001",
    name: "Stoneware Dinner Plate",
    category: "Tableware",
    price: 950,
    moq: 48,
    inStock: true,
  },
  {
    id: "8",
    sku: "TBL-002",
    name: "Glass Wine Set",
    category: "Tableware",
    price: 2200,
    moq: 20,
    inStock: true,
  },
  {
    id: "9",
    sku: "FUR-003",
    name: "Rattan Armchair",
    category: "Furniture",
    price: 18500,
    moq: 4,
    inStock: true,
  },
  {
    id: "10",
    sku: "LGT-003",
    name: "LED Track Light",
    category: "Lighting",
    price: 12000,
    moq: 3,
    inStock: true,
  },
];

// Simulates API delay — use in debounce exercise
export function fetchProducts(query = "") {
  return new Promise((resolve) => {
    setTimeout(() => {
      const q = query.toLowerCase().trim();
      const results = q
        ? PRODUCTS.filter(
            (p) =>
              p.name.toLowerCase().includes(q) ||
              p.sku.toLowerCase().includes(q),
          )
        : PRODUCTS;
      resolve(results);
    }, 400);
  });
}
