import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, logoutUser } from "../store/userSlice.js";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user.userInfo);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <section className="container-responsive my-8">
      <div className="card p-6 max-w-lg">
        <h1 className="text-2xl font-bold mb-2">Profile</h1>

        {user && (
          <>
            <div>Name: {user.name}</div>
            <div>Email: {user.email}</div>
            <button
              className="btn-primary mt-4"
              onClick={() => dispatch(logoutUser())}
            >
              Logout
            </button>
          </>
        )}

        <a href="/orders" className="btn-primary mt-3 inline-block">
          My Orders
        </a>
      </div>
    </section>
  );
};

export default Profile;
