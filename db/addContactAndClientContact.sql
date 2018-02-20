WITH new_contact AS (
    INSERT INTO Mesquita.Contacts (contactName, contactEmail, contactPhone, contactTimeToContact, contactText) VALUES($2, $3, $4, $5, $6)
    RETURNING contactId AS contactId
)
INSERT INTO Mesquita.ClientContacts
(contactId, clientId )
VALUES((SELECT contactId FROM new_contact), $1)
RETURNING json_build_object('clientid', clientId, 'contactid', contactId) AS result;
