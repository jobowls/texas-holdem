SELECT * FROM players p
JOIN accounts a ON p.player_id = a.player_id
WHERE email = $1;