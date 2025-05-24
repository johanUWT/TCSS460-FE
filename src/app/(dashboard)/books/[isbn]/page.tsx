'use client';
import BookSingle from 'views/books/book-single';
import { useParams } from 'next/navigation';

// ==============================|| PAGE ||============================== //

export default function SingleBookPage() {
  const { isbn } = useParams();
  return <BookSingle isbn={isbn as string} />;
}
