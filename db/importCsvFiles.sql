COPY Mesquita.Products(productId,productName,productPrice)
FROM '/home/mezka/vue-mesquita/db/csv/Products.csv' DELIMITER ',' CSV HEADER;