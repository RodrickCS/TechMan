# TechMan

### Feito com pug, node.js e prisma

# Como testar localmente
- Instale:
  - XAMPP
  - node.js
  - MySQL
- Abra o repositório clonado com VSCode ou outro editor de código
- Abra o XAMPP e dê start em MySQL
- No XAMPP clique em "shell" na direita da janela
- No console digite:
  - mysql -u root
- Na pasta docs do terá um arquivo chamado "script.sql"
- Mude o caminho dessa parte do código direcionando para a pasta csv
  - Ex.
    ```sql
    LOAD DATA INFILE 'C:/seu/caminho/para/pasta/TechMan/docs/csv/perfis.csv'
    INTO TABLE perfis
    FIELDS TERMINATED BY ';'
    ENCLOSED BY '"'
    LINES TERMINATED BY '\r\n'
    IGNORE 1 ROWS;
      ```
 - Tenha certeza de que a tabela esteja com o mesmo nome do arquivo csv
  ```sql
  INTO TABLE perfis
  ```
 - Depois de ter feito isso coloque o script no console do shell e espere rodar

 - No terminal do seu edtor de código, digite:
   - npm i
   - nodemon
 - Assim que o console responder "Servidor rodando na porta 3000":
   -  Abra um navegador e digite "localhost:3000"
 - Agora só testar com as senhas abaixo
 
  ### Atenção! as senhas não são reais, são apenas para testes
  - senha administrador: 212121
  - senha comum: 111111
  - senha gerente: 414141
  - senha tecnico: 313131
  
