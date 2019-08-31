CREATE TABLE IF NOT EXISTS locations (
  id INT(6) AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS categories (
  id INT(6) AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS containers (
  id INT(6) AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  date_entered DATE NOT NULL,
  category_id INT(6),
  location_id INT(6),
  PRIMARY KEY (id),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (location_id) REFERENCES locations(id)
)ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS items (
  id INT(6) AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  date_entered DATE NOT NULL,
  container_id INT(6),
  PRIMARY KEY (id),
  FOREIGN KEY (container_id) REFERENCES containers(id)
)ENGINE=InnoDB;
