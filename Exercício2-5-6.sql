CREATE DATABASE mydb;

USE mydb;

/*DDL*/

CREATE TABLE IF NOT EXISTS `mydb`.`categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mydb`.`produto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `descricao` VARCHAR(100) NOT NULL,
  `preco` DOUBLE NOT NULL,
  `quantidade` INT NOT NULL,
  `data_criacao` DATE NOT NULL,
  `data_alteracao` DATE NULL,
  `categoria_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_produto_categoria_idx` (`categoria_id` ASC) VISIBLE,
  CONSTRAINT `fk_produto_categoria`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `mydb`.`categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mydb`.`cliente` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(150) NOT NULL,
  `endereco` VARCHAR(150) NOT NULL,
  `email` VARCHAR(100) NULL,
  `data_criacao` DATE NOT NULL,
  `data_alteracao` DATE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mydb`.`venda` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `produto_id` INT NOT NULL,
  `cliente_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_venda_cliente_idx` (`cliente_id` ASC) VISIBLE,
  INDEX `fk_venda_produto_idx` (`produto_id` ASC) INVISIBLE,
  CONSTRAINT `fk_venda_produto`
    FOREIGN KEY (`produto_id`)
    REFERENCES `mydb`.`produto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_venda_cliente`
    FOREIGN KEY (`cliente_id`)
    REFERENCES `mydb`.`cliente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

/*DML*/

-- Categorias
INSERT INTO `mydb`.`categoria` (`descricao`) 
VALUES ('Eletrônicos');
INSERT INTO `mydb`.`categoria` (`descricao`) 
VALUES ('Roupas');
INSERT INTO `mydb`.`categoria` (`descricao`) 
VALUES ('Livros');

-- Produtos
INSERT INTO `mydb`.`produto` (`descricao`, `preco`, `quantidade`, `data_criacao`, `categoria_id`) 
VALUES ('iPhone 14', 500, 10, '2023-06-09', 1);
INSERT INTO `mydb`.`produto` (`descricao`, `preco`, `quantidade`, `data_criacao`, `categoria_id`) 
VALUES ('Calça Jeans', 20, 50, '2023-06-09', 2);
INSERT INTO `mydb`.`produto` (`descricao`, `preco`, `quantidade`, `data_criacao`, `categoria_id`) 
VALUES ('Harry Potter e a Câmara Secreta', 15, 30, '2023-06-09', 3);

-- Clientes
INSERT INTO `mydb`.`cliente` (`nome`, `endereco`, `email`, `data_criacao`) 
VALUES ('Jeison Pereira de Oliveira', 'Rua dos Bobos, 0, Chapada', 'jeison.oliveira@icomp.ufam.edu.br', '2023-06-09');
INSERT INTO `mydb`.`cliente` (`nome`, `endereco`, `email`, `data_criacao`) 
VALUES ('Ana Frazão de Oliveira', 'Rua dos Bobos, 0, Chapada', 'ana.frazao@gmail.com', '2023-06-09');
INSERT INTO `mydb`.`cliente` (`nome`, `endereco`, `email`, `data_criacao`) 
VALUES ('Joyce Nascimento', 'Rua dos Bobos, 0, Chapada', 'joyce.nascimento@gmail.com', '2023-06-09');

-- Vendas
INSERT INTO `mydb`.`venda` (`produto_id`, `cliente_id`) VALUES (1, 1);
INSERT INTO `mydb`.`venda` (`produto_id`, `cliente_id`) VALUES (2, 2);

-- Lista todas as categorias
SELECT * FROM `mydb`.`categoria`;

-- Lista todos os produtos
SELECT * FROM `mydb`.`produto`;

-- Lista todos os clientes
SELECT * FROM `mydb`.`cliente`;

-- Lista todas as vendas
SELECT * FROM `mydb`.`venda`;

-- Lista as vendas e os produtos e clientes associados
SELECT venda.id as venda, produto.descricao AS produto, cliente.nome AS cliente
FROM `mydb`.`venda`
JOIN `mydb`.`produto` ON venda.produto_id = produto.id
JOIN `mydb`.`cliente` ON venda.cliente_id = cliente.id;

-- Altera o preço do Produto 1
UPDATE `mydb`.`produto` SET `preco` = 14000 WHERE `id` = 1;

-- Altera o endereço do Cliente 1
UPDATE `mydb`.`cliente` SET `endereco` = 'Rua Santa Isabel, 120, São Geraldo' WHERE `id` = 1;

-- Altera a descrição da Categoria 2
UPDATE `mydb`.`categoria` SET `descricao` = 'Calças' WHERE `id` = 2;

-- Exclui a Venda 1
DELETE FROM `mydb`.`venda` WHERE `id` = 1;

-- Exclui o Produto 3
DELETE FROM `mydb`.`produto` WHERE `id` = 3;

-- Exclui o Cliente 3
DELETE FROM `mydb`.`cliente` WHERE `id` = 3;

-- Exclui a Categoria 3
DELETE FROM `mydb`.`categoria` WHERE `id` = 3;