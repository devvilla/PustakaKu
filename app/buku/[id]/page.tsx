
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function DetailBuku({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const bukuId = Number(id);

  if (!Number.isInteger(bukuId) || bukuId < 1) {
    notFound();
  }

  const buku = await prisma.buku.findUnique({
    where: {
      id: bukuId,
    },
  });

  if (!buku) {
    notFound();
  }

  return (
    <main className="container">
      <h1>Detail Buku</h1>

      <div className="detail-card">
        <h2>{buku.judul}</h2>

        <p>
          <strong>Penulis:</strong> {buku.penulis}
        </p>

        <p>
          <strong>Kategori:</strong> {buku.kategori}
        </p>

        <p>
          <strong>Tahun Terbit:</strong> {buku.tahunTerbit}
        </p>

        <p>
          <strong>Stok:</strong>{" "}
          <span style={{
            color: buku.stok === 0 ? "red" : "green"
          }}>
            {buku.stok}
          </span>
        </p>

        <p>
          <strong>Deskripsi:</strong>
        </p>

        <p>{buku.deskripsi}</p>

        <Link href="/buku" className="button">
          Kembali ke Daftar Buku
        </Link>
      </div>
    </main>
  );
}
