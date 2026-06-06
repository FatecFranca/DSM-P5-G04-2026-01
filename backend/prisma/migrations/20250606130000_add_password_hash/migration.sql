-- Contas antigas (sem senha) são removidas antes de adicionar a coluna obrigatória.
DELETE FROM `users`;

ALTER TABLE `users` ADD COLUMN `password_hash` VARCHAR(255) NOT NULL;
