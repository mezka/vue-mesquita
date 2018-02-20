WITH new_contact AS (
    INSERT INTO Mesquita.Contacts (contactName, contactEmail, contactPhone) VALUES($1, $2, $3)
RETURNING contactId AS contactId), new_client AS (
    INSERT INTO Mesquita.Clients
(clientName, clientAddress, clientPhone, clientCuit, categoriaFiscalId, clientFiscalAddress)
VALUES ($4, $5, $6, $7, $8, $9)
RETURNING clientId AS clientId)

INSERT INTO Mesquita.ClientContacts
(contactId, clientId )
VALUES((SELECT contactId FROM new_contact), (SELECT clientId FROM new_client))
RETURNING json_build_object('clientid', clientId, 'contactid', contactId) AS result;
