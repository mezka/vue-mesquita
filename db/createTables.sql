DROP SCHEMA IF EXISTS Public CASCADE;
CREATE SCHEMA Public;

CREATE TABLE Public.Contacts(
    contactId SERIAL PRIMARY KEY,
    contactName VARCHAR(100) NOT NULL,
    contactPhone VARCHAR(40) NOT NULL,
    contactEmail VARCHAR(50) NOT NULL,
    contactTimeToContact VARCHAR(40) NOT NULL,
    contactText VARCHAR(500) NOT NULL
);