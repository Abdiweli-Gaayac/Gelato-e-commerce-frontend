import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Cart Context
const CartContext = createContext();

// Cart Actions
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1, selectedOptions = {} } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.id === product.id && 
        JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
      );

      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return { ...state, items: updatedItems };
      } else {
        // Add new item
        const newItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image || product.images?.[0]?.url || 'https://via.placeholder.com/400x400?text=No+Image',
          quantity,
          selectedOptions
        };
        return { ...state, items: [...state.items, newItem] };
      }
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const { itemId, selectedOptions } = action.payload;
      const filteredItems = state.items.filter(
        item => !(item.id === itemId && 
        JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions))
      );
      return { ...state, items: filteredItems };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { itemId, quantity, selectedOptions } = action.payload;
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        return cartReducer(state, {
          type: CART_ACTIONS.REMOVE_ITEM,
          payload: { itemId, selectedOptions }
        });
      }

      const updatedItems = state.items.map(item => {
        if (item.id === itemId && 
            JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)) {
          return { ...item, quantity };
        }
        return item;
      });
      return { ...state, items: updatedItems };
    }

    case CART_ACTIONS.CLEAR_CART:
      return { ...state, items: [] };

    case CART_ACTIONS.LOAD_CART:
      return { ...state, items: action.payload };

    default:
      return state;
  }
};

// Initial State
const initialState = {
  items: []
};

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('gelato-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('gelato-cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('gelato-cart', JSON.stringify(state.items));
  }, [state.items]);

  // Cart Actions
  const addToCart = (product, quantity = 1, selectedOptions = {}) => {
    dispatch({
      type: CART_ACTIONS.ADD_ITEM,
      payload: { product, quantity, selectedOptions }
    });
  };

  const removeFromCart = (itemId, selectedOptions = {}) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_ITEM,
      payload: { itemId, selectedOptions }
    });
  };

  const updateQuantity = (itemId, quantity, selectedOptions = {}) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: { itemId, quantity, selectedOptions }
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  // Computed values
  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemQuantity = (itemId, selectedOptions = {}) => {
    const item = state.items.find(
      item => item.id === itemId && 
      JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
    );
    return item ? item.quantity : 0;
  };

  const isInCart = (itemId, selectedOptions = {}) => {
    return state.items.some(
      item => item.id === itemId && 
      JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
    );
  };

  const value = {
    // State
    items: state.items,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    
    // Computed values
    getTotalItems,
    getTotalPrice,
    getItemQuantity,
    isInCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;







