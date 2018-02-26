INSERT INTO Mesquita.Presupuestos(userId, clientId, formaDePagoId, presupuestoAddress, presupuestoObra, presupuestoOc)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING presupuestoId
