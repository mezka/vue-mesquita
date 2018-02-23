DROP SCHEMA IF EXISTS Mesquita CASCADE;
CREATE SCHEMA Mesquita;

CREATE TABLE Mesquita.Contacts(
  contactId SERIAL PRIMARY KEY,
  createdDate timestamptz NOT NULL DEFAULT now(),
  contactName VARCHAR(100) NOT NULL,
  contactPhone VARCHAR(40) NOT NULL,
  contactEmail VARCHAR(50) NOT NULL,
  contactTimeToContact VARCHAR(40),
  contactText VARCHAR(500)
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

CREATE TABLE Mesquita.CategoriasFiscales(
  categoriaFiscalId SERIAL PRIMARY KEY,
  categoriaFiscalName VARCHAR(50),
  categoriaFiscalImpuesto FLOAT NOT NULL
);

CREATE TABLE Mesquita.Clients(
  clientId SERIAL PRIMARY KEY,
  clientName VARCHAR(50) NOT NULL,
  categoriaFiscalId INTEGER REFERENCES Mesquita.CategoriasFiscales(categoriaFiscalId),
  clientCuit VARCHAR (50),
  clientPhone VARCHAR(50),
  clientFiscalAddress VARCHAR(50),
  clientAddress VARCHAR(50)
);

CREATE TABLE Mesquita.Presupuestos(
  presupuestoId SERIAL PRIMARY KEY,
  presupuestoUserId INTEGER REFERENCES Mesquita.Users(userId),
  presupuestoClientId INTEGER REFERENCES Mesquita.Clients(clientId),
  presupuestoOc VARCHAR (50),
  presupuestoPaymethod VARCHAR(50),
  presupuestoAddress VARCHAR(50),
  presupuestoObra VARCHAR(50)
);

CREATE TABLE Mesquita.PresupuestoProducts(
  presupuestoProductId SERIAL PRIMARY KEY,
  presupuestoId INTEGER REFERENCES Mesquita.Presupuestos(presupuestoId),
  productId INTEGER REFERENCES Mesquita.Products(productId),
  presupuestoProductDiscount FLOAT,
  presupuestoProductQuantity INTEGER NOT NULL
);

CREATE TABLE Mesquita.ClientContacts(
  clientContactId SERIAL PRIMARY KEY,
  clientId INTEGER REFERENCES Mesquita.Clients(clientId) ON DELETE CASCADE,
  contactId INTEGER REFERENCES Mesquita.Contacts(contactId) ON DELETE CASCADE
);

CREATE TABLE Mesquita.FormasDePago(
  formaDePagoId SERIAL PRIMARY KEY,
  formaDePagoName VARCHAR(70),
  formaDePagoText VARCHAR(300)
);