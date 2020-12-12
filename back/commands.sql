CREATE TABLE Accounts (
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    is_deleted BOOLEAN,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    email VARCHAR(55) NOT NULL UNIQUE,
    hashed_password VARCHAR(100) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    pic_url TEXT,
    description VARCHAR(255),
    newsletters BOOLEAN NOT NULL,
    PRIMARY KEY (id)
)
ENGINE=INNODB;

CREATE TABLE Forums (
    user_id SMALLINT UNSIGNED NOT NULL,
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    text TEXT NOT NULL,
    image_url TEXT,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    total_comments INT NOT NULL,
    PRIMARY KEY (id)
)
ENGINE=INNODB;

CREATE TABLE Comments (
    user_id SMALLINT UNSIGNED NOT NULL,
    forum_id SMALLINT UNSIGNED NOT NULL,
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    text TEXT NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id)
)
ENGINE=INNODB;

CREATE TABLE Roles (
    user_id SMALLINT UNSIGNED NOT NULL,
    id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    is_mod BOOLEAN NOT NULL,
    is_admin BOOLEAN NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    PRIMARY KEY (id)
)
ENGINE=INNODB;