DROP SCHEMA IF EXISTS Mesquita CASCADE;
CREATE SCHEMA Mesquita;

CREATE TABLE Mesquita.Contacts(
    contactId SERIAL PRIMARY KEY,
    createdDate timestamptz NOT NULL DEFAULT now(),
    contactName VARCHAR(100) NOT NULL,
    contactPhone VARCHAR(40) NOT NULL,
    contactEmail VARCHAR(50) NOT NULL,
    contactTimeToContact VARCHAR(40) NOT NULL,
    contactText VARCHAR(500) NOT NULL
);

CREATE TABLE Mesquita.Users(
  userId SERIAL PRIMARY KEY,
  userEmail VARCHAR(60) NOT NULL,
  userFirstName VARCHAR(50) NOT NULL,
  userLastName VARCHAR(50) NOT NULL,
  userAddress1 VARCHAR(80) NOT NULL,
  userAddress2 VARCHAR(80)
);

CREATE TABLE Mesquita.Passwords(
  passwordId SERIAL PRIMARY KEY,
  userId INTEGER REFERENCES Mesquita.Users(userId),
  passwordHash VARCHAR(60) UNIQUE
);

CREATE TABLE Mesquita.Categories(
  categoryId SERIAL PRIMARY KEY,
  categoryName VARCHAR(60) NOT NULL
);

CREATE TABLE Mesquita.Products(
  productId SERIAL PRIMARY KEY,
  productName VARCHAR(50) NOT NULL,
  productPrice DOUBLE PRECISION
);

CREATE TABLE Mesquita.ProductAccesories(
  productAccesoryId SERIAL PRIMARY KEY,
  productId1 INTEGER REFERENCES Mesquita.Products(productId),
  productId2 INTEGER REFERENCES Mesquita.Products(productId)
);

CREATE TABLE Mesquita.ProductCategories(
  productCategoryId SERIAL PRIMARY KEY,
  productId INTEGER REFERENCES Mesquita.Products(productId),
  categoryId INTEGER REFERENCES Mesquita.Categories(categoryId)
);

