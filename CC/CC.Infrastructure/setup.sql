DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS UserTokens;

CREATE TABLE Users (
    Id           INT IDENTITY(1,1)  PRIMARY KEY,
    Username     VARCHAR (30)       NOT NULL,
    PasswordHash VARCHAR (20)       NOT NULL,
    PasswordSalt VARCHAR (30)       NOT NULL
);

CREATE TABLE UserTokens (
    Id       INT IDENTITY(1,1)  PRIMARY KEY,
    UserId   INT       NOT NULL,
    Token    VARCHAR (200)      NOT NULL,
    Created  DATETIME           NOT NULL,
    Expires  DATETIME           NOT NULL
    CONSTRAINT [user_id_key] FOREIGN KEY ([user_id]) REFERENCES [users]([id])
);

INSERT INTO Users (Username, PasswordHash, PasswordSalt) VALUES
    ('John', 'asdqwert', 'ahcd')
;

INSERT INTO UserTokens (UserId, Token, Created, Expires) VALUES
    (1, 'TestToken', NOW(), NOW())
;