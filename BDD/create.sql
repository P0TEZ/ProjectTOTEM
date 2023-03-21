CREATE TABLE Groupe(
   goupe_id INT,
   PRIMARY KEY(goupe_id)
);

CREATE TABLE SETTINGS(
   setting_name VARCHAR(50),
   setting_min_value INT NOT NULL,
   setting_max_value INT NOT NULL,
   setting_default_value INT NOT NULL,
   PRIMARY KEY(setting_name)
);

CREATE TABLE Admin(
   admin_password VARCHAR(50),
   PRIMARY KEY(admin_password)
);

CREATE TABLE TOTEM(
   TOTEM_IP VARCHAR(50),
   TOTEM_ID INT,
   goupe_id INT NOT NULL,
   PRIMARY KEY(TOTEM_IP, TOTEM_ID),
   FOREIGN KEY(goupe_id) REFERENCES Groupe(goupe_id)
);

CREATE TABLE set_to(
   goupe_id INT,
   setting_name VARCHAR(50),
   set_to_value INT,
   PRIMARY KEY(goupe_id, setting_name),
   FOREIGN KEY(goupe_id) REFERENCES Groupe(goupe_id),
   FOREIGN KEY(setting_name) REFERENCES SETTINGS(setting_name)
);
