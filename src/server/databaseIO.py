# Rey Hicks & Justin Tran
# Internal Home Directory

# Python 3.10.5

import random
import os.path
import json
from sqlitedict import SqliteDict

# File Data Structures
# uses sqlite3 database with python dict-like interface 

# Pulls the database from file, if file doesn't exist create file and set inventory to empty dict
if os.path.isfile("data/test_data.sqlite"):
    database = SqliteDict("data/test_data.sqlite", outer_stack=True)
    try:
        database["inventory"]
    except:
        database["inventory"] = {}
else:
    database = SqliteDict("data/test_data.sqlite", outer_stack=True)
    database["inventory"] = {}

# 'inventory' is a local copy of the saved inventory that stages changes before being commited to file
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
    return item in inventory

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

def get_data():
    return inventory

# Clears entire inventory on file
def clear_inventory():
    inventory.clear()
    database["inventory"] = inventory
    database.commit()

# Clears local inventory (does not delete inventory on file)
def clear_local_changes():
    inventory = database["inventory"]
    return "Changes Cleared"

# Saves local inventory to file
def save_local_changes():
    database["inventory"] = inventory
    database.commit()
    return "Changes Saved"

### Tests

# Test that adds a lot of nouns
def test_noun():
    f = open("data/nounlist.txt", "r")
    f = f.read().splitlines()
    for line in f:
        x = int(random.random()*100) # adds 0-100 of each item
        addItem(line, x)
    clear_inventory()
    assert 1==1

# Simple IO Test Function
def test_add_remove():
    # Add new item
    addItem("milk")
    assert database["inventory"] == {'milk': 1}

    # Add multiple items
    addItem("apple", 4)
    assert database["inventory"] == {'milk': 1, 'apple': 4}

    # Remove single item
    removeItem("apple")
    assert database["inventory"] == {'milk': 1, 'apple':3}

    # Remove multiple of an item
    removeItem("apple", 2)
    assert database["inventory"] == {'milk': 1, 'apple':1}

    # Remove more of item than possible
    removeItem("milk", 10)
    assert database["inventory"] == {'milk': 1, 'apple': 3}

    # Remove item that doesn't exist
    removeItem("book")
    assert database["inventory"] == {'milk': 1, 'apple': 3}
    save_local_changes
    clear_inventory()
    
