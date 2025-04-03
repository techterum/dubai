-- Add username and phone columns to the profiles table
ALTER TABLE profiles ADD COLUMN username VARCHAR(255);
ALTER TABLE profiles ADD COLUMN phone VARCHAR(20);