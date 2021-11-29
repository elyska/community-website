
-- make sure the websiteuser account is set up and has the correct privileges
-- CREATE USER IF NOT EXISTS websiteuser IDENTIFIED BY 'websitepassword';
-- GRANT INSERT, SELECT, UPDATE, DELETE ON sql4451580.* TO sql4451580;

-- USE website;
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS issues;
DROP TABLE IF EXISTS accounts;


CREATE TABLE IF NOT EXISTS accounts (
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(25) NOT NULL,
  pass VARCHAR(70) NOT NULL
);

INSERT INTO accounts(user, pass)
	VALUES("doej", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO"),
    ("user1", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO"),
    ("user2", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO"),
    ("council", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO");

CREATE TABLE IF NOT EXISTS issues (
    id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(60) NOT NULL,
    location VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    photo BLOB NOT NULL,
    currdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    userid MEDIUMINT UNSIGNED NOT NULL,
    status VARCHAR(9) DEFAULT "new",
    longitude DOUBLE(10, 7),
    latitude DOUBLE(9, 7),
    FOREIGN KEY (userid) REFERENCES accounts(id)
);

INSERT INTO issues(title, location, description, photo, userid) 
    VALUES ("Stray Dog", "City Centre", "Description", "stray-dog.jpg", 3),
    ("Bike in Coventry Canal", "Near Canal Basin", "There is an old bike under water.", "bike-under-water.jpg", 1),
    ("Fallen Tree", "Description of location 2", "Description", "fallen-tree.jpg", 1),
    ("Flooding Underpass", "Ring Road, Park Road", "Description", "flood.jpg", 1),
    ("Covered Road Sign", "Description of location 4", "Description", "road-sign.jpg", 1),
    ("Broken Fence", "Description of location 5", "Description", "fence.jpg", 2),
    ("Deer", "Description of location 5", "Description", "deer.jpg", 2),
    ("Abandoned Car", "Description of location 5", "Description", "abandoned-car.jpg", 3),
    ("Rubbish in the Playground", "War Memorial Park", "Description", "rubbish.jpg", 1),
    ("Nails, Screws and Sharp Objects on the Road", "Park Road", "Description", "nails.jpg", 1);
    
