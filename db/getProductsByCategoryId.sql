SELECT ProductCategories.productId,Categories.categoryName, Products.productName,json_agg(json_build_object('id', p2.productId, 'name', p2.productName, 'price', p2.productPrice)) FROM Mesquita.ProductCategories AS ProductCategories
INNER JOIN Mesquita.Products AS Products ON Products.productId = ProductCategories.productId
INNER JOIN Mesquita.Categories AS Categories ON ProductCategories.categoryId = Categories.categoryId
INNER JOIN Mesquita.ProductAccesories AS ProductAccesories ON ProductAccesories.productId1 = Products.productId
INNER JOIN Mesquita.Products AS p2 ON ProductAccesories.productId2 = p2.productId
WHERE ProductCategories.categoryId = $1
GROUP BY ProductCategories.productId, ProductCategories.categoryId, Categories.categoryName, Products.productName


