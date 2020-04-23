# EmpreendedorismoBackEnd

<h3>Api responsavel pelo core do projeto "Perfil de Empreendedorismo".<h3>


# Esquema do Banco

<h3>O banco de dados ultilizado nesste projeto é o banco não relacional mongodb, segue o esquema abaixo:</h3>

![imagembd](imageBd.png)

# Rotas publicas

<h3>Rotas sem a necessidade de autenticação pelo cabeçalho da requisição<h3>

- <h3>Registro de usuario</h3>
>
><h6>Rota de cadastro de novos usuarios ao sistema</h6>
>
><h4>Post /auth/register </h4>
>
><h5>Body da requisição(Json)</h5>
>
>```sh
>{
>	"name": "jonathan",
>	"birthdate": "15/07/1996",
>	"user": {
>		"email": "jonathan@j.com",
>		"password": "123456"
>	}
>}
>```
>
><h5>Resposta da requisição(Json)</h5>
>
>```sh
>{
>    "Status": "201Created"
>}
>```
>
- <h3>Login</h3>
>
><h6>Rota de autenticação ao sistema, todas as tokens possuem duração de 24hrs</h6>
>
><h4>Post /auth/login </h4>
>
><h5>Body da requisição(Json)</h5>
>
>```sh
>{
>	"email": "jonathan@j.com",
>	"password": "123456"
>}
>```
>
><h5>Resposta da requisição(Json)</h5>
>
>```sh
>{
>    "people": {
>        "_id": "5e9ddc6b88f4d92e78dea5e3",
>        "name": "jonathan",
>        "birthdate": "1996-07-15T03:00:00.000Z",
>        "cratedAt": "2020-04-20T17:31:23.665Z",
>        "__v": 0,
>        "user": {
>            "_id": "5e9ddc6b88f4d92e78dea5e4",
>            "email": "jonathan@j.com",
>            "cratedAt": "2020-04-20T17:31:23.684Z",
>            "__v": 0
>        }
>    },
>    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOWRkYzZiODhmNGQ5MmU3OGRlYTVlMyIsImlhdCI6MTU4NzU2Mzk5MiwiZXhwIjoxNTg3NjUwMzkyfQ.ozoedq>ndnZFbXxdnkBlKa-OIIejK9YbHXONNuZEQDwg"
>}
>```
>
# Rotas particulares

<h3>Rotas exclusivas para os usuarios do sistema. São eles Usuario comum, Coletor de dados e super administrador. O usuario super administrador é o unico que pode criar novos super administradores, coletor de dados, categorias e escalas ao sistema<h3>

- <h3>Cabeçalho</h3>
><h6>O cabeçalho deve possuir uma chave "Authorization" e seu valor deve possuir "Bearer" espaço "token", segue o exemplo abaixo:</h6>   
>
>```sh
>{
>	"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlOTRlNzg3MDZmN2VhMTAxMDc4NzE1NiIsImlhdCI6MTU4NjgxNzEyMSwiZXhwIjoxNTg2OTAzNTIxfQ.MAKBtY5gzfAXfbHe-_ncjrW76KqusANWeiu782b1BcU"
>}
>```
>
<h2>Super adiminstrador</h2>
      
- <h3>Novo super adm</h3>
>
><h6>Rota de cadastro de novos super adms ao sistema</h6>
>
><h4>Post /adm </h4>
>
><h5>Body da requisição(Json)</h5>
>
>```sh
>{
>	"name": "jonathan da Ponte",
>	"user": {
>		"email": "adm@adm.com",
>		"password": "adm@adm.com"
>	}
>}
>```
>
><h5>Resposta da requisição(Json)</h5>
>
>```sh
>{
>    "Status": "201Created"
>}
>```
>  
- <h3>Novo coletor</h3>
>
><h6>Rota de cadastro de novos coletor ao sistema</h6>
>
><h4>Post /adm/collector </h4>
>
><h5>Body da requisição(Json)</h5>
>
>```sh
>{
>	"name": "jonathan da Ponte",
>	"user": {
>		"email": "admcoletor@adm.com",
>		"password": "admcoletor@adm.com"
>	}
>}
>```
>
><h5>Resposta da requisição(Json)</h5>
>
>```sh
>{
>    "Status": "201Created"
>}
>```
> 
- <h3>Mudar senha</h3>
>
><h6>Modificar senha</h6>
>
><h4>Post /adm/change_password</h4>
>
><h5>Body da requisição(Json)</h5>
>
>```sh
>{
>	"id": "5e92230441a7dd35e824bf8b",
>	"email": "adm@adm.com",
>	"currentPassword": "adm@adm.com",
>	"newPassword": "12345678",
>	"confirmationPassword": "12345678"	
>}
>```
>
><h5>Resposta da requisição(Json)</h5>
>
>```sh
>{
>    "Status": "200 OK"
>}
>```
