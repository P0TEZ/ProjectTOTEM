DROP TABLE IF EXISTS set_to;
DROP TABLE IF EXISTS TOTEM;
DROP TABLE IF EXISTS Admin;
DROP TABLE IF EXISTS SETTINGS;
DROP TABLE IF EXISTS Groupe;

DROP FUNCTION IF EXISTS create_new_group(int);
DROP FUNCTION IF EXISTS get_new_group_id();
DROP FUNCTION IF EXISTS create_new_totem(int,varchar);
DROP FUNCTION IF EXISTS remove_empty_groups();
DROP FUNCTION IF EXISTS move_totem_to_group(varchar,int,int);
DROP FUNCTION IF EXISTS remove_group_with_id(int);
DROP FUNCTION IF EXISTS delete_totem(int,varchar);
