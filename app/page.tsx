
import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <section className="hero">
        <h1>Selamat Datang di PustakaKu</h1>

        <p>
          PustakaKu adalah aplikasi perpustakaan digital
          untuk membantu pengelolaan koleksi buku di sekolah.
          Temukan informasi buku dengan mudah dan cepat.
        </p>

        <Link href="/buku" className="button">
          Lihat Daftar Buku
        </Link>
      </section>

      <section className="info">
        <h2>Tentang PustakaKu</h2>
        <p>
          PustakaKu membantu petugas perpustakaan dalam
          mengelola data buku, melihat stok buku, dan
          mencari informasi koleksi buku.
        </p>
      </section>
    </main>
  );
}
