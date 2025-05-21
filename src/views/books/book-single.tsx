import { LinearProgress, Box, Divider, Rating, Stack, Typography } from '@mui/material';
import books from 'mockData.json';
import { notFound } from 'next/navigation';
import { IBook } from 'types/book';

const getRatingPercentage = (count: number, total: number) => (total === 0 ? 0 : (count / total) * 100);

export default function BookSingle({ isbn }: { isbn: string }) {
  const book: IBook | undefined = books.find((book) => book.isbn13 === Number(isbn));

  if (!book) {
    return notFound();
  }

  const { ratings } = book;

  const breakdown = [
    { stars: 5, count: ratings.rating_5 },
    { stars: 4, count: ratings.rating_4 },
    { stars: 3, count: ratings.rating_3 },
    { stars: 2, count: ratings.rating_2 },
    { stars: 1, count: ratings.rating_1 }
  ];

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 4 }}>
      {/* Title and Image */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} alignItems="flex-start">
        <Box component="img" src={book.icons.large} alt={book.title} sx={{ width: 200, borderRadius: 2 }} />

        <Box>
          <Typography variant="h4" gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Original Title: <strong>{book.original_title}</strong>
          </Typography>
          <Typography variant="body1" gutterBottom>
            Author(s): <strong>{book.authors}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ISBN-13: {book.isbn13}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Published: {book.publication}
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ my: 4 }} />

      {/* Rating Section */}
      <Box>
        <Typography variant="h1" gutterBottom>
          {ratings.average.toFixed(1)}
          <Typography variant="body2" color="text.secondary">
            average rating
          </Typography>
        </Typography>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <Rating value={ratings.average} precision={0.1} readOnly />
          <Typography variant="body2" color="text.secondary">
            ({ratings.count.toLocaleString()} ratings)
          </Typography>
        </Stack>

        {/* Rating Breakdown */}
        <Stack spacing={1}>
          {breakdown.map(({ stars, count }) => (
            <Stack key={stars} direction="row" spacing={1} alignItems="center">
              <Typography sx={{ width: 40 }}>{stars}★</Typography>
              <LinearProgress
                variant="determinate"
                value={getRatingPercentage(count, ratings.count)}
                sx={{ flex: 1, height: 8, borderRadius: 2 }}
              />
              <Typography sx={{ width: 50, textAlign: 'right' }}>{getRatingPercentage(count, ratings.count).toFixed(0)}%</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
