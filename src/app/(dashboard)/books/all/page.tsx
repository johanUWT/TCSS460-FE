'use client';
import { useState, useEffect } from 'react';
import axios from 'utils/axios';
import { Container, Box, Pagination, Typography, CircularProgress } from '@mui/material';
import BooksList from 'views/books/books-list';
import { IBook } from 'types/book';

const LIMIT = 10; // Number of books per page

export default function AllBooksPage() {
  const [books, setBooks] = useState<IBook[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async (page: number) => {
    setLoading(true);
    const offset = (page - 1) * LIMIT;

    try {
      const response = await axios.get('/book/all', {
        params: {
          limit: LIMIT,
          offset
        }
      });

      const data = response.data;
      setBooks(data.entries || []);
      const total = data.pagination?.totalRecords || data.entries?.length || 0;
      setTotalPages(Math.ceil(total / LIMIT));
    } catch (error) {
      console.error('Failed to fetch books:', error);
      setBooks([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(page);
  }, [page]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom mt={4}>
        All Books
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <BooksList books={books} />

          {books.length > 0 && (
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
              <Pagination count={totalPages} page={page} onChange={(e, value) => setPage(value)} color="primary" />
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
