UrlShortner Project Backend


* The Project will create the shortner url from actual url  
* In Project Authntication and Authorization handled for every user can access the own url
* Url analyctis handled based on users url
* After getting shortner url hit the url it redirct to original orl address and 
* Every url clicks and source is maintained

project build on Nodejs libarary and NestJs Framework with TypeScript and Mongodb as Database

project will run on 3001 local host port


run project by follwing command

npm install

nest start --watch

helath check of project  will run on http://localhost:3001/Url/

project consist of three module for routing
1. Url ---> url generation, url: http://localhost:3001/Url/
2. UserModule ---> User creation, url: http://localhost:3001/user/
3. Auth ---> Authitication for User, url : http://localhost:3001/auth/

4. Sheduled ---> for Cron Job


Used Dependecy for project
1. Nodejs ---> libraray
2. Nestjs ---> Framework
3. Mongoose ---> Database
4. jwt ---> Authentication and Authorization
5. helmet ---> Headers Security
6. nanoid ---> Random String generator
7. bcryptjs ---> Encription 
8. schedule ---> Job schedule
9. throttler ---> Rate Limiting
10. express-useragent ---> Browser information
11. cache-manager ---> store and retrive of data form memory



All routes of project

1. user creation --->  http://localhost:3001/user/createUser
2. user login ---> http://localhost:3001/auth/login for token 
3. generate url by passing token and original url--->  http://localhost:3001/Url/generateUrl
4. get the url by passing urlCode ---> http://localhost:3001/Url/code?code=xxxxxxxxxxxxxx
5. analytics of particular url by passing urlCode and token --->http://localhost:3001/Url/analytics
6. getSources of particular url by passing urlCode and token ---> http://localhost:3001/Url/getSources

