WITH delete_client_contact AS(
    DELETE FROM Mesquita.ClientContacts AS ClientContacts
    WHERE ClientContacts.contactId = $1
    RETURNING ClientContacts.contactId AS contactId
)

DELETE FROM Mesquita.Contacts AS Contacts
WHERE Contacts.contactId = (SELECT contactId FROM delete_client_contact);