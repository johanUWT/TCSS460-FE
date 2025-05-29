'use client';
import { Box } from '@mui/material';
//import { Rating , Box } from '@mui/material'; //if you want to enable the rating
import { useRouter } from 'next/navigation';
import { IBook } from 'types/book';

{
  /* Main BooksList component */
}
export default function BooksList({ books }: { books: IBook[] }) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Library</h1>
      </div>

      {/* Books grid */}
      <div className="grid gap-6">
        {books.map((book: IBook) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-12 text-center"></div>
    </div>
  );
}

{
  /* Individual book card component */
}
const BookCard = ({ book }: { book: IBook }) => {
  const router = useRouter();

  const handleBookClick = () => {
    router.push(`/books/${book.isbn13}`);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/books/${book.isbn13}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 h-full">
      <div className="flex gap-4 h-full">
        {/* Book cover - Clickable */}
        <div className="flex-shrink-0">
          <Box
            component="img"
            src={book.icons.large}
            alt={book.title}
            onClick={handleImageClick}
            sx={{
              width: 120,
              height: 180,
              borderRadius: 2,
              objectFit: 'cover',
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8,
                transform: 'scale(1.02)',
                transition: 'all 0.2s ease-in-out'
              }
            }}
          />
        </div>

        {/* Book information */}
        <div className="flex-1 flex flex-col">
          <h3
            className="text-lg font-semibold text-gray-900 mb-1 cursor-pointer hover:text-blue-600 transition-colors"
            onClick={handleBookClick}
          >
            {book.title}
          </h3>

          {book.original_title !== book.title && <p className="text-sm text-gray-600 mb-1">Original Title: {book.original_title}</p>}

          <p className="text-md text-gray-700 mb-2">
            Author(s): <span className="font-medium">{book.authors}</span>
          </p>

          <p className="text-sm text-gray-600 mb-3">Published: {book.publication}</p>

          {/* <div className="mb-3">
            <StarRating rating={book.ratings.average} count={book.ratings.count} />
          </div> */}

          <div className="mt-auto pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">ISBN-13: {book.isbn13}</p>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

// {/* Use Material UI Rating component similar like the single book UI*/}
// const StarRating = ({ rating, count }: { rating: number; count: number }) => {
//   return (
//     <div className="flex items-center gap-2">
//       <Rating value={rating} precision={0.1} readOnly size="small" />
//       <span className="text-sm text-gray-600">
//         {rating.toFixed(2)} ({count.toLocaleString()} ratings)
//       </span>
//     </div>
//   );
// };
