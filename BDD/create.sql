CREATE TABLE Groupe(
   groupe_id INT,
   PRIMARY KEY(groupe_id)
);

CREATE TABLE SETTINGS(
   setting_name VARCHAR(50),
   setting_min_value INT NOT NULL,
   setting_max_value INT NOT NULL,
   setting_default_value INT NOT NULL,
   PRIMARY KEY(setting_name)
);

CREATE TABLE Admin(
   admin_password VARCHAR(100),
   PRIMARY KEY(admin_password)
);

CREATE TABLE TOTEM(
   TOTEM_IP VARCHAR(50),
   TOTEM_ID INT,
   groupe_id INT NOT NULL,
   PRIMARY KEY(TOTEM_IP, TOTEM_ID),
   FOREIGN KEY(groupe_id) REFERENCES Groupe(groupe_id)
);

CREATE TABLE set_to(
   groupe_id INT,
   setting_name VARCHAR(50),
   set_to_value INT,
   PRIMARY KEY(groupe_id, setting_name),
   FOREIGN KEY(groupe_id) REFERENCES Groupe(groupe_id),
   FOREIGN KEY(setting_name) REFERENCES SETTINGS(setting_name)
);
