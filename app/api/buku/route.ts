
import { prisma } from "@/lib/prisma";


export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      judul,
      penulis,
      kategori,
      tahunTerbit,
      stok,
      deskripsi,
    } = body;

    if (
      !judul ||
      !penulis ||
      !kategori ||
      !tahunTerbit ||
      stok === undefined ||
      !deskripsi
    ) {
      return Response.json(
        { message: "Semua field harus diisi!" },
        { status: 400 }
      );
    }

    const buku = await prisma.buku.create({
      data: {
        judul,
        penulis,
        kategori,
        tahunTerbit: Number(tahunTerbit),
        stok: Number(stok),
        deskripsi,
      },
    });

    return Response.json(
      {
        message: "Buku berhasil ditambahkan!",
        data: buku,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Gagal menambahkan buku." },
      { status: 500 }
    );
  }
}
