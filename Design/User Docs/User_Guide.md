
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
Upon launch, the user will be greeted to a home page.This page contains lists of items that may be relevant to the user such as 'last modified' and 'highest quantity'. 

![image](https://github.com/user-attachments/assets/54a30e57-4008-47b3-8cd8-25a788bfbe53)

The user can navigate to the search page. Here, all of the items will be displayed in aplhabetical order in ascending order by default in pages. The user can filter by name, or filter by labels to narrow the search. The sorting method can also be selected and toggled between ascending and descending order.

![image](https://github.com/user-attachments/assets/3ee2863b-8e11-4b02-a47c-2126c615e9fa)

To add new items or modify existing items, the user can click on the 'ADD/EDIT ITEM' button in the top right corner which will open a dialog box. To add a new item, enter an item with a name that isn't currently in the database. To modify and item, enter the item name as it appears in the database with the updated values.

![image](https://github.com/user-attachments/assets/d92d701e-693e-44f5-80e4-13d8f4804b88)

To remove an item, the user can click on the 'REMOVE ITEM' button in the top right corner which will open a dialog box. To remove the item, enter the item name as it appears in the database.

![image](https://github.com/user-attachments/assets/df88bbb3-8d99-44e0-8395-a22bc28aacc8)

On the main page, the use can also click the 'I'm Feeling Lucky' button at the top of the page to view 3 random items.

![image](https://github.com/user-attachments/assets/bce48095-ed92-404c-99f4-5628ab04c56b)
