UPDATE accounts
SET profile_pic = $1
WHERE account_id = $2
RETURNING profile_pic;
