# Rey Hicks & Justin Tran
# Internal Home Directory Prototype

# Python 3.10.5

import random
import os.path
from sqlitedict import SqliteDict

# File Data Structures
# uses sqlite3 database with python dict-like interface 

# Pulls the database from file, if file doesn't exist create file and set inventory to empty dict
if os.path.isfile("data/data.sqlite"):
    database = SqliteDict("data/data.sqlite", outer_stack=True)
else:
    database = SqliteDict("data/data.sqlite", outer_stack=True)
    database["inventory"] = {}
inventory = database["inventory"]
    
print("Data read from file.")

# Some basic get/set functions our database should handle

# Adds 'n' of specified 'item' from 'data'
def addItem(item, n=1):
    print("Add " + str(n) + " \'" + item + "\'...")
    if isItem(item):
        inventory[item] = inventory[item] + n
    else:
        inventory[item] = n
    database["inventory"] = inventory

# Removes 'n' of specified 'item' from 'data'
def removeItem(item, n=1):
    print("Remove " + str(n) + " \'" + item + "\'...")
    if isItem(item):
        if inventory[item] >= n:
            inventory[item] = inventory[item] - n
            if inventory[item] == 0:
                inventory.pop(item)
            database["inventory"] = inventory
        else:
            print("Error: Cannot remove " + str(n) + " \'" + item +"\', not enough in inventory!")
    else:
        print("Error: Cannot remove item, \'" + item +"\' not in inventory!")

# Checks if 'item' is in 'data'
def isItem(item):
    if item in inventory:
        return True
    else:
        return False

# Gets number of 'item' in 'data'
def getItemCount(item):
    print("Get \'" + item +"\' count...")
    if isItem(item):
        return inventory[item]
    else:
        print("Error: Cannot get item count, \'" +  item +"\' not in inventory!")

def getTotalItemCount():
    n = 0
    for items in inventory:
        n+=inventory[items]
    return n

def print_data():
    for keys in inventory:
        print(keys + ": " + str(inventory[keys]))

# Clears entire inventory on file
def clear_inventory():
    inventory.clear()
    database["inventory"] = inventory
    database.commit()

# Clears local inventory (does not delete inventory on file)
def clear_local_changes():
    inventory = database["inventory"]

# Saves local inventory to file
def save_local_changes():
    database["inventory"] = inventory
    database.commit()


# Simple IO Test Function
def add_remove_test():
    addItem("milk")
    addItem("apple", 3)
    addItem("pencil")
    addItem("pencil")
    removeItem("milk", 10)
    removeItem("book")
    removeItem("pencil")
    #clear_local_changes()    # Reset the inventory to state before testing

# Test that adds a lot of nouns
def noun_test():
    f = open("data/nounlist.txt", "r")
    f = f.read().splitlines()
    for line in f:
        x = int(random.random()*100) # adds 0-100 of each item
        addItem(line, x)
    
    

# Main Functions
def main():
    #clear_inventory()

    # Noun Stress Test
    for i  in range(3):
        noun_test()

    save_local_changes()
    print(inventory)
    print("Number of Unique Items: " + str(len(inventory)))
    print("Total Number of Items: " + str(getTotalItemCount()))
    
if __name__=="__main__":
    main()
