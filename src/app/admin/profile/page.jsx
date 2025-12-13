"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AdminProfile() {
  const [admin, setAdmin] = useState(null);
  console.log("admin", admin);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => res.json())
      .then(setAdmin);
  }, []);

  if (!admin) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>

      <div className="bg-white shadow rounded p-4 space-y-2">
        <p>
          <b>Name:</b> {admin.name}
        </p>
        <p>
          <b>Email:</b> {admin.email}
        </p>

        <button
          onClick={() => setOpen(true)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
        >
          Edit Profile
        </button>
      </div>

      {open && <EditProfileModal admin={admin} close={() => setOpen(false)} />}
    </div>
  );
}

function EditProfileModal({ admin, close }) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const body = {
      id: admin._id,
      name: e.target.name.value,
      email: e.target.email.value,
      oldPassword: e.target.oldPassword.value,
      newPassword: e.target.newPassword.value,
    };

    const res = await fetch("/api/admin/update-profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      toast.success("Profile updated!");
      close();
      location.reload();
    } else {
      toast.error(data.error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

        <button
          className="absolute top-2 right-3 cursor-pointer"
          onClick={close}
        >
          ✕
        </button>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label>Name</label>
          <input
            name="name"
            defaultValue={admin.name}
            className="border p-2 w-full"
            required
          />

          <label>Email</label>
          <input
            name="email"
            type="email"
            defaultValue={admin.email}
            className="border p-2 w-full"
            required
          />

          <label>Old Password</label>
          <input
            name="oldPassword"
            type="password"
            className="border p-2 w-full"
          />

          <label>New Password</label>
          <input
            name="newPassword"
            type="password"
            className="border p-2 w-full"
          />

          <button
            disabled={loading}
            className={`w-full py-2 text-white rounded cursor-pointer ${
              loading ? "bg-gray-400" : "bg-blue-600"
            }`}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}
