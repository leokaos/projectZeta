--CATEGORIA
insert into rh.categoria (id,descricao) values (nextval('rh.categoria_seq'), 'Database');
insert into rh.categoria (id,descricao) values (nextval('rh.categoria_seq'), 'Frontend');
insert into rh.categoria (id,descricao) values (nextval('rh.categoria_seq'), 'Linguagem de Programação');
insert into rh.categoria (id,descricao) values (nextval('rh.categoria_seq'), 'Ferramentas');
insert into rh.categoria (id,descricao) values (nextval('rh.categoria_seq'), 'Cloud');

--QUALIFICACAO
INSERT INTO rh.qualificacao (id, descricao, versao, categoria_id)
values 
	(nextval('rh.qualificacao_seq'), 'Java', '8', (select id from rh.categoria where descricao = 'Linguagem de Programação')),
	(nextval('rh.qualificacao_seq'), 'Java', '11', (select id from rh.categoria where descricao = 'Linguagem de Programação')),
	(nextval('rh.qualificacao_seq'), 'PHP', '8.0', (select id from rh.categoria where descricao = 'Linguagem de Programação')),
	(nextval('rh.qualificacao_seq'), 'PostgreSQL', '12', (select id from rh.categoria where descricao = 'Database')),
	(nextval('rh.qualificacao_seq'), 'PostgreSQL', '9.6', (select id from rh.categoria where descricao = 'Database')),
	(nextval('rh.qualificacao_seq'), 'MySQL', '5.1', (select id from rh.categoria where descricao = 'Database')),
	(nextval('rh.qualificacao_seq'), 'Angular', '8+', (select id from rh.categoria where descricao = 'Frontend')),
	(nextval('rh.qualificacao_seq'), 'React', '18.2.0', (select id from rh.categoria where descricao = 'Frontend')),
	(nextval('rh.qualificacao_seq'), 'AngularJS', '13', (select id from rh.categoria where descricao = 'Frontend')),
	(nextval('rh.qualificacao_seq'), 'Maven', '3', (select id from rh.categoria where descricao = 'Ferramentas')),
	(nextval('rh.qualificacao_seq'), 'Gradle', '7.0', (select id from rh.categoria where descricao = 'Ferramentas')),
	(nextval('rh.qualificacao_seq'), 'AWS', '1.0', (select id from rh.categoria where descricao = 'Cloud'));

--EQUIVALENCIA
insert into rh.equivalencia (destino_id, origem_id, valor) 
values (
			(select id from rh.qualificacao where descricao = 'Java' and versao = '8'),
			(select id from rh.qualificacao where descricao = 'Java' and versao = '11'),
			80
);

--PROFISSIONAL
INSERT INTO rh.profissional (id,nome,sobrenome,titulo,email,data_contato,data_comeco,avatar,status) VALUES
	 (nextval('rh.profissional_seq'),'Rick','Sanchez','Manager Project','rick.sanchez@test.com','2022-07-01 00:00:00.000','2022-07-18 00:00:00.000','16513','EM_CONTATO'),
	 (nextval('rh.profissional_seq'),'Bob','Sponge','Tester','bob.sponge@test.com','2022-06-01 00:00:00.000','2022-07-01 00:00:00.000','16515','EM_CONTATO'),
	 (nextval('rh.profissional_seq'),'Yoda','Master','Senior Java Developer','yoda@test.com','2022-07-01 00:00:00.000','2022-07-18 00:00:00.000','16517','EM_CONTATO');

	 
--EXPERIENCIA
INSERT INTO rh.experiencia (profissional_id, qualificacao_id, tempo) VALUES
	((SELECT id FROM rh.profissional WHERE nome = 'Rick'), (SELECT id FROM rh.qualificacao WHERE descricao = 'PHP' AND versao = '8.0'),'10y'),
	((SELECT id FROM rh.profissional WHERE nome = 'Rick'), (SELECT id FROM rh.qualificacao WHERE descricao = 'Java' AND versao = '11'),'10y6m'),
	((SELECT id FROM rh.profissional WHERE nome = 'Bob'), (SELECT id FROM rh.qualificacao WHERE descricao = 'Java' AND versao = '8'),'1y'),
	((SELECT id FROM rh.profissional WHERE nome = 'Yoda'), (SELECT id FROM rh.qualificacao WHERE descricao = 'Java' AND versao = '8'),'20y'),
	((SELECT id FROM rh.profissional WHERE nome = 'Yoda'), (SELECT id FROM rh.qualificacao WHERE descricao = 'PHP' AND versao = '8.0'),'30y');

--EMPRESA
INSERT INTO rh.empresa (id,nome) VALUES
	 (1,'Churros Inc.'),
	 (2,'Bozo Company'),
	 (3,'Festa da Uva LTDA.');
