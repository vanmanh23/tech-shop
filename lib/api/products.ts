interface WishlistData {
  productId: string;
  userId: string;
}
export function getProducts(page: number) {
  return fetch(`/api/products?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => data);
    // .then(data => data.products);
}
export const getProductById = async (productId: string) => {
  const res = await fetch(`/api/products/${productId}`);
  const data = await res.json();
  return data;
};

export const sortProductsByPriceAsc = async () => {
  const res = await fetch('/api/products/search?query= &sortBy=price_asc');
  const data = await res.json();
  return data;
};

export const sortProductsByPriceDesc = async () => {
  const res = await fetch('/api/products/search?query= &sortBy=price_desc');
  const data = await res.json();
  return data;
};

export const addProductToWishlist = async (data: WishlistData) => {
  try {
    const response = await fetch('/api/wishlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to add to wishlist');
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error adding product to wishlist:', error);
    throw error;
  }
};

export const getWishlist = async (userId: string) => {
  try {
    const res = await fetch(`/api/wishlist?userId=${userId}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }
};

export const removeProductFromWishlist = async (productId: string, userId: string) => {
  try {
    const res = await fetch(`/api/wishlist?productId=${productId}&userId=${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error removing product from wishlist:', error);
    throw error;
  }
};

export const filterProductsByCost = async (min: number, max: number) => {
  try{
    const res = await fetch(`/api/products/search?query= &min=${min}&max=${max}`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
