COPY Mesquita.Products(productId,productName,productPrice)
FROM '/home/mezka/vue-mesquita/db/csv/Products.csv' DELIMITER ',' CSV HEADER;

COPY Mesquita.Categories(categoryId, categoryName)
FROM '/home/mezka/vue-mesquita/db/csv/Categories.csv' DELIMITER ',' CSV HEADER;

COPY Mesquita.ProductCategories(productCategoryId, productId, categoryId)
FROM '/home/mezka/vue-mesquita/db/csv/ProductCategories.csv' DELIMITER ',' CSV HEADER;

COPY Mesquita.ProductAccesories(productAccesoryId, productId1, productId2)
FROM '/home/mezka/vue-mesquita/db/csv/ProductAccesories.csv' DELIMITER ',' CSV HEADER;