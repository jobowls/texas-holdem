UPDATE accounts
SET cash = cash - $1
WHERE account_id = $2
RETURNING cash;