interface ShoppingCartData {
    productId: string;
    userId: string;
}
export const addProductToShoppingCart = async (data: ShoppingCartData) => {
    try {
      const response = await fetch('/api/shoppingcart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add to shopping cart');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error adding product to shopping cart:', error);
      throw error;
    }
  };
  
  export const getShoppingCart = async (userId: string) => {
    try {
      const res = await fetch(`/api/shoppingcart?userId=${userId}`);
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error fetching shopping cart:', error);
      throw error;
    }
  };
  
  export const removeProductFromShoppingCart = async (productId: string, userId: string) => {
    try {
      const res = await fetch(`/api/shoppingcart?productId=${productId}&userId=${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error('Error removing product from shopping cart:', error);
      throw error;
    }
  };
  