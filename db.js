//
const spicedPg = require("spiced-pg");
var dbUrl =
    process.env.DATABASE_URL ||
    "postgres:dvjes:postgres@localhost:5432/socialnetwork";
const db = spicedPg(dbUrl);
const bcrypt = require("bcryptjs");

// ========================================================
// ================ Hashing a password ====================
// ========================================================
exports.hashPassword = function(plainTextPassword) {
    return new Promise(function(resolve, reject) {
        bcrypt.genSalt(function(err, salt) {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(plainTextPassword, salt, function(err, hash) {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    });
};
exports.checkPassword = function(
    textEnteredInLoginForm,
    hashedPasswordFromDatabase
) {
    return new Promise(function(resolve, reject) {
        bcrypt.compare(
            textEnteredInLoginForm,
            hashedPasswordFromDatabase,
            function(err, doesMatch) {
                if (err) {
                    reject(err);
                } else {
                    resolve(doesMatch);
                }
            }
        );
    });
};
// ========================================================
// ================ Login and Registration ================
// ========================================================
exports.registerUser = function(first, last, email, hashedPassword) {
    // console.log("exports.registerUser", first, last, email, hashedPassword);
    return db.query(
        `
		INSERT INTO users (first, last, email, hash_password)
		VALUES ($1, $2, $3, $4) RETURNING *
		`,
        [first || null, last || null, email || null, hashedPassword || null]
    );
};

exports.getUserByEmail = function(email) {
    return db.query(
        `
		SELECT first, last, hash_password, users.id as userId, image
		FROM users
		WHERE email = $1
		`,
        [email]
    );
};
// is Loged in----------------------------------------
exports.getUserById = function(userId) {
    // console.log(userId);
    return db.query(
        `
		SELECT id, first, last, image, bio
		FROM users
		WHERE id = $1
		`,
        [userId]
    );
};
exports.updateProfileImage = function(userId, image) {
    return db.query(
        `
		UPDATE users
		SET image = $2
		WHERE id = $1
		RETURNING image
		`,
        [userId || null, image]
    );
};
module.exports.updateBio = function updateBio(id, bio) {
    return db.query(
        `
		UPDATE users
        SET bio = $2
        WHERE id = $1
        RETURNING bio
        `,
        [id || null, bio]
    );
};
// Check friendship status ----------------------------------------
exports.checkFriendshipStatus = function(senderId, recipientId) {
    // console.log("inside db,check frieendship", senderId, recipientId);
    return db.query(
        `
		SELECT sender_id, recipient_id, status
		FROM friendships
		WHERE (sender_id = $1 AND recipient_id =$2)
		OR (sender_id = $2 AND recipient_id =$1)
		`,
        [senderId, recipientId]
    );
};
exports.makeRequest = function(sender_id, recipient_id) {
    return db.query(
        `
		INSERT INTO friendships ( sender_id,recipient_id, status)
		VALUES ($1, $2, 1)
		RETURNING sender_id, recipient_id, status
		`,
        [sender_id, recipient_id]
    );
};
exports.requestAccepted = function(senderId, recipientId) {
    // console.log(senderId, recipientId);
    return db.query(
        `
		UPDATE friendships
        SET status = 2
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1)
        RETURNING status
		`,
        [senderId, recipientId]
    );
};
exports.cancelRequest = function(user1, user2) {
    return db.query(
        `
		DELETE FROM friendships
        WHERE (sender_id = $1 AND recipient_id = $2)
        OR (sender_id = $2 AND recipient_id = $1)
		`,
        [user1, user2]
    );
};
// ------------------------------------
exports.getPendingAndFriends = function(userId) {
    const q = `
	SELECT users.id, first, last, image, status
	FROM friendships
	JOIN users
	ON ( status = 1 AND recipient_id = $1 AND sender_id = users.id)
	OR ( status = 2 AND recipient_id = $1 AND sender_id = users.id)
	OR ( status = 2 AND sender_id = $1 AND recipient_id = users.id)
	`;
    return db.query(q, [userId]);
};
// ------------------------------------
exports.getUsersBeiIds = function(arrayOfIds) {
    const query = `
		SELECT id, first, last, image
		FROM users
		WHERE id = ANY($1)
		`;
    return db.query(query, [arrayOfIds]);
};
// ------------------------------------
exports.getChatMessages = function() {
    const q = `
	SELECT users.id as sender_id, first, last, image, message, chatmessages.id as message_id, chatmessages.created_at
	FROM users
	JOIN chatmessages
	ON users.id = sender_id
	ORDER BY created_at ASC LIMIT 10
	`;
    return db.query(q);
};
// ------------------------------------
exports.getSearchResult = function(userSearch) {
    const q = `
	SELECT id, first, last, image
	FROM users
	WHERE first ILIKE $1 OR last ILIKE $1
	`;
    return db.query(q, [userSearch + "%"]);
};
