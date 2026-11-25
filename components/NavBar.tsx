
import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <h2>PustakaKu</h2>

      <div>
        <Link href="/">Beranda</Link>
        <Link href="/buku">Daftar Buku</Link>
        <Link href="/buku/baru">Tambah Buku</Link>
      </div>
    </nav>
  );
}
