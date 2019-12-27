# laravel-todo

## Instructions:

- Clone our repo and cd

      git clone https://github.com/finklez/laravel-todo
      cd laraval-todo

- Install our Laravel backend

      cd backend
      composer install
    
- Update keys (will update .env)

      php artisan key:generate
      php artisan jwt:generate
      
- Create MySql DB and user (*)
- Update DB credentials in .env

      DB_DATABASE=
      DB_USERNAME=
      DB_PASSWORD=
      
- Run migrations and seeds
      
      php artisan migrate
      php artisan db:seed
     
```*``` in case of data issues on existing db try
    
    php artisan migrate:refresh --seed
        
    * or recreate the whole DB if all fails
    
- Run server

      php artisan serve
        
- Browse local server

      http://localhost:8000
    
#

Our seed creates 2 users:

- user1@gmail.com
- user2@gmail.com

the password for both is `secret`