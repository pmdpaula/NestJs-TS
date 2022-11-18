# Aula Youtube Backend com NestJs
[Playlist Backend com Nest JS](https://www.youtube.com/playlist?list=PLzFYWfRVHp5Lc49RLdfyMJ_a42c2C2MnR)

[Aula 01 - NestJS, o melhor framework backend de NodeJS](https://youtu.be/bAH4nBb1NFc)  
[Aula 02 - NestJS e Prisma, a combinação PERFEITA pra banco de dados em NodeJS](https://youtu.be/8IwUvk6hZaI)  
[Aula 03 - NestJS - Autenticação (Sistema de Login)](https://youtu.be/3z6Cs_PtYc0)  
[Aula 04 - NestJS - Documentação automática com Swagger](https://youtu.be/fshX_252HbU)  
[Aula 05 - NestJS - Fazendo deploy no Heroku](https://youtu.be/ZRNFhpwzN64)



## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Adição da autenticação

- adicionado o `JWT_SECRET` no `.env`

- instalação das seguintes dependências  

    Produção:
  	```bash
  	yarn add @nestjs/passport @nestjs/jwt bcrypt class-validator class-transformer passport passport-jwt passport-local
  	```

    Desenvolvimento:
    
    ```bash
    yarn add -D @types/passport-jwt @types/passport-local @types/bcrypt
    ```
- criar o modelo User e Role no `schema.prisma`
