export function getAllCategories() {
  return fetch('/api/categories')
    .then(response => response.json())
    .then(data => data.categories);
}

export const getProductsByCategoryId = async (categoryId: string) => {
  const res = await fetch(`/api/products?categoryId=${categoryId}`);
  const data = await res.json();
  return data.products;
};


