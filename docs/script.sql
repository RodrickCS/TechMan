drop database if exists techman;
create database techman;
use techman;

-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `senha` INTEGER NOT NULL,
    `perfil_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `perfis` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `perfil` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipamentos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `equipamento` VARCHAR(191) NOT NULL,
    `imagem` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(5000) NOT NULL,
    `ativo` INTEGER NOT NULL,
    `data` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comentarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `comentario` VARCHAR(191) NOT NULL,
    `equipamento` INTEGER NOT NULL,
    `perfil` INTEGER NOT NULL,
    `data` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuarios` ADD CONSTRAINT `usuarios_perfil_id_fkey` FOREIGN KEY (`perfil_id`) REFERENCES `perfis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_perfil_fkey` FOREIGN KEY (`perfil`) REFERENCES `perfis`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_equipamento_fkey` FOREIGN KEY (`equipamento`) REFERENCES `equipamentos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;


-- AddData
LOAD DATA INFILE 'C:/Users/Desenvolvimento/Desktop/SENAI/3DES/Aulas/ExercicioProdutividade/TechMan/docs/csv/perfis.csv'
INTO TABLE perfis
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

-- AddData
LOAD DATA INFILE 'C:/Users/Desenvolvimento/Desktop/SENAI/3DES/Aulas/ExercicioProdutividade/TechMan/docs/csv/usuarios.csv'
INTO TABLE usuarios
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

-- AddData
LOAD DATA INFILE 'C:/Users/Desenvolvimento/Desktop/SENAI/3DES/Aulas/ExercicioProdutividade/TechMan/docs/csv/equipamentos.csv'
INTO TABLE equipamentos
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

-- AddData
LOAD DATA INFILE 'C:/Users/Desenvolvimento/Desktop/SENAI/3DES/Aulas/ExercicioProdutividade/TechMan/docs/csv/comentarios.csv'
INTO TABLE comentarios
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 ROWS;

-- CreateView
CREATE VIEW vw_usuario AS 
SELECT u.id AS Usuario, u.perfil_id AS Perfil, p.perfil AS Role FROM usuarios u 
INNER JOIN perfis p
ON u.perfil_id = p.id;

--CreateView
CREATE VIEW vw_comentarios AS
SELECT p.perfil ,c.equipamento, c.comentario, c.data FROM comentarios c 
INNER JOIN perfis p
ON c.perfil = p.id
WHERE c.equipamento = 5;
