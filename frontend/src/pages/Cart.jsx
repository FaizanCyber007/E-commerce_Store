import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart, updateQty } from "../store/cartSlice.js";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(s => s.cart.items);
  const totals = items.reduce((acc, i) => (acc.items+=i.qty, acc.total+=i.price*i.qty, acc), { items:0, total:0 });

  return (
    <section className="container-responsive my-8">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty. <Link to="/shop" className="link">Go shopping</Link>.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            {items.map((i) => (
              <div key={i.product} className="card p-4 flex gap-4 items-center">
                <img className="w-20 h-20 rounded object-cover" src={i.image} alt={i.name} />
                <div className="flex-1">
                  <div className="font-semibold">{i.name}</div>
                  <div className="opacity-80">${i.price.toFixed(2)}</div>
                </div>
                <select className="input w-20" value={i.qty} onChange={e => dispatch(updateQty({ product: i.product, qty: Number(e.target.value) }))}>
                  {[...Array(10).keys()].map(x => <option key={x+1}>{x+1}</option>)}
                </select>
                <button className="btn-primary" onClick={() => dispatch(removeFromCart(i.product))}>Remove</button>
              </div>
            ))}
          </div>
          <div className="card p-4 h-fit">
            <div className="flex justify-between font-semibold">
              <span>Items</span><span>{totals.items}</span>
            </div>
            <div className="flex justify-between mt-2 text-lg">
              <span>Total</span><span>${totals.total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn-primary mt-4 inline-block text-center">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </section>
  );
};
export default Cart;
