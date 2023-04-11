-- create a group
CREATE OR REPLACE FUNCTION create_new_group(group_id INT)
RETURNS VOID AS $$
BEGIN
  WITH new_group AS (
    INSERT INTO Groupe (groupe_id)
    VALUES (group_id)
    RETURNING groupe_id
  )
  INSERT INTO set_to (groupe_id, setting_name, set_to_value)
  SELECT ng.groupe_id, s.setting_name, s.setting_default_value
  FROM new_group ng, SETTINGS s
  WHERE ng.groupe_id = group_id;
END;
$$ LANGUAGE plpgsql;

-- call it
--SELECT create_new_group(1);

--get a new group id

CREATE OR REPLACE FUNCTION get_new_group_id() 
RETURNS INTEGER AS $$
DECLARE
  new_group_id INTEGER;
BEGIN
  SELECT (s1.groupe_id + 1) INTO new_group_id
  FROM Groupe s1
  WHERE NOT EXISTS (
    SELECT 1
    FROM Groupe s2
    WHERE s2.groupe_id = s1.groupe_id + 1
  )
  ORDER BY s1.groupe_id ASC
  LIMIT 1;

  IF new_group_id IS NULL THEN
    new_group_id := 1;
  END IF;

  RETURN new_group_id;
END;
$$ LANGUAGE plpgsql;
   

-- call it
--SELECT get_new_group_id();

--create a new totem
CREATE OR REPLACE FUNCTION create_new_totem(new_totem_id INT, new_totem_ip VARCHAR)
RETURNS VOID AS $$
DECLARE
  new_group_id INTEGER;
BEGIN
  -- Get the next available group ID
  SELECT get_new_group_id() INTO new_group_id;

  -- Create a new group
  PERFORM create_new_group(new_group_id);

  -- Add the new totem to the group
  INSERT INTO TOTEM(TOTEM_IP, TOTEM_ID, groupe_id)
  VALUES (new_totem_ip, new_totem_id, new_group_id);
END;
$$ LANGUAGE plpgsql;

-- call it
--SELECT create_new_totem(<id>, <ip>);

--delete empty groups

CREATE OR REPLACE FUNCTION remove_empty_groups()
RETURNS void AS $$
DECLARE
  group_id INT;
BEGIN
  FOR group_id IN SELECT groupe_id FROM Groupe LOOP
    IF NOT EXISTS(SELECT 1 FROM TOTEM WHERE groupe_id = group_id) THEN
      IF EXISTS(SELECT 1 FROM Groupe WHERE groupe_id = group_id) THEN
        DELETE FROM set_to WHERE groupe_id = group_id;
        DELETE FROM Groupe WHERE groupe_id = group_id;
      END IF;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- call it
--SELECT remove_empty_groups();

--send a totem to a group
CREATE OR REPLACE FUNCTION move_totem_to_group(ip character varying, id integer, new_group_id integer)
RETURNS void AS $$
DECLARE
    old_group_id integer;
BEGIN
    -- Get the old group ID of the totem
    SELECT groupe_id INTO old_group_id FROM TOTEM WHERE TOTEM_IP = ip AND TOTEM_ID = id;
    
    -- Verify if the new group exists
    IF NOT EXISTS(SELECT 1 FROM groupe WHERE groupe_id = new_group_id) THEN
        -- Create the new group
        PERFORM create_new_group(new_group_id);
    END IF;

    IF old_group_id IS NOT NULL THEN
        -- Update the totem's group ID
        UPDATE TOTEM SET groupe_id = new_group_id WHERE TOTEM_IP = ip AND TOTEM_ID = id;

        -- Check if the old group is empty and delete it if necessary
        PERFORM remove_empty_groups();

    ELSE
        -- ERROR: The totem doesn't exist
        RAISE EXCEPTION 'The information of the totem % with the id % doesn''t exist', ip, id USING ERRCODE = 'TOTEM_NOT_EXIST';
    END IF;
END;
$$ LANGUAGE plpgsql;


-- call it
--SELECT move_totem_to_group(<ip>, <id>, <new_group_id>);

--remove a group with a certian id 
CREATE OR REPLACE FUNCTION remove_group_with_id(group_id INTEGER)
RETURNS VOID AS $$
DECLARE
  totem_data RECORD;
  new_group_id INTEGER;
BEGIN
  
  -- move each totem linked to the group to a new group
  FOR totem_data IN SELECT totem_ip, totem_id FROM TOTEM WHERE group_id = group_id LOOP
    -- get a new group id for moving the totems to
    new_group_id := get_new_group_id();
    PERFORM move_totem_to_group(totem_data.totem_ip, totem_data.totem_id, new_group_id);
  END LOOP;
    
  -- remove any empty groups created by moving the totems
  PERFORM remove_empty_groups();
END;
$$ LANGUAGE plpgsql;
