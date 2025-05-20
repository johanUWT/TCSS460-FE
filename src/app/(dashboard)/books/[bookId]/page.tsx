'use client';
import { Box, Typography } from '@mui/material';
import { notFound, useParams } from 'next/navigation';

export default function BookPage() {
  const params = useParams();
  const { bookId } = params;

  if (bookId === '0') {
    return notFound();
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Book Details for book ID: {bookId}
      </Typography>
    </Box>
  );
}
