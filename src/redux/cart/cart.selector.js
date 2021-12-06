import { createSelector } from "reselect";

const cartSelector = (state) => state.cart;

export const cartSelectorItems = createSelector(
  [cartSelector],
  (cart) => cart.cartItems
);

export const cartSelectorItemsCount = createSelector(
  [cartSelectorItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulated, cartItem) => accumulated + cartItem.quantity,
      0
    )
);
