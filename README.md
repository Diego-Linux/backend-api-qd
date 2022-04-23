## Teste Técnico Backend Node.js

### - Dê um git clone no projeto: ```git clone git@github.com:Diego-Linux/backend-api-qd.git```.

### - Dentro do projeto, use o comando ```yarn``` ou ```npm install``` para instalar as dependências necessárias.

### - Crie um arquivo ```.env``` na raíz do projeto, copie e cole o conteúdo do arquivo ```.env.example```.

### - Agora coloque suas variáveis de ambiente da sua database mongo, porta em que a aplicação irá rodar etc no arquivo ```.env```.

</br>

## - Iniciando a aplicação.

### - Após ter instalado as dependências necessárias, use o comando ```yarn start``` para iniciar a api.

### - Iniciando o crud de usuário, abra o postman e acesse a rota de *Register* dentro do diretório *Auth*, inclua um _name_, _email_ e _password_:



</br>

## - Adicionando as variáveis de ambiente do serviço de storage ***Cloudinary***, que é onde armazenaremos as imagens da nossa api.

### - Crie uma conta Cloudinary em: https://cloudinary.com/users/register/free

### - Após o login, escolha o plano free.

### - Acesse os dados de sua conta, e copie no arquivo ```.env``` do seu projeto as variáveis de ambiente referentes a api da Cloudinary.

### - Caso não consiga utilizar os serviços cloudinary, isso não impedirá a criação do post..a imagem não é um campo obrigatório, então você pode simplesmente deixar o campo *image* vazio.

