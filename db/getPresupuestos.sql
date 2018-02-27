SELECT queryB.presupuestoId, queryB.presupuestoUser, queryB.presupuestoClient, queryB.presupuestoAddress, queryB.formaDePagoName, queryB.presupuestoSubtotal, queryB.presupuestoTotal,

json_agg(json_build_object('presupuestoProductId', queryB.presupuestoProductId, 'presupuestoProductName', queryB.productName, 'presupuestoProductQuantity', queryB.presupuestoProductQuantity, 'presupuestoProductSelectedAccessory', queryB.productSelectedAccessories, 'presupuestoProductDiscount', queryB.presupuestoProductDiscount, 'presupuestoProductPrice', queryB.presupuestoProductPrice)) AS presupuestoProducts FROM

(SELECT queryA.presupuestoId, queryA.presupuestoUser, queryA.presupuestoClient, queryA.presupuestoAddress, queryA.formaDePagoName, queryA.presupuestoSubtotal, queryA.presupuestoTotal, queryA.presupuestoProductId, queryA.productName, queryA.presupuestoProductQuantity, json_agg(queryA.presupuestoProductAccessoryObject) AS productSelectedAccessories, queryA.presupuestoProductDiscount, queryA.productPrice AS presupuestoProductPrice FROM

(SELECT Presupuestos.presupuestoId, jsonb_build_object('userFirstName', Users.userFirstName, 'userLastName', Users.userLastName, 'userEmail', Users.userEmail) as presupuestoUser, jsonb_build_object('clientId', Clients.clientId, 'clientName', Clients.clientName, 'clientCategoriaFiscal', CategoriasFiscales.categoriaFiscalName, 'clientCategoriaFiscalImpuesto', CategoriasFiscales.categoriaFiscalImpuesto, 'clientCuit', Clients.clientCuit) AS presupuestoClient, Presupuestos.presupuestoAddress, FormasDePago.formaDePagoName, Presupuestos.presupuestoSubtotal, Presupuestos.presupuestoDiscountAmount, Presupuestos.presupuestoStringTotal, Presupuestos.presupuestoTotal, Mesquita.PresupuestoProducts.presupuestoProductId, Products.productName, Mesquita.PresupuestoProducts.presupuestoProductQuantity, Mesquita.PresupuestoProducts.presupuestoProductDiscount, Products.productPrice, 

CASE WHEN Mesquita.PresupuestoProductAccessories.presupuestoProductAccessoryId IS NULL THEN NULL
ELSE

json_build_object('presupuestoProductAccessoryId', Mesquita.PresupuestoProductAccessories.presupuestoProductAccessoryId, 'presupuestoProductAccessoryName', ProductAccessories.productName, 'presupuestoProductAccessoryQuantity', Mesquita.PresupuestoProductAccessories.presupuestoProductAccessoryQuantity, 'presupuestoProductAccessoryDiscount', Mesquita.PresupuestoProductAccessories.presupuestoProductAccessoryDiscount, 'presupuestoProductAccessoryPrice', ProductAccessories.productPrice)

END
AS presupuestoProductAccessoryObject
FROM Mesquita.Presupuestos
INNER JOIN Mesquita.PresupuestoProducts ON Mesquita.PresupuestoProducts.presupuestoId = Mesquita.Presupuestos.presupuestoId
INNER JOIN Mesquita.Users ON Mesquita.Users.userId = Mesquita.Presupuestos.userId
INNER JOIN Mesquita.Clients ON Mesquita.Clients.clientId = Mesquita.Presupuestos.clientId
INNER JOIN Mesquita.CategoriasFiscales ON Mesquita.CategoriasFiscales.categoriaFiscalId = Mesquita.Clients.categoriaFiscalId
INNER JOIN Mesquita.FormasDePago ON Mesquita.FormasDePago.formaDePagoId = Mesquita.Presupuestos.formaDePagoId
LEFT JOIN Mesquita.PresupuestoProductAccessories ON Mesquita.PresupuestoProductAccessories.presupuestoProductId = Mesquita.PresupuestoProducts.presupuestoProductId
LEFT JOIN Mesquita.Products AS ProductAccessories ON ProductAccessories.productId = Mesquita.PresupuestoProductAccessories.productId
LEFT JOIN Mesquita.Products AS Products ON Products.productId = Mesquita.PresupuestoProducts.productId) AS queryA

GROUP BY queryA.presupuestoId, queryA.presupuestoUser, queryA.presupuestoClient, queryA.presupuestoAddress, queryA.formaDePagoName, queryA.presupuestoSubtotal, queryA.presupuestoTotal, queryA.presupuestoProductId, queryA.productName, queryA.presupuestoProductQuantity,queryA.presupuestoProductDiscount, queryA.productPrice) AS queryB
GROUP BY queryB.presupuestoId, queryB.presupuestoUser, queryB.presupuestoClient, queryB.presupuestoAddress, queryB.formaDePagoName, queryB.presupuestoSubtotal, queryB.presupuestoTotal;