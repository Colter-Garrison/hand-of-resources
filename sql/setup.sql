-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS cider;
DROP TABLE IF EXISTS bands;
DROP TABLE IF EXISTS snails;
DROP TABLE IF EXISTS beer;
DROP TABLE IF EXISTS animals;

CREATE TABLE cider (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  producer VARCHAR NOT NULL,
  location VARCHAR NOT NULL,
  color VARCHAR NOT NULL
);

CREATE TABLE bands (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  members INT NOT NULL,
  genre VARCHAR NOT NULL
);

CREATE TABLE snails (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  scientific_name VARCHAR NOT NULL,
  image VARCHAR NOT NULL
);

CREATE TABLE beer (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  style VARCHAR NOT NULL,
  producer VARCHAR NOT NULL,
  location VARCHAR NOT NULL
);

CREATE TABLE animals (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR NOT NULL,
  type VARCHAR NOT NULL,
  color VARCHAR NOT NULL
);

INSERT INTO cider (name, producer, location, color) VALUES
(
  'Black Currant',
  'Finn River',
  'Chimacum, WA',
  'Deep Purple'
),
(
  'Ginja Ninja',
  '2 Towns Ciderhouse',
  'Corvallis, OR',
  'Straw Yellow'
),
(
  'Kingston Black Cider',
  'Dragons Head Cider',
  'Vashon, WA',
  'Deep Yellow'
),
(
  'Premium Cider',
  'Ampleforth Abbey',
  'Ampleforth, UK'
  'Deep Yellow'
),
(
  'Sidra Natural',
  'Isastegi Sagardotegia',
  'Tolosa, ESP'
  'Light Gold'
);

INSERT INTO bands (name, members, genre) VALUES
(
  'King Gizzard & the Lizard Wizard'
  6,
  'Garage Rock'
),
(
  'Led Zeppelin',
  4,
  'Classic Rock'
),
(
  'Gojira',
  4,
  'Technical Death Metal'
),
(
  'STS9',
  5,
  'Jam Band'
),
(
  'Lotus',
  5,
  'Jam Band'
);

INSERT INTO snails (name, scientific_name, image) VALUES
(
  'China Moon Snail',
  'Naticarius onca',
  'https://inaturalist-open-data.s3.amazonaws.com/photos/23107852/large.jpg'
),
(
  'Eastern Heath Snail',
  'Xerolenta obvia',
  'https://inaturalist-open-data.s3.amazonaws.com/photos/220049212/original.jpeg'
),
(
  'White-mouth Turritella',
  'Turritella leucostoma',
  'https://inaturalist-open-data.s3.amazonaws.com/photos/220044868/original.jpg'
),
(
  'Garden Snail',
  'Cornu aspersum',
  'https://static.inaturalist.org/photos/89461901/medium.jpg'
);

INSERT INTO beer (name, style, producer, location) VALUES
(
  'Party Time Pils',
  'German Pilsner',
  'Wayfinder Beer',
  'Portland, OR'
),
(
  'El Guapo',
  'Blonde Ale',
  'New Spring Brewing',
  'Albany, OR'
),
(
  'Dry Stout',
  'Irish Stout',
  'Ferment',
  'Hood River, OR'
),
(
  'Maibock',
  'Hell/Maibock',
  'Buoy Beer Company',
  'Astoria, OR'
),
(
  'DREAMLAND',
  'Sour',
  'Black Project',
  'Denver, CO'
),
(
  'Orange Gose',
  'Fruited Gose',
  'Pohjala',
  'Tallinn, Harjumaa Estonia'
);

INSERT INTO animals (name, type, color) VALUES
