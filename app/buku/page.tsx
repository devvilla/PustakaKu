
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function BukuPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  const keyword = params.q?.trim() || "";

  const daftarBuku = await prisma.buku.findMany({
    where: keyword
      ? {
          OR: [
            { judul: { contains: keyword } },
            { penulis: { contains: keyword } },
            { kategori: { contains: keyword } },
          ],
        }
      : undefined,
    orderBy: {
      id: "desc",
    },
  });

  return (
    <main className="container">
      <h1>Daftar Buku</h1>

      <p>Kelola koleksi buku perpustakaan sekolah.</p>

      <Link href="/buku/baru" className="button">
        + Tambah Buku
      </Link>

      <form action="/buku" method="GET" className="search-form">
        <input
          type="text"
          name="q"
          placeholder="Cari judul, penulis, atau kategori..."
          defaultValue={keyword}
        />

        <button type="submit" className="button">
          Cari
        </button>

        <Link href="/buku" className="reset-button">
          Reset
        </Link>
      </form>

      <div className="book-list">
        {daftarBuku.length === 0 ? (
          <p>
            {keyword
              ? "Buku tidak ditemukan."
              : "Belum ada buku yang tersedia."}
          </p>
        ) : (
          daftarBuku.map((buku) => (
            <div className="book-card" key={buku.id}>
              <h2>{buku.judul}</h2>

              <p>Penulis: {buku.penulis}</p>

              <p>Kategori: {buku.kategori}</p>

              <p>
                Stok:{" "}
                <span
                  style={{
                    color: buku.stok === 0 ? "red" : "green",
                  }}
                >
                  {buku.stok}
                </span>
              </p>

              <Link href={`/buku/${buku.id}`}>
                Detail Buku
              </Link>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
