INSERT INTO players (email, username, password, is_dealer)
VALUES ($1, $2, $3, false)
RETURNING player_id, username, is_dealer;