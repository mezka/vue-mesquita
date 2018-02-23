COPY Mesquita.Products(productId,productName,productPrice)
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
