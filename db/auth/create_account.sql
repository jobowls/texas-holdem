INSERT INTO accounts (player_id, cash, rank, win_loss)
VALUES ($1, 1000.00, 0, 0)
RETURNING account_id, cash, rank, win_loss;