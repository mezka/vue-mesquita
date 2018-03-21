COPY Mesquita.Products(productId, productName, productPrice)
FROM '/home/mezka/vue-mesquita/db/csv/Products.csv' DELIMITER ',' CSV HEADER;

COPY Mesquita.Categories(categoryId, categoryName)
FROM '/home/mezka/vue-mesquita/db/csv/Categories.csv' DELIMITER ',' CSV HEADER;

COPY Mesquita.CategoriasFiscales(categoriaFiscalId, categoriaFiscalName, categoriaFiscalImpuesto)
FROM '/home/mezka/vue-mesquita/db/csv/CategoriasFiscales.csv' DELIMITER ',' CSV HEADER;

COPY Mesquita.ProductCategories(productCategoryId, productId, categoryId)
FROM '/home/mezka/vue-mesquita/db/csv/ProductCategories.csv' DELIMITER ',' CSV HEADER;

COPY Mesquita.ProductAccesories(productAccesoryId, productId1, productId2)
FROM '/home/mezka/vue-mesquita/db/csv/ProductAccesories.csv' DELIMITER ',' CSV HEADER;

COPY Mesquita.FormasDePago(formaDePagoId, formaDePagoName, formaDePagoText)
FROM '/home/mezka/vue-mesquita/db/csv/FormasDePago.csv' DELIMITER ',' CSV HEADER;

COPY Mesquita.Clients(clientId, clientName, categoriaFiscalId, clientCuit, clientPhone, clientFiscalAddress, clientAddress)
FROM '/home/mezka/vue-mesquita/db/csv/Clients.csv' DELIMITER ',' CSV HEADER;

COPY Mesquita.Contacts(contactId, contactName, contactPhone, contactEmail, contactTimeToContact, contactText)
FROM '/home/mezka/vue-mesquita/db/csv/Contacts.csv' DELIMITER ',' CSV HEADER;

COPY Mesquita.ClientContacts(clientContactId, clientId, contactId)
FROM '/home/mezka/vue-mesquita/db/csv/ClientContacts.csv' DELIMITER ',' CSV HEADER;

COPY Mesquita.Users(userId, userEmail, userFirstName, userLastName, userAddress1, userAddress2)
FROM '/home/mezka/vue-mesquita/db/csv/Users.csv' DELIMITER ',' CSV HEADER;

SELECT setval(pg_get_serial_sequence('Mesquita.Products', 'productid'), max(Products.productId) + 1) FROM Mesquita.Products;
SELECT setval(pg_get_serial_sequence('Mesquita.Categories', 'categoryid'), max(Categories.categoryId) + 1) FROM Mesquita.Categories;
SELECT setval(pg_get_serial_sequence('Mesquita.CategoriasFiscales', 'categoriafiscalid'), max(CategoriasFiscales.categoriaFiscalId) + 1) FROM Mesquita.CategoriasFiscales;
SELECT setval(pg_get_serial_sequence('Mesquita.ProductCategories', 'productcategoryid'), max(ProductCategories.productCategoryId) + 1) FROM Mesquita.ProductCategories;
SELECT setval(pg_get_serial_sequence('Mesquita.FormasDePago', 'formadepagoid'), max(FormasDePago.formaDePagoId) + 1) FROM Mesquita.FormasDePago;
SELECT setval(pg_get_serial_sequence('Mesquita.Clients', 'clientid'), max(Clients.clientId) + 1) FROM Mesquita.Clients;
SELECT setval(pg_get_serial_sequence('Mesquita.Contacts', 'contactid'), max(Contacts.contactId) + 1) FROM Mesquita.Contacts;
SELECT setval(pg_get_serial_sequence('Mesquita.ClientContacts', 'clientcontactid'), max(ClientContacts.clientContactId) + 1) FROM Mesquita.ClientContacts;
SELECT setval(pg_get_serial_sequence('Mesquita.Users', 'userid'), max(Users.userId) + 1) FROM Mesquita.Users;