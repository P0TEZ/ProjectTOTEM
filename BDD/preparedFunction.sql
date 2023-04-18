-- create a group
CREATE OR REPLACE FUNCTION create_new_group(new_groupe_id INT)
RETURNS VOID AS $$
BEGIN
  WITH new_groupe AS (
    INSERT INTO Groupe (groupe_id)
    VALUES (new_groupe_id)
    RETURNING groupe_id
  )
  INSERT INTO set_to (groupe_id, setting_name, set_to_value)
  SELECT ng.groupe_id, s.setting_name, s.setting_default_value
  FROM new_groupe ng, SETTINGS s
  WHERE ng.groupe_id = groupe_id;
END;
$$ LANGUAGE plpgsql;

-- call it
--SELECT create_new_group(1);

--get a new groupe id

CREATE OR REPLACE FUNCTION get_new_groupe_id() 
RETURNS INTEGER AS $$
DECLARE
  new_groupe_id INTEGER;
BEGIN
  SELECT (s1.groupe_id + 1) INTO new_groupe_id
  FROM Groupe s1
  WHERE NOT EXISTS (
    SELECT 1
    FROM Groupe s2
    WHERE s2.groupe_id = s1.groupe_id + 1
  )
  ORDER BY s1.groupe_id ASC
  LIMIT 1;

  IF new_groupe_id IS NULL THEN
    new_groupe_id := 1;
  END IF;

  RETURN new_groupe_id;
END;
$$ LANGUAGE plpgsql;
   

-- call it
--SELECT get_new_groupe_id();

--create a new totem
CREATE OR REPLACE FUNCTION create_new_totem(new_totem_id INT, new_totem_ip VARCHAR)
RETURNS VOID AS $$
DECLARE
  new_groupe_id INTEGER;
BEGIN
  -- Get the next available groupe ID
  SELECT get_new_groupe_id() INTO new_groupe_id;

  -- Create a new group
  PERFORM create_new_group(new_groupe_id);

  -- Add the new totem to the group
  INSERT INTO TOTEM(TOTEM_IP, TOTEM_ID, groupe_id)
  VALUES (new_totem_ip, new_totem_id, new_groupe_id);
END;
$$ LANGUAGE plpgsql;

-- call it
--SELECT create_new_totem(<id>, <ip>);

--delete empty groups

CREATE OR REPLACE FUNCTION remove_empty_groups()
RETURNS void AS $$
DECLARE
  current_groupe_id INT;
BEGIN
  FOR current_groupe_id IN SELECT groupe_id FROM Groupe LOOP
    IF NOT EXISTS(SELECT 1 FROM TOTEM WHERE groupe_id = current_groupe_id) THEN
      IF EXISTS(SELECT 1 FROM Groupe WHERE groupe_id = current_groupe_id) THEN
        DELETE FROM set_to WHERE groupe_id = current_groupe_id;
        DELETE FROM Groupe WHERE groupe_id = current_groupe_id;
      END IF;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- call it
--SELECT remove_empty_groups();

--send a totem to a group
CREATE OR REPLACE FUNCTION move_totem_to_group(ip character varying, id integer, new_groupe_id integer)
RETURNS void AS $$
DECLARE
    old_groupe_id integer;
BEGIN
    -- Get the old groupe ID of the totem
    SELECT groupe_id INTO old_groupe_id FROM TOTEM WHERE TOTEM_IP = ip AND TOTEM_ID = id;
    
    -- Verify if the new groupe exists
    IF NOT EXISTS(SELECT 1 FROM groupe WHERE groupe_id = new_groupe_id) THEN
        -- Create the new group
        PERFORM create_new_group(new_groupe_id);
    END IF;

    IF old_groupe_id IS NOT NULL THEN
        -- Update the totem's groupe ID
        UPDATE TOTEM SET groupe_id = new_groupe_id WHERE TOTEM_IP = ip AND TOTEM_ID = id;

        -- Check if the old groupe is empty and delete it if necessary
        PERFORM remove_empty_groups();

    ELSE
        -- ERROR: The totem doesn't exist
        RAISE EXCEPTION 'The information of the totem % with the id % doesn''t exist', ip, id USING ERRCODE = 'TOTEM_NOT_EXIST';
    END IF;
END;
$$ LANGUAGE plpgsql;


-- call it
--SELECT move_totem_to_group(<ip>, <id>, <new_groupe_id>);

--remove a groupe with a certian id 
CREATE OR REPLACE FUNCTION remove_groupe_with_id(current_groupe_id INTEGER)
RETURNS VOID AS $$
DECLARE
  totem_data RECORD;
  new_groupe_id INTEGER;
BEGIN
  
  -- move each totem linked to the groupe to a new group
  FOR totem_data IN SELECT totem_ip, totem_id FROM TOTEM WHERE groupe_id = current_groupe_id LOOP
    -- get a new groupe id for moving the totems to
    new_groupe_id := get_new_groupe_id();
    PERFORM move_totem_to_group(totem_data.totem_ip, totem_data.totem_id, new_groupe_id);
  END LOOP;
    
  -- remove any empty groups created by moving the totems
  PERFORM remove_empty_groups();
END;
$$ LANGUAGE plpgsql;

--remove a totem with a certian id and ip
CREATE OR REPLACE FUNCTION delete_totem(delete_totem_id integer, delete_totem_ip character varying) RETURNS VOID AS $$
DECLARE
  current_groupe_id integer;
BEGIN
  -- Récupérer le groupe_id associé au totem à supprimer
  SELECT groupe_id INTO current_groupe_id FROM totem WHERE totem.totem_id = delete_totem_id AND totem.totem_ip = delete_totem_ip;

  IF current_groupe_id IS NOT NULL THEN
        -- Delete the totem
        DELETE FROM TOTEM WHERE TOTEM_ID = delete_totem_id AND TOTEM_IP = delete_totem_ip;


        -- Check if the groupe is empty and delete it if necessary
        PERFORM remove_empty_groups();

    ELSE
        -- ERROR: The totem doesn't exist
        RAISE EXCEPTION 'The information of the totem with the id % and ip % doesn''t exist', totem_id, totem_ip USING ERRCODE = 'TOTEM_NOT_EXIST';
    END IF;
END;
$$ LANGUAGE plpgsql;
