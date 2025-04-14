
# **Internal Home Directory: User Guide**
## Summary
Internal Home Directory is an easy to use, inventory management application. Its purpose is to help users keep track of all their belongings to facilitate more mindful and less wasteful consumption.  
## Source Code
Here is the code base for both the client and server code.
- [GitHub Repository] (https://github.com/tranjtGCP/Rey-Justin-Senior-Design-Project)
## Installation Guide(Linux)
Our application currently resides in a GitHub Repo which you can access by running the following command:
`git clone https://github.com/tranjtGCP/Internal-Home-Directory`
`cd Interal-Home-Directory`

#### Client
Dependencies:
- node v22.13.1
- npm 10.3.0
`sudo apt install nodejs npm`
To run the client, navigate to the 'client' folder inside 'src' and run through react:
`cd src/client/src`
`npm i --legacy-peer-deps`
`npm run dev`

#### Server
Dependencies:
- python 3.10
- flask
- SQLite
- pytest (optional)
`sudo apt install python sqlite3`
`pip install flask pytest`
To run the server, navigate to the 'server' folder inside 'src' and execute 'server.py':
`python src/server/server.py`


##### Using the application
Upon launch, the user will be greeted to a landing page. The user will be prompted to "Sign Up" and create an account or "Log In" with an existing one.
![image](https://github.com/user-attachments/assets/d5103995-dd47-4582-aef1-e4ac3426c2f1)

In either page, the user can fill out the corresponding information, and click the submit button to continue.
![image](https://github.com/user-attachments/assets/888ad4bd-d31f-440d-8226-45da7bc64609)
![image](https://github.com/user-attachments/assets/3b906b71-c2e2-437d-8905-3f5e67954b17)

After the user has created their account or logged in, they will be greeted with the home page. On this home page, we have attempted to streamline how users' information is displayed. In hierarchical fashion starting from the innermost, items are listed in rooms, which are listed in buildings. Each level of storage is collapsible and editable. 
![image](https://github.com/user-attachments/assets/b69a5910-0341-4950-8912-ae2cdf60f6d7)

At the top of the page, there is a search bar, that can search for all items in all levels. The user will be able to add items to rooms, rooms to buildings, and buildings as well. 

The user interface is still in development. We plan to implement sorting, different modes of input, and more features.
