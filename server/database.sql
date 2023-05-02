create TABLE user (
    id SERIAL PRIMARY KEY,
    address VARCHAR(255) PRIMARY KEY,
    rate INTEGER
);

create TABLE order_post (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    owner INTEGER REFERENCES user(id),
);

CREATE TABLE comment (
    id SERIAL PRIMARY KEY,
    owner VARCHAR(255),
    text VARCHAR(255) IS NOT NULL,
    hasOwnerLike BOOLEAN,
    post_id INTEGER REFERENCES order_post(id)
);

CREATE TABLE comment_rate (
    id SERIAL PRIMARY KEY,
    comment_id INTEGER REFERENCES comment(id),
    user_id INTEGER REFERENCES user(id),
    is_liked BOOLEAN,
    is_disliked BOOLEAN,
    UNIQUE(comment_id, user_address)
);
