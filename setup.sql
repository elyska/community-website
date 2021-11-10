
-- make sure the websiteuser account is set up and has the correct privileges
CREATE USER IF NOT EXISTS websiteuser IDENTIFIED BY 'websitepassword';
GRANT INSERT, SELECT, UPDATE, DELETE ON website.* TO websiteuser;

-- USE website;

DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS issues;

CREATE TABLE IF NOT EXISTS accounts (
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(25) NOT NULL,
  pass VARCHAR(70) NOT NULL
);

INSERT INTO accounts(user, pass)
	VALUES("doej", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO");

CREATE TABLE IF NOT EXISTS issues (
    id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    location VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    photo VARCHAR(255) NOT NULL,
    currdate DATETIME DEFAULT CURRENT_TIMESTAMP,
    userid MEDIUMINT UNSIGNED NOT NULL,
    status VARCHAR(9) DEFAULT "new",
    FOREIGN KEY (userid) REFERENCES accounts(id)
);

INSERT INTO issues(title, location, description, photo, userid) 
    VALUES ("Issue Title 1", "Description of location 1", "Description", "placeholder.png", 1),
    ("Issue Title 2", "Description of location 2", "Description", "placeholder.png", 1),
    ("Issue Title 3", "Description of location 3", "Description", "placeholder.png", 1),
    ("Issue Title 4", "Description of location 4", "Description", "placeholder.png", 1),
    ("Issue Title 5", "Description of location 5", "Description", "placeholder.png", 1);