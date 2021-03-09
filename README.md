# TheMovieDb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Instalar pacotes
npm i && npm i -g json-server

## Criar arquivo bd.json na raiz para simular um banco de dados
## adcionar a seguinte estrutura no arquivo criado
    {
        "users": []
    }
## Comandos para executar o Projeto
## abrir o terminal e rodar o comando
ng s
## abrir outro terminal e rodar o comando
json-server --watch bd.json

## esse segundo comando é necessário pra criar os usuário na aplicação
## ROTA de usuários no backend => GET, POST, PUT, DELETE

http://localhost:3000/users
## ROTAS da aplicação

/login
/register
/home
/rated-movies
/movie/{id}