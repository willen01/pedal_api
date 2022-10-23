### Pedal-Api

Esta aplicação permite a criação de pedais pelo usuário, vizualização de pedais criados por outros usário e a inscrição neles, para que no dia marcado aqueles que se inscreveram possam pedalar em grupo

### Principais tecnologias utilizadas

- Nodejs
- Typescript
- Postgres
- Docker
- Prima ORM
- Json web token
- BcrypsJs

### Iniciado o projeto

Clone este repositório, rode o comando `yarn add` para instalar as dependências. Acesse o arquivo `.env.example` renomeie para `.env` e configure as variáveis de ambiente necessárias.

### Endoints da aplicação

| endpoint                 | verbo HTTP | Descrição                            |
| ------------------------ | ---------- | ------------------------------------ |
| /api/use                 | POST       | cria um novo usuário                 |
| /api/user/login          | POST       | login de usuários                    |
| /api/user/rides          | GET        | Pedais criados pelo usuário          |
| /api/user/participations | GET        | pedais que o usuário participou      |
| /api/ride                | GET        | lista de todos os pedais cadastrados |
| /api/ride/create         | POST       | cria um novo pedal                   |
| /api/ride/subscribe      | POST       | inscrever-se em um pedal cadastrado  |

#### Cadastrar usuário

Para utilizar os recursos da aplicação, é necessário o cadastro de um novo usuário, os seguintes campos devem ser enviados em formato json:

```
{
 "name":"example_name",
 "login":"@example_login",
 "password":"16ad1c31"
}
```

#### Login

Para realizar o login, faça o envio dos seguintes dados em formato json:

```
{
 "login":"@example_login",
 "password":"16ad1c31"
}
```

caso o login seja bem sucedido, um <b>token jwt</b> é retornado no header da aplicação com a propriedade 'authorization'. Esse token será necessário para autenticação e identificação do usuário.

#### criando um novo pedal

Para criar um novo pedal, é necessário inserir o token jwt do usuário no formato `Bearer<token>` e fazer o envio das seguintes informações em formato json

| campo                   | tipo de dado |
| ----------------------- | ------------ |
| name                    | string       |
| start_date              | Date         |
| start_date_registration | Date         |
| end_date_registration   | Date         |
| additional_information  | string       |
| start_place             | string       |
| participants_limit      | number       |

os campos de data devem ser insefido no formato <b>AAAA - MM - DD</b>

#### inscrevendo-se em um pedal cadastrado

Para se inscrever no em um pedal já cadastrado, envie em formato json, o id do usuário, o id do pedal e a data de inscrição, que deve ser inferior a data limite de inscrição, por exemplo:

```
{
 "user_id":"736eda38-105a-4fc8-9252-18304ff89c9d",
 "ride_id":"8d6bd5f1-0423-4726-a0a4-125eddc9c7ec",
 "subscription_Date":"2021-12-30"
}
```

#### Autenticação jwt

Para acessar todos os recursos da aplicação, exceto para <b>criação de um novo usuário</b> e <b>login</b>, é necessário o envio de um token jwt válido no formato `Bearer<token>`
