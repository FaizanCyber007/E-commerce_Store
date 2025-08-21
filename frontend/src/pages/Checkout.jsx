import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/api.js";
import { useStripeCheckoutMutation } from "../store/apiSlice.js";
import { clearCart } from "../store/cartSlice.js";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { register, handleSubmit } = useForm();
  const items = useSelector(s => s.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [stripeCheckout] = useStripeCheckoutMutation();

  const onSubmit = async (data) => {
    const order = {
      orderItems: items.map(i => ({ name: i.name, qty: i.qty, image: i.image, price: i.price })),
      shippingAddress: data,
      paymentMethod: data.paymentMethod,
      itemsPrice: items.reduce((s, i) => s + i.price * i.qty, 0),
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: items.reduce((s, i) => s + i.price * i.qty, 0)
    };
    try{
      const created = await api.post("/orders", order, { withCredentials: true });
      // Stripe session
      const session = await stripeCheckout({
        items: items.map(i => ({ name: i.name, qty: i.qty, price: i.price })),
        successUrl: window.location.origin + "/orders",
        cancelUrl: window.location.href
      }).unwrap();
      window.location.href = session.url;
    }catch(e){
      alert("Please login before placing an order.");
      navigate("/login");
    }
  };

  return (
    <section className="container-responsive my-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
        <div className="card p-4 space-y-3">
          <input className="input w-full" placeholder="Full Name" {...register("fullName", { required: true })} />
          <input className="input w-full" placeholder="Email" {...register("email", { required: true })} />
          <input className="input w-full" placeholder="Phone Number" {...register("phone", { required: true })} />
          <textarea className="input w-full" placeholder="Address" rows="3" {...register("address", { required: true })}></textarea>
          <div>
            <label className="block mb-1">Payment Method</label>
            <select className="input w-full" {...register("paymentMethod")}>
              <option value="Card">Credit/Debit Card (dummy)</option>
              <option value="COD">Cash on Delivery</option>
            </select>
          </div>
          <button className="btn-primary" type="submit">Place Order</button>
        </div>
        <div className="card p-4">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          <ul className="space-y-2">
            {items.map((i) => <li key={i.product} className="flex justify-between">
              <span>{i.name} × {i.qty}</span>
              <span>${(i.price * i.qty).toFixed(2)}</span>
            </li>)}
          </ul>
          <div className="mt-3 text-lg font-bold flex justify-between">
            <span>Total</span>
            <span>${items.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)}</span>
          </div>
        </div>
      </form>
    </section>
  );
};
export default Checkout;
