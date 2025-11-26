-- Create the database
CREATE DATABASE inmoapp_db;

-- Create the user with password
CREATE USER admin WITH PASSWORD 'adminpassword';

-- Grant all privileges on the database to the user
GRANT ALL PRIVILEGES ON DATABASE inmoapp_db TO admin;

-- Connect to the new database and grant schema privileges
\c inmoapp_db
GRANT ALL ON SCHEMA public TO admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO admin;
