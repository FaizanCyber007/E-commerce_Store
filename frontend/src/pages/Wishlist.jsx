import React from "react";
import { useGetWishlistQuery } from "../store/apiSlice.js";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { data: items, isLoading } = useGetWishlistQuery();
  if (isLoading) return <div className="container-responsive py-10">Loading...</div>;

  return (
    <section className="container-responsive my-8">
      <h1 className="text-2xl font-bold mb-4">My Wishlist</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(items || []).map(p => (
          <div key={p._id} className="card p-4">
            <Link to={`/product/${p.slug}`}>
              <img className="w-full h-48 object-cover rounded-lg" src={p.image} alt={p.name} />
            </Link>
            <div className="mt-2 font-semibold">{p.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
export default Wishlist;
