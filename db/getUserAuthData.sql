SELECT Users.userId, Users.userEmail, Passwords.passwordHash AS storedPasswordHash FROM Mesquita.Users
INNER JOIN Mesquita.Passwords ON Users.userId = Passwords.userId
WHERE Users.userEmail = $1;