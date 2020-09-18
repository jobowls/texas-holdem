INSERT INTO poker_game (player_id, account_id, stakes, prize_money, complete)
VALUES ($1, $2, '25/50', 4000.00, false)
RETURNING player_id, account_id, username, stakes, prize_money, complete;