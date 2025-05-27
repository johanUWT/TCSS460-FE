'use client';
import { LinearProgress, Box, Divider, Rating, Stack, Typography, Skeleton, IconButton, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useRouter } from 'next/navigation';
import { IBook } from 'types/book';
import { useEffect, useState } from 'react';
import axios from 'utils/axios';

const getRatingPercentage = (count: number, total: number) => (total === 0 ? 0 : (count / total) * 100);

export default function BookSingle({ isbn }: { isbn: string }) {
  const [book, setBook] = useState<IBook | null>(null);
  const [starCounts, setStarCounts] = useState<Record<number, number> | null>(null);
  const [initialCounts, setInitialCounts] = useState<Record<number, number> | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchBook() {
      try {
        const bookResponse = await axios.get(`/book/isbn/${isbn}`);
        const bookData = bookResponse.data.entry as IBook;
        const initial = {
          5: bookData.ratings.rating_5,
          4: bookData.ratings.rating_4,
          3: bookData.ratings.rating_3,
          2: bookData.ratings.rating_2,
          1: bookData.ratings.rating_1
        };
        setBook(bookData);
        setStarCounts(initial);
        setInitialCounts(initial);
        setHasChanges(false);
      } catch (error) {
        console.error('Error fetching book:', error);
        router.push('/404'); // Redirect to 404 if book not found
      }
    }
    fetchBook();
  }, [isbn, router]);

  // Warn user if there are unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasChanges]);

  // Check for changes
  useEffect(() => {
    if (!starCounts || !initialCounts) return;
    const changed = [1, 2, 3, 4, 5].some((star) => starCounts[star] !== initialCounts[star]);
    setHasChanges(changed);
  }, [starCounts, initialCounts]);

  if (!book || !starCounts || !initialCounts) {
    return <BookSingleSkeleton />;
  }

  const total = Object.values(starCounts).reduce((a, b) => a + b, 0);
  const average =
    total === 0
      ? '0'
      : ((1 * starCounts[1] + 2 * starCounts[2] + 3 * starCounts[3] + 4 * starCounts[4] + 5 * starCounts[5]) / total).toFixed(1);

  const handleRatingSubmit = () => {
    console.log('Submitted star counts:', starCounts);
    axios
      .patch('/book/rating', {
        id: book.id,
        rating_1_star: starCounts[1],
        rating_2_star: starCounts[2],
        rating_3_star: starCounts[3],
        rating_4_star: starCounts[4],
        rating_5_star: starCounts[5]
      })
      .then(() => {
        console.log('Rating updated successfully');
        setInitialCounts({ ...starCounts });
      })
      .catch((error) => {
        console.error('Error updating rating:', error);
        alert('Failed to update rating. Please try again later.');
        setStarCounts({ ...initialCounts }); // Reset to initial counts on error
      })
      .finally(() => {
        setHasChanges(false);
      });
  };

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
          {average}
          <Typography variant="body2" color="text.secondary">
            average rating
          </Typography>
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <Rating value={parseFloat(average)} precision={0.1} readOnly />
          <Typography variant="body2" color="text.secondary">
            ({total.toLocaleString()} ratings)
          </Typography>
        </Stack>

        <Stack spacing={1} mt={2}>
          {([5, 4, 3, 2, 1] as const).map((stars) => {
            const count = starCounts[stars];
            return (
              <Stack key={stars} direction="row" spacing={1} alignItems="center">
                <Typography sx={{ width: 40 }}>{stars}★</Typography>

                <LinearProgress
                  variant="determinate"
                  value={getRatingPercentage(count, total)}
                  sx={{ flex: 1, height: 8, borderRadius: 2 }}
                />

                <Typography sx={{ width: 50, textAlign: 'right' }}>{getRatingPercentage(count, total).toFixed(0)}%</Typography>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #ccc',
                    borderRadius: 1,
                    px: 1,
                    height: 36
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={() =>
                      setStarCounts((prev) => ({
                        ...prev,
                        [stars]: Math.max(0, prev![stars] - 1)
                      }))
                    }
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>

                  <TextField
                    type="number"
                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    value={count}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      if (!isNaN(val) && val >= 0) {
                        setStarCounts((prev) => ({
                          ...prev,
                          [stars]: val
                        }));
                      }
                    }}
                    sx={{ width: 100, mx: 1 }}
                    size="small"
                    variant="standard"
                  />

                  <IconButton
                    size="small"
                    onClick={() =>
                      setStarCounts((prev) => ({
                        ...prev,
                        [stars]: prev![stars] + 1
                      }))
                    }
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Stack>
            );
          })}
        </Stack>

        <Button variant="contained" sx={{ mt: 3 }} onClick={handleRatingSubmit} disabled={!hasChanges}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

function BookSingleSkeleton() {
  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 4 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} alignItems="flex-start">
        <Skeleton variant="rectangular" width={200} height={300} />
        <Stack>
          <Skeleton variant="text" width={260} />
          <Skeleton variant="text" width={280} />
          <Skeleton variant="text" width={240} />
          <Skeleton variant="text" width={250} />
        </Stack>
      </Stack>
      <Stack spacing={1} sx={{ mt: 4 }}>
        <Skeleton variant="text" width="20%" />
        <Stack spacing={1} sx={{ mt: 2 }}>
          <Skeleton variant="text" width={220} />
          <Skeleton variant="text" width={280} />
          <Skeleton variant="text" width={260} />
          <Skeleton variant="text" width={250} />
        </Stack>
      </Stack>
    </Box>
  );
}
