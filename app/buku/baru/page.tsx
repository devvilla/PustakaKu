
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FormTambah() {
  const router = useRouter();

  const [form, setForm] = useState({
    judul: "",
    penulis: "",
    kategori: "",
    tahunTerbit: "",
    stok: "",
    deskripsi: "",
  });

  const [pesan, setPesan] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("/api/buku", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const hasil = await response.json();

    if (response.ok) {
      alert("Buku berhasil ditambahkan!");
      router.push("/buku");
      router.refresh();
    } else {
      setPesan(hasil.message);
    }
  }

  return (
    <main className="container">
      <h1>Tambah Buku Baru</h1>
      <p>Masukkan informasi buku perpustakaan.</p>

      <form onSubmit={handleSubmit} className="form-buku">
        <label>Judul Buku</label>
        <input
          name="judul"
          value={form.judul}
          onChange={handleChange}
          required
        />

        <label>Penulis</label>
        <input
          name="penulis"
          value={form.penulis}
          onChange={handleChange}
          required
        />

        <label>Kategori</label>
        <input
          name="kategori"
          value={form.kategori}
          onChange={handleChange}
          required
        />

        <label>Tahun Terbit</label>
        <input
          type="number"
          name="tahunTerbit"
          value={form.tahunTerbit}
          onChange={handleChange}
          required
        />

        <label>Jumlah Stok</label>
        <input
          type="number"
          name="stok"
          value={form.stok}
          onChange={handleChange}
          min="0"
          required
        />

        <label>Deskripsi</label>
        <textarea
          name="deskripsi"
          value={form.deskripsi}
          onChange={handleChange}
          required
        />

        <button type="submit" className="button">
          Simpan Buku
        </button>

        {pesan && <p>{pesan}</p>}
      </form>
    </main>
  );
}
