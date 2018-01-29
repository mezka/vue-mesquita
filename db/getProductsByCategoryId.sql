SELECT ProductCategories.productId, Categories.categoryName, Products.productName FROM Mesquita.ProductCategories AS ProductCategories
INNER JOIN Mesquita.Products AS Products ON Products.productId = ProductCategories.productId
INNER JOIN Mesquita.Categories AS Categories ON ProductCategories.categoryId = Categories.categoryId
WHERE ProductCategories.categoryId = $1;
