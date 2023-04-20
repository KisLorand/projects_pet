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
    UserId   VARCHAR (30)       NOT NULL,
    Token    VARCHAR (200)      NOT NULL,
    Created  DATETIME           NOT NULL
    CONSTRAINT [user_id_key] FOREIGN KEY ([user_id]) REFERENCES [users]([id])
);

