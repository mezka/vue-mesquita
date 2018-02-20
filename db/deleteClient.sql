WITH delete_client_contact AS (
    DELETE FROM Mesquita.ClientContacts AS ClientContacts
    WHERE ClientContacts.clientId = $1
    RETURNING ClientContacts.contactId AS contactId
), delete_contacts AS (
    DELETE FROM Mesquita.Contacts AS Contacts
    WHERE Contacts.contactId = (SELECT contactId FROM delete_client_contact)
)
DELETE FROM Mesquita.Clients AS Clients WHERE Clients.clientId = $1;