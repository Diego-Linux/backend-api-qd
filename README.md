## Teste Técnico Backend Node.js

![20160324173914!Node js_logo](https://user-images.githubusercontent.com/60199339/164948993-a031fd56-6a33-4150-9b8b-a5da511d1d87.svg)

## Ferramentas utilizadas: 
    - Node.js v16.13.1
    - MongoDB
    - Express
    - VSCode
    - Yarn

</br>


## Principais dependências e motivos da escolha:
    - Bcryptjs para criptografia de senha e outros recursos como comparação de hash para login, reset de senha etc.
  
    - JWT para recursos como token de acesso e refresh token.

    - MongoDB por ser ágil, simples e permitir a  manipulação de diversos dados de forma eficiente.

    - Cookies para manter os dados de sessão no lado do servidor, caso estivéssemos consumindo essa api com algum frontend.

    - API da Cloudinary para armazenar os uploads de imagens.

    - Mongoose ORM para manipular os dados da nossa database.

    - nodemailer para transporte do envio de e-mail.

    - Serviço de e-mail transacional(SMTP) da sendinblue, pois oferecem um bom plano grátis.


### - Dê um git clone no projeto: ```git clone git@github.com:Diego-Linux/backend-api-qd.git```.

### - Dentro do projeto, use o comando ```yarn``` ou ```npm install``` para instalar as dependências necessárias.

### - Crie um arquivo ```.env``` na raíz do projeto, copie e cole o conteúdo do arquivo ```.env.example```.

### - Agora coloque suas variáveis de ambiente da sua database mongo, porta em que a aplicação irá rodar etc no arquivo ```.env```.

</br>

## - Iniciando a aplicação.

### - Após ter instalado as dependências necessárias, use o comando ```yarn start``` para iniciar a api.

### - Iniciando o crud de usuário, abra o postman e acesse a rota de *Register* dentro do diretório *Auth*, inclua um _name_, _email_ e _password_:

![register](https://user-images.githubusercontent.com/60199339/164947566-2a7088bb-8572-42cf-95fa-a46644525369.png)
</br>

### - Após concluir o cadastro de usuário, acesse a rota de login com seus dados de usuário _email_ e _password_ e copie o token de acesso que será recebido, ele será necessário para acessar as rotas da API (exceto as de autenticação).

</br>

## Acessando rotas com token:

![log](https://user-images.githubusercontent.com/60199339/164947458-4bc8a679-ee88-4ca4-87cf-5136acf32b79.png)



### - Agora use este token nas rotas da aplicação, vá em ***Authorization***, escolha a opção ***API Key*** e cole seu token no campo ***Value***

![authorization](https://user-images.githubusercontent.com/60199339/164947683-62603bed-d6d1-4d1a-a92f-b053fee78ee3.png)

</br>

## Adicionando as variáveis de ambiente do serviço de storage ***Cloudinary***, que é onde armazenaremos as imagens da nossa api.

### - Crie uma conta Cloudinary em: https://cloudinary.com/users/register/free

### - Após o login, escolha o plano grátis.

### - Acesse os dados de sua conta, e copie no arquivo ```.env``` do seu projeto as variáveis de ambiente referentes a api da Cloudinary.

### - Caso não consiga utilizar os serviços cloudinary, isso não impedirá a criação do post..a imagem não é um campo obrigatório, então você pode simplesmente deixar o campo *image* vazio.

## Adicionando as variáveis de ambiente SMTP da  ***Sendinblue***.

### - Crie uma conta sendinblue em: https://app.sendinblue.com/account/register

### - Escolha o plano grátis e copie no arquivo ```.env``` do seu projeto as variáveis de ambiente referentes a e-mail.

####  Segue o exemplo:

 - EMAIL_PROVIDER=nodemailer
 - EMAIL_SMTP_HOST=smtp-relay.sendinblue.com
 - EMAIL_SMTP_PORT=587
  
#### Nas variaveis de ambiente abaixo coloque seus dados do sendinblue:

 - EMAIL_SMTP_USER=
 - EMAIL_SMTP_PASS=
 - EMAIL_ADDRESS_FROM=
 - EMAIL_ADDRESS_REPLY=

## Arquivo de configuração Postman com os endpoints da API:

- Abra o postman, em ```import``` navegue até o arquivo ```postman.json```
  dentro do projeto e terá acesso aos endpoints.

![import](https://user-images.githubusercontent.com/60199339/164950548-4efe68f1-d306-4f37-a4f0-9b3b4c5e9d18.png)
</br></br>
![postman](https://user-images.githubusercontent.com/60199339/164950570-0eb436d2-6839-4da6-9cf7-63a925b3b99d.png)

</br>

## Recursos adicionais: 
    - "Esqueci minha senha". (Este somente funcionará caso tenha um serviço de e-mail configurado. Como dito acima, usei o SMTP da sendinblue).
    - PS: Após toda a configuração referente a e-mail e já durante o uso, cheque o spam/lixeira para checar o envio dos e-mails.

