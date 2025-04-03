-- Add index to listings slug for better query performance
CREATE INDEX IF NOT EXISTS listings_slug_idx ON listings(slug);