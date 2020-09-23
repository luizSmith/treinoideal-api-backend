#DEV
Create database  if not exists db_personal_prod DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS tb_personal
(
	cd_personal INT NOT NULL AUTO_INCREMENT,
    nm_personal VARCHAR(75) NOT NULL,
    nm_email VARCHAR(75) NOT NULL UNIQUE,
    nm_senha VARCHAR(75) NOT NULL,
    dt_nascimento DATE NOT NULL,
    cd_cref VARCHAR(20) NOT NULL UNIQUE,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    CONSTRAINT pk_personal
        PRIMARY KEY (cd_personal)
);

CREATE TABLE IF NOT EXISTS tb_uf
(
  sg_uf CHAR(2) NOT NULL,
  nm_estado VARCHAR(45) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT pk_uf
    PRIMARY KEY (sg_uf)
);

CREATE TABLE IF NOT EXISTS tb_aparelho
(
	cd_aparelho INT NOT NULL AUTO_INCREMENT,
    nm_aparelho VARCHAR(75) NOT NULL,
    ds_aparelho LONGTEXT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    CONSTRAINT pk_aparelho
	    PRIMARY KEY (cd_aparelho)
);

CREATE TABLE IF NOT EXISTS tb_cep
(
  cd_cep INT NOT NULL UNIQUE,
  nm_longradouro VARCHAR(75) NOT NULL,
  nm_bairro VARCHAR(75) NOT NULL,
  nm_cidade VARCHAR(75) NOT NULL,
  sg_uf CHAR(2),
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  CONSTRAINT pk_cep
    PRIMARY KEY (cd_cep),
  CONSTRAINT fk_cep_uf
    FOREIGN KEY (sg_uf)
        REFERENCES tb_ufs(sg_uf)
);

CREATE TABLE IF NOT EXISTS tb_aluno
(
	cd_aluno INT NOT NULL AUTO_INCREMENT,
    nm_aluno VARCHAR(100) NOT NULL,
    dt_nascimento DATE NOT NULL,
    cd_cpf VARCHAR(14) NOT NULL UNIQUE,
    nm_email VARCHAR(80) NOT NULL UNIQUE,
    nm_senha VARCHAR(80) NOT NULL,
    cd_endereco INT NOT NULL,
    cd_cep INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    CONSTRAINT pk_alunos
        PRIMARY KEY (cd_aluno),
    CONSTRAINT fk_usuario_cep
        FOREIGN KEY (cd_cep) 
            REFERENCES tb_ceps (cd_cep)
);

CREATE TABLE IF NOT EXISTS tb_personal_aluno
(
    cd_personal_aluno INT NOT NULL AUTO_INCREMENT,
    cd_aluno INT NOT NULL,
    cd_personal INT NOT NULL,
    ic_ativo INT(1) DEFAULT 1,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY (cd_personal_aluno),
    CONSTRAINT fk_horario_aluno 
        FOREIGN KEY (cd_aluno) 
            REFERENCES tb_alunos(cd_aluno),
    CONSTRAINT fk_horario_personal 
        FOREIGN KEY (cd_personal) 
            REFERENCES tb_personals(cd_personal)
);

CREATE TABLE IF NOT EXISTS tb_horario
(
	cd_horario INT NOT NULL AUTO_INCREMENT,
    cd_personal_aluno INT NOT NULL,
    hr_inicial TIME(1) NOT NULL,
    hr_final TIME(1) NOT NULL,
    dd_semana ENUM('1','2','3','4','5','6','7') NOT NULL,
    ic_disponivel enum('0','1') NOT NULL DEFAULT '1',
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY (cd_horario),
    CONSTRAINT fk_horario_personal_aluno
        FOREIGN KEY (cd_personal_aluno) 
            REFERENCES tb_personal_alunos(cd_personal_aluno)
);

CREATE TABLE IF NOT EXISTS tb_aula
(
    cd_aula INT NOT NULL AUTO_INCREMENT,
    dt_aula DATETIME NOT NULL,
    ic_feito INT(1) NOT NULL,
    cd_horario INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    CONSTRAINT pk_aula
        PRIMARY KEY (cd_aula),
    CONSTRAINT fk_aula_horario 
        FOREIGN KEY (cd_horario) 
            REFERENCES tb_horarios(cd_horario)
);

CREATE TABLE IF NOT EXISTS tb_medida
(
	cd_medidas INT NOT NULL AUTO_INCREMENT,
    qt_peso DECIMAL (4,2) NOT NULL,
    qt_cintura DECIMAL (4,2) NOT NULL,
    qt_abdomen DECIMAL (4,2) NOT NULL,
    qt_quadril DECIMAL (4,2) NOT NULL,
    qt_coxa DECIMAL (4,2) NOT NULL,
    cd_aula INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    CONSTRAINT pk_medida
        PRIMARY KEY (cd_medidas),
    CONSTRAINT fk_medida_aula 
        FOREIGN KEY (cd_aula) 
            REFERENCES tb_aulas(cd_aula)
);

CREATE TABLE IF NOT EXISTS tb_exercicio
(
	cd_exercicio INT NOT NULL AUTO_INCREMENT,
    nm_exercicio VARCHAR(75) NOT NULL,
    ds_exercicio LONGTEXT NOT NULL,
    cd_aparelho INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    CONSTRAINT pk_exercicio
        PRIMARY KEY (cd_exercicio),
    CONSTRAINT fk_exercicio_aparelho 
        FOREIGN KEY (cd_aparelho) 
            REFERENCES tb_aparelhos(cd_aparelho)
);

CREATE TABLE IF NOT EXISTS tb_aula_exercicio
(
	cd_aula INT NOT NULL,
    cd_exercicio INT NOT NULL,
    qt_repeticao FLOAT NOT NULL,
    qt_peso FLOAT NOT NULL,
    ic_feito INT(1) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    CONSTRAINT fk_aula_exercicio 
        FOREIGN KEY (cd_aula) 
            REFERENCES tb_aulas(cd_aula),
    CONSTRAINT fk_exercicio_horario 
        FOREIGN KEY (cd_exercicio) 
            REFERENCES tb_exercicios(cd_exercicio)
);

CREATE TABLE IF NOT EXISTS tb_log
(
    cd_log INT NOT NULL AUTO_INCREMENT, #CODIGO
    nm_jwt LONGTEXT NOT NULL, #TOKEN
    ds_log JSON NOT NULL, #DADOS DO LOG {cod,nome,email,cref/cpf}
    nm_tipo VARCHAR(15) NOT NULL, # aluno/personal
    dt_log DATETIME NOT NULL, # data de ultimo acesso
    ic_ativo ENUM('0','1') NOT NULL DEFAULT '1',
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    CONSTRAINT pk_log
        PRIMARY KEY (cd_log)
);
