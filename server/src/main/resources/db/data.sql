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
	 (nextval('rh.empresa_seq'),'Churros Inc.'),
	 (nextval('rh.empresa_seq'),'Bozo Company'),
	 (nextval('rh.empresa_seq'),'Festa da Uva LTDA.');
	 
--VAGAS
INSERT INTO rh.vaga
	(id, empresa_id, status, titulo, descricao, data_inicial, data_final, data_entrada, contato_telefone, contato_email)
VALUES
	(nextval('rh.vaga_seq'), (select id  from rh.empresa where nome = 'Churros Inc.'), 'NOVA', 'Project Manager', 'Project Manager', 
	(select now() + interval '20' day), (select now() + interval '20' day + interval '6' month), now(), '+(49) 1525 1234567', 'churros@test.com'),
	
	(nextval('rh.vaga_seq'), (select id  from rh.empresa where nome = 'Bozo Company'), 'NOVA', 'Java Senior Developer', 'Java Senior Developer', 
	(select now() + interval '10' day), (select now() + interval '10' day + interval '12' month), now(), '+(351) 123 456 789', 'bozo@test.com'),
	
	(nextval('rh.vaga_seq'), (select id  from rh.empresa where nome = 'Festa da Uva LTDA.'), 'NOVA', 'Tester', 'Tester', 
	(select now() + interval '10' day), (select now() + interval '10' day + interval '2' year), now(), '+(31) 20 369 8139', 'festa@test.com'),
	
	(nextval('rh.vaga_seq'), (select id  from rh.empresa where nome = 'Churros Inc.'), 'NOVA', 'Tech Lead', 'Tech Lead', 
	(select now() + interval '30' day), (select now() + interval '30' day + interval '6' month), now(), '+(49) 1525 1234567', 'churros@test.com'),
	
	(nextval('rh.vaga_seq'), (select id  from rh.empresa where nome = 'Bozo Company'), 'NOVA', 'Team Lead', 'Team Lead', 
	(select now() + interval '10' day), (select now() + interval '10' day + interval '12' month), now(), '+(351) 123 456 789', 'bozo@test.com');

--TAGS
INSERT INTO rh.tags (vaga_id, tag) VALUES 
	((select id from rh.vaga where titulo = 'Project Manager'), 'Jira'),
	((select id from rh.vaga where titulo = 'Project Manager'), 'Leadership'),
	((select id from rh.vaga where titulo = 'Project Manager'), 'Excel');
	
INSERT INTO rh.tags (vaga_id, tag) VALUES 
	((select id from rh.vaga where titulo = 'Java Senior Developer'), 'Java'),
	((select id from rh.vaga where titulo = 'Java Senior Developer'), 'MySQL'),
	((select id from rh.vaga where titulo = 'Java Senior Developer'), 'Git');
	
INSERT INTO rh.tags (vaga_id, tag) VALUES 
	((select id from rh.vaga where titulo = 'Tester'), 'Selenuim'),
	((select id from rh.vaga where titulo = 'Tester'), 'Jira'),
	((select id from rh.vaga where titulo = 'Tester'), 'Documentação');
	
INSERT INTO rh.tags (vaga_id, tag) VALUES 
	((select id from rh.vaga where titulo = 'Tech Lead'), 'JAVA'),
	((select id from rh.vaga where titulo = 'Tech Lead'), 'AWS'),
	((select id from rh.vaga where titulo = 'Tech Lead'), 'Arquitetura');
	
INSERT INTO rh.tags (vaga_id, tag) VALUES 
	((select id from rh.vaga where titulo = 'Team Lead'), 'JAVA'),
	((select id from rh.vaga where titulo = 'Team Lead'), 'PostgreSQL'),
	((select id from rh.vaga where titulo = 'Team Lead'), 'Micro-service');
	
--EXIGENCIAS
INSERT INTO rh.exigencias (vaga_id, qualificacao_id) VALUES
	((SELECT ID FROM rh.vaga where titulo = 'Project Manager'), (SELECT ID FROM rh.qualificacao where descricao = 'Java' AND versao='8')),
	((SELECT ID FROM rh.vaga where titulo = 'Project Manager'), (SELECT ID FROM rh.qualificacao where descricao = 'PostgreSQL' AND versao='12')),
	((SELECT ID FROM rh.vaga where titulo = 'Java Senior Developer'), (SELECT ID FROM rh.qualificacao where descricao = 'Java' AND versao='11')),
	((SELECT ID FROM rh.vaga where titulo = 'Java Senior Developer'), (SELECT ID FROM rh.qualificacao where descricao = 'PostgreSQL' AND versao='12')),
	((SELECT ID FROM rh.vaga where titulo = 'Java Senior Developer'), (SELECT ID FROM rh.qualificacao where descricao = 'Gradle' AND versao='7.0')),
	((SELECT ID FROM rh.vaga where titulo = 'Tester'),(SELECT ID FROM rh.qualificacao where descricao = 'Java' AND versao='11')),
	((SELECT ID FROM rh.vaga where titulo = 'Tester'),(SELECT ID FROM rh.qualificacao where descricao = 'PostgreSQL' AND versao='12')),
	((SELECT ID FROM rh.vaga where titulo = 'Tester'),(SELECT ID FROM rh.qualificacao where descricao = 'AWS' AND versao='1.0')),
	((SELECT ID FROM rh.vaga where titulo = 'Tech Lead'),(SELECT ID FROM rh.qualificacao where descricao = 'PHP' AND versao='8.0')),
	((SELECT ID FROM rh.vaga where titulo = 'Tech Lead'),(SELECT ID FROM rh.qualificacao where descricao = 'Angular' AND versao='8+')),
	((SELECT ID FROM rh.vaga where titulo = 'Tech Lead'),(SELECT ID FROM rh.qualificacao where descricao = 'Maven' AND versao='3')),
	((SELECT ID FROM rh.vaga where titulo = 'Tech Lead'),(SELECT ID FROM rh.qualificacao where descricao = 'AWS' AND versao='1.0')),
	((SELECT ID FROM rh.vaga where titulo = 'Team Lead'),(SELECT ID FROM rh.qualificacao where descricao = 'Java' AND versao='11')),
	((SELECT ID FROM rh.vaga where titulo = 'Team Lead'),(SELECT ID FROM rh.qualificacao where descricao = 'PostgreSQL' AND versao='9.6')),
	((SELECT ID FROM rh.vaga where titulo = 'Team Lead'),(SELECT ID FROM rh.qualificacao where descricao = 'Angular' AND versao='8+')),
	((SELECT ID FROM rh.vaga where titulo = 'Team Lead'),(SELECT ID FROM rh.qualificacao where descricao = 'Maven' AND versao='3')),
	((SELECT ID FROM rh.vaga where titulo = 'Team Lead'),(SELECT ID FROM rh.qualificacao where descricao = 'AWS' AND versao='1.0'));
