/*
  # Initial Schema Setup for Classifieds Website

  1. New Tables
    - listings
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - price (numeric)
      - category (text)
      - user_id (uuid, references auth.users)
      - created_at (timestamp)
      - updated_at (timestamp)

  2. Security
    - Enable RLS on listings table
    - Add policies for:
      - Anyone can read listings
      - Authenticated users can create listings
      - Users can only update/delete their own listings
*/

CREATE TABLE listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  category text NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  slug text UNIQUE NOT NULL
);

ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view listings
CREATE POLICY "Anyone can view listings"
  ON listings
  FOR SELECT
  USING (true);

-- Policy: Authenticated users can create listings
CREATE POLICY "Authenticated users can create listings"
  ON listings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own listings
CREATE POLICY "Users can update own listings"
  ON listings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own listings
CREATE POLICY "Users can delete own listings"
  ON listings
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);