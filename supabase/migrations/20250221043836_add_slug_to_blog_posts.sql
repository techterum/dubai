ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS slug TEXT;

ALTER TABLE blog_posts
ADD CONSTRAINT blog_posts_slug_unique UNIQUE (slug);

CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts(slug);