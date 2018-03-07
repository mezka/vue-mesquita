SELECT queryB.presupuestoId, (SELECT to_char(queryB.presupuestoCreatedDate, 'dd-MM-yyyy')) AS presupuestoCreatedDate, queryB.presupuestoUser, queryB.presupuestoClient, queryB.presupuestoAddress, queryB.formaDePagoName, queryB.presupuestoDiscountAmount, queryB.presupuestoStringTotal, queryB.presupuestoSubtotal, queryB.presupuestoTotal,

json_agg(json_build_object('presupuestoproductid', queryB.presupuestoProductId, 'presupuestoproductname', queryB.productName, 'presupuestoproductquantity', queryB.presupuestoProductQuantity, 'presupuestoproductaccessories', queryB.presupuestoProductAccessories, 'presupuestoproductdiscount', queryB.presupuestoProductDiscount, 'presupuestoproductdiscountamount', (queryB.presupuestoProductDiscount/100) * queryB.presupuestoProductPrice ,'presupuestoproductprice', queryB.presupuestoProductPrice)) AS presupuestoProducts FROM

(SELECT queryA.presupuestoId, queryA.presupuestoCreatedDate, queryA.presupuestoUser, queryA.presupuestoClient, queryA.presupuestoAddress, queryA.formaDePagoName, queryA.presupuestoDiscountAmount, queryA.presupuestoStringTotal, queryA.presupuestoSubtotal, queryA.presupuestoTotal, queryA.presupuestoProductId, queryA.productName, queryA.presupuestoProductQuantity, json_agg(queryA.presupuestoProductAccessoryObject) AS presupuestoProductAccessories, queryA.presupuestoProductDiscount, queryA.productPrice AS presupuestoProductPrice FROM

(SELECT Presupuestos.presupuestoId, Presupuestos.presupuestoCreatedDate, jsonb_build_object('userfirstname', Users.userFirstName, 'userlastname', Users.userLastName, 'useremail', Users.userEmail) as presupuestoUser, jsonb_build_object('clientid', Clients.clientId, 'clientname', Clients.clientName, 'clientcategoriafiscal', CategoriasFiscales.categoriaFiscalName, 'clientcategoriafiscalimpuesto', CategoriasFiscales.categoriaFiscalImpuesto, 'clientcuit', Clients.clientCuit) AS presupuestoClient, Presupuestos.presupuestoAddress, FormasDePago.formaDePagoName, Presupuestos.presupuestoSubtotal, Presupuestos.presupuestoDiscountAmount, Presupuestos.presupuestoStringTotal, Presupuestos.presupuestoTotal, Mesquita.PresupuestoProducts.presupuestoProductId, Products.productName, Mesquita.PresupuestoProducts.presupuestoProductQuantity, Mesquita.PresupuestoProducts.presupuestoProductDiscount, Products.productPrice, 

CASE WHEN Mesquita.PresupuestoProductAccessories.presupuestoProductAccessoryId IS NULL THEN NULL
ELSE

json_build_object('presupuestoproductaccessoryid', Mesquita.PresupuestoProductAccessories.presupuestoProductAccessoryId, 'presupuestoproductaccessoryname', ProductAccessories.productName, 'presupuestoproductaccessoryquantity', Mesquita.PresupuestoProductAccessories.presupuestoProductAccessoryQuantity, 'presupuestoproductaccessorydiscount', Mesquita.PresupuestoProductAccessories.presupuestoProductAccessoryDiscount, 'presupuestoproductaccessorydiscountamount', ProductAccessories.productPrice * (PresupuestoProductAccessories.presupuestoProductAccessoryDiscount/100), 'presupuestoproductaccessoryprice', ProductAccessories.productPrice)

END
AS presupuestoProductAccessoryObject
FROM Mesquita.Presupuestos
INNER JOIN Mesquita.PresupuestoProducts ON Mesquita.PresupuestoProducts.presupuestoId = Mesquita.Presupuestos.presupuestoId
INNER JOIN Mesquita.Users ON Mesquita.Users.userid = Mesquita.Presupuestos.userId
INNER JOIN Mesquita.Clients ON Mesquita.Clients.clientId = Mesquita.Presupuestos.clientId
INNER JOIN Mesquita.CategoriasFiscales ON Mesquita.CategoriasFiscales.categoriaFiscalId = Mesquita.Clients.categoriaFiscalId
INNER JOIN Mesquita.FormasDePago ON Mesquita.FormasDePago.formaDePagoId = Mesquita.Presupuestos.formaDePagoId
LEFT JOIN Mesquita.PresupuestoProductAccessories ON Mesquita.PresupuestoProductAccessories.presupuestoProductId = Mesquita.PresupuestoProducts.presupuestoProductId
LEFT JOIN Mesquita.Products AS ProductAccessories ON ProductAccessories.productId = Mesquita.PresupuestoProductAccessories.productId
LEFT JOIN Mesquita.Products AS Products ON Products.productId = Mesquita.PresupuestoProducts.productId
WHERE Presupuestos.userId = $1 AND Clients.clientId = $2
) AS queryA
GROUP BY queryA.presupuestoId, queryA.presupuestoCreatedDate, queryA.presupuestoUser, queryA.presupuestoClient, queryA.presupuestoAddress, queryA.formaDePagoName, queryA.presupuestoDiscountAmount, queryA.presupuestoStringTotal, queryA.presupuestoSubtotal, queryA.presupuestoTotal, queryA.presupuestoProductId, queryA.productName, queryA.presupuestoProductQuantity,queryA.presupuestoProductDiscount, queryA.productPrice) AS queryB
GROUP BY queryB.presupuestoId, presupuestoCreatedDate, queryB.presupuestoUser, queryB.presupuestoClient, queryB.presupuestoAddress, queryB.formaDePagoName, queryB.presupuestoDiscountAmount, queryB.presupuestoStringTotal, queryB.presupuestoSubtotal, queryB.presupuestoTotal;