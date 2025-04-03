/*
  # Add new fields to listings table

  1. Changes
    - Add contact fields (phone, whatsapp, email, website, telegram_id)
    - Add location fields (state, zip_code, address)
    - Add image fields (profile_image, additional_images)
    - Add services fields
  
  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE listings ADD COLUMN IF NOT EXISTS state text;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS telegram_id text;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS zip_code text;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS address text;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS whatsapp text;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS website text;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS profile_image text;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS additional_images text[];

-- Add services columns
ALTER TABLE listings ADD COLUMN IF NOT EXISTS service_classic_vaginal_sex boolean DEFAULT false;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS service_erotic_massage boolean DEFAULT false;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS service_masturbation boolean DEFAULT false;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS service_cum_in_face boolean DEFAULT false;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS service_with_two_men boolean DEFAULT false;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS service_cum_on_body boolean DEFAULT false;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS service_handjob boolean DEFAULT false;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS service_oral_without_condom boolean DEFAULT false;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS service_duo_with_girl boolean DEFAULT false;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS service_dirty_talk boolean DEFAULT false;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS service_kamasutra boolean DEFAULT false;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS service_position_69 boolean DEFAULT false;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS service_golden_shower_give boolean DEFAULT false;
ALTER TABLE listings ADD COLUMN IF NOT EXISTS service_drink boolean DEFAULT false;