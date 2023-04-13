INSERT INTO public.admin(
	admin_password)
	VALUES ('0dd5bce87ac2673936bafcf9e02effcc326a0d38b5dbd34aed2184f5ad31e019');

INSERT INTO public.settings(
	setting_name, setting_min_value, setting_max_value, setting_default_value)
	VALUES 
        ('preset', 0, 3, 0),
        ('volume', 0, 100, 50),
        ('balance', -5, 5, 0),
        ('status', 0, 1, 1),
        ('disable', 0, 1, 0);