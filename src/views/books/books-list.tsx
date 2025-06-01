'use client';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { useRouter } from 'next/navigation';
import { IBook } from 'types/book';

export default function BooksList({ books }: { books: IBook[] }) {
  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        Book List
      </Typography>

      {books.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center" mt={4}>
          No books to display.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {books.map((book: IBook) => (
            <Grid item xs={12} key={book.id}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
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
    <Paper
      elevation={3}
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'flex-start',
        cursor: 'pointer',
        '&:hover': { boxShadow: 6 }
      }}
      onClick={handleBookClick}
    >
      <Box
        component="img"
        src={book.icons.large}
        alt={book.title}
        onClick={handleImageClick}
        sx={{
          width: 120,
          height: 180,
          objectFit: 'cover',
          borderRadius: 1,
          mr: 2,
          '&:hover': {
            opacity: 0.85,
            transform: 'scale(1.02)',
            transition: 'all 0.2s ease-in-out'
          }
        }}
      />
      <Box flex={1}>
        <Typography variant="h5" sx={{ mb: 0.5 }}>
          {book.title}
        </Typography>

        {book.original_title !== book.title && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            Original Title: {book.original_title}
          </Typography>
        )}

        <Typography variant="body1" sx={{ mb: 1 }}>
          Author(s): <strong>{book.authors}</strong>
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Published: {book.publication}
        </Typography>

        {/* Uncomment if you want to add Rating later */}
        {/* <Box sx={{ mb: 2 }}>
          <StarRating rating={book.ratings.average} count={book.ratings.count} />
        </Box> */}

        <Typography variant="caption" color="text.secondary">
          ISBN-13: {book.isbn13}
        </Typography>
      </Box>
    </Paper>
  );
};

// Optional Rating UI using MUI
// const StarRating = ({ rating, count }: { rating: number; count: number }) => (
//   <Box display="flex" alignItems="center" gap={1}>
//     <Rating value={rating} precision={0.1} readOnly size="small" />
//     <Typography variant="body2" color="text.secondary">
//       {rating.toFixed(2)} ({count.toLocaleString()} ratings)
//     </Typography>
//   </Box>
// );
