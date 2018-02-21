WITH clientid_cte AS(
    SELECT DISTINCT CAST($1 AS INTEGER) AS candidateClientId FROM Mesquita.Products
), delete_client_contact AS (
    DELETE FROM Mesquita.ClientContacts AS ClientContacts
    WHERE ClientContacts.clientId IN (SELECT candidateClientId FROM clientid_cte)
    RETURNING ClientContacts.contactId AS contactId
), delete_contacts AS (
    DELETE FROM Mesquita.Contacts AS Contacts
    WHERE Contacts.contactId IN (SELECT contactId FROM delete_client_contact)
)
DELETE FROM Mesquita.Clients AS Clients WHERE Clients.clientId = (SELECT candidateClientId FROM clientid_cte);