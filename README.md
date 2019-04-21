

<b><b1>My first CRUD with NodeJS + MongoDB</b1></b><br>

1. Go to site https://cloud.mongodb.com and create a new account, if you don't have one<br>
2. After that than log in at site https://cloud.mongodb.com<br>
3. Click in "Build a Cluster" and follow steps by site's Wizard<br>
4. While your Cluster is being create, Build a new user<br>
5. After that than select "IP Whitelist" menu<br>
6. Click in "Add IP Address" button<br>
7. Click in "Allow Access from Anywhere" button<br>
8. Click in "Confirm" button<br>
9. Return in "Overview menu" and check if your cluster has been created, if don't, to wait until the process finished<br>
10. When the Cluster creation process is fineshed, click in "connect" button<br>
11. After that than choose the option "Connect your Application"<br>
12. After that than select the box "Standard Connection String"<br>
13. Then copy and save the URI connection string<br><br>
PS: Don't forget replace the string <PASSWORD> with your personal password that has been created in step 4.<br><br>

<b><b1>Things to do before start your Project</b1></b><br>
1. Clone this repository <code>git clone https://github.com/wcristoni/crud-mongodb.git</code><br>
2. Create ".env" file in project directory, in this file put the string <code>MONGO_DB='your URI connection string'</code> and save it<br>
3. Install the dependencies for your Node JS: <code>npm install</code> <br>
4. Start your Node JS local: <code>npm run dev</code> <br>
5. Access the url http://localhost:3000 and enjoy!<br><br>
PS: This site was prepared to receive a string in the JSON format, like this:<br>
<code>{"url": "www.teste.com.br","tags": ["tag1","tag2"],"usuario": "User1"}</code>
