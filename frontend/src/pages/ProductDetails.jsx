import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice.js";
import { useGetProductQuery, useAddReviewMutation, useToggleWishlistMutation } from "../store/apiSlice.js";
import { Helmet } from "react-helmet-async";

const ProductDetails = () => {
  const { slug } = useParams();
  const { data: p, isLoading } = useGetProductQuery(slug);
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [addReview] = useAddReviewMutation();
  const [toggleWishlist] = useToggleWishlistMutation();
  const dispatch = useDispatch();

  if (isLoading || !p) return <div className="container-responsive py-10">Loading...</div>;

  const handleReview = async (e) => {
    e.preventDefault();
    try {
      await addReview({ slug, rating, comment }).unwrap();
      setComment("");
      alert("Review submitted!");
    } catch {
      alert("Login required or already reviewed.");
    }
  };

  return (
    <section className="container-responsive my-8 grid md:grid-cols-2 gap-8">
      <Helmet>
        <title>{p.name} | MERN Shop</title>
        <meta name="description" content={p.description?.slice(0, 150)} />
      </Helmet>
      <div className="card p-4">
        <img className="w-full rounded-xl" src={p.image} alt={p.name} />
        <div className="grid grid-cols-3 gap-2 mt-3">
          {(p.images || []).map((img, idx) => (
            <img className="w-full h-24 object-cover rounded-lg" key={idx} src={img} alt={`${p.name}-${idx}`} />
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold">{p.name}</h1>
        <p className="opacity-80 mt-1">{p.description}</p>
        <div className="mt-3 flex items-center gap-3">
          <span className="badge">Rating: {p.rating?.toFixed(1)}★ ({p.numReviews})</span>
          <span className="text-2xl font-bold">${p.price?.toFixed(2)}</span>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <select className="input" value={qty} onChange={(e)=>setQty(Number(e.target.value))}>
            {[...Array(Math.min(10, p.countInStock || 10)).keys()].map(x => <option key={x+1}>{x+1}</option>)}
          </select>
          <button className="btn-primary" onClick={() => {
            const id = p._id || p.slug;
            dispatch(addToCart({ product: id, name: p.name, price: p.price, image: p.image, qty }));
          }}>Add to Cart</button>
          <button className="btn-primary" onClick={() => toggleWishlist(p._id || "")}>♡ Wishlist</button>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Specifications</h3>
          <ul className="grid grid-cols-2 gap-2 text-sm opacity-90">
            {p.specs && Object.entries(p.specs).map(([k,v]) => <li key={k}><span className="opacity-70">{k}:</span> {v}</li>)}
          </ul>
        </div>

        <div className="mt-8 card p-4">
          <h3 className="font-semibold mb-3">Write a Review</h3>
          <form onSubmit={handleReview} className="space-y-3">
            <select className="input" value={rating} onChange={(e)=>setRating(Number(e.target.value))}>
              {[5,4,3,2,1].map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <textarea className="input" rows="3" placeholder="Your thoughts..." value={comment} onChange={(e)=>setComment(e.target.value)} />
            <button className="btn-primary" type="submit">Submit</button>
          </form>
          <div className="mt-4 space-y-2">
            {(p.reviews || []).slice().reverse().map(rv => (
              <div key={rv._id} className="border border-[#1d2633] rounded-lg p-3">
                <div className="text-sm opacity-80">{rv.name} • {rv.rating}★</div>
                <div>{rv.comment}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProductDetails;
