# Rey Hicks & Justin Tran
# Internal Home Directory

# Python 3.10.5

import random
import os.path
import json
import time
import math
from sqlitedict import SqliteDict

# File Data Structures
# uses sqlite3 database with python dict-like interface 

# Pulls the database from file, if file doesn't exist create file and set inventory to empty dict
if os.path.isfile("data/test_data.sqlite"):
    database = SqliteDict("data/test_data.sqlite", outer_stack=True)
    try:
        database["inventory"]
        print("Loading Inventory...")
    except:
        database["inventory"] = {}
        print("Creating new Inventory...")
else:
    database = SqliteDict("data/test_data.sqlite", outer_stack=True)
    database["inventory"] = {}

# 'inventory' is a local copy of the saved inventory that stages changes before being commited to file
inventory = database["inventory"]
    
print("Data read from file.")

# IO functions


### Generic Item creation/deletion
def createItem(item):
    if isItem(item):
        print("Cannot create item: item already exists...")
        return 0
    inventory[item] = {}
    createTimeStamp(item)
    database["inventory"] = inventory
    print("Created an empty item \'" + item + "\'")
    return 1

def removeItem(item):
    if not isItem(item):
        print("Cannot remove item: item doesn't exist...")
        return 0
    inventory.pop(item)
    database["inventory"] = inventory
    print("Removed \'" + item + "\'")
    return 1

# Sets changes for an item
def updateItem(item, changes):
    print("Updating item...")

    if not isItem(item):
        createItem(item)

    try:
        print(item + " updated qty to " + str(changes['qty']))
        setItem(item, changes['qty'])
    except:
        print("Quantity not modified")

    try:
        labels = changes['labels']
        print("EMPTY STRING FOUND")
        if "" in labels:
            setLabels(item, [])
        else:
            setLabels(item, labels)
    except:
        print("Label not modified")

    database["inventory"] = inventory
    return 1

### Timestamps

def getCurrentTime():
    return time.ctime(time.time())

def createTimeStamp(item):
    if not isItem(item):
        print("Cannot create timestamp: item does not exist")
        return 0
    try:
        date_created = inventory[item]['date_created']
        print("Cannot create timestamp: item already has a date created")
        return 0
    except:
        curr = getCurrentTime()
        inventory[item]['date_created'] = curr
        inventory[item]['last_modified'] = curr
        database["inventory"] = inventory
        return 1

def setTimeStamp(item):
    if not isItem(item):
        print("Cannot set timestamp: item does not exist")
        return 0

    curr = getCurrentTime()
    inventory[item]['last_modified'] = curr
    database["inventory"] = inventory
    return 1


### Labels
# Returns the list of all labels curently being used
def getAllLabels():
    data = inventory.copy()
    labels = {}

    for item in data:
        try:
            item_labels = data[item]['labels']
            for label in item_labels:
                try:
                    labels[label] = labels[label] + 1
                except:
                    labels[label] = 1
        except:
            continue

    sorted_labels = dict(sorted(labels.items(), key=lambda item: item[1], reverse=True))
    return sorted_labels

# Returns the list of labels for a specified item
def getLabels(item):
    if not isItem(item):
        print("Cannot get labels: item does not exist")
        return 0
    try:
        labels = inventory[item]['labels']
    except:
        print("Cannot get labels: no labels found")
        return 0
    return labels

# Set labels of an item
def setLabels(item, labels):
    if not isItem(item):
        print("Cannot add label: item does not exist")
        return 0
    inventory[item]['labels'] = set()
    for label in labels:
        addLabel(item, label)
    return 1


# Adds a label to specified item
def addLabel(item, label):
    if not isItem(item):
        print("Cannot add label: item does not exist")
        return 0
    try:
        labels = inventory[item]['labels']
    except:
        labels = set()
    
    if label not in labels:
        setTimeStamp(item)
        labels.add(label)
        inventory[item]['labels'] = labels
        database["inventory"] = inventory
        return 1
    else:
        print("Cannot add label: label already added")
        return 0

# Removes a label from specified item
def removeLabel(item, label):
    if not isItem(item):
        print("Cannot remove label: item does not exist")
        return 0
    try:
        labels = inventory[item]['labels']
    except:
        print("Cannot remove label: no labels found")
        return 0
    
    if label in labels:
        setTimeStamp(item)
        labels.remove(label)
        inventory[item]['labels'] = labels
        database["inventory"] = inventory
        return 1
    else:
        print("Cannot remove label: label not found")
        return 0


### Quantity Based Functions

def setItem(item, n):
    print("Set \'" + item + "\' to quantity \'" + str(n) + "\'...")
    setTimeStamp(item)
    if not isItem(item):
        createTimeStamp(item)
    inventory[item]['qty'] = n
    database["inventory"] = inventory

# Adds 'n' of specified 'item' from 'data'
def addItemQty(item, n=1):
    print("Add " + str(n) + " \'" + item + "\'...")
    setTimeStamp(item)
    if not isItem(item):
        inventory[item] = {}
        createTimeStamp(item)
    try:
        inventory[item]['qty'] = inventory[item]['qty'] + n
    except:
        inventory[item]['qty'] = n
    database["inventory"] = inventory
    return 1

# Removes 'n' of specified 'item' from 'data'
def removeItemQty(item, n=1):
    print("Remove " + str(n) + " \'" + item + "\'...")

    if not isItem(item):
        print("Error: Cannot remove item, \'" + item +"\' not in inventory!")
        return 0

    if not (inventory[item]['qty'] >= n):
        print("Error: Cannot remove " + str(n) + " \'" + item +"\', not enough in inventory!")
        return 0

    setTimeStamp(item)
    inventory[item]['qty'] = inventory[item]['qty'] - n
    if inventory[item]['qty'] == 0:
        inventory.pop(item)
    database["inventory"] = inventory
    return 10

# Checks if 'item' is in 'data'
def isItem(item):
    return item in inventory

# Gets number of 'item' in 'data'
def getItemCount(item):
    print("Get \'" + item +"\' count...")
    if isItem(item):
        return inventory[item]['qty']
    else:
        print("Error: Cannot get item count, \'" +  item +"\' not in inventory!")

def getTotalItemCount():
    n = 0
    for items in inventory:
        n+=inventory[items]['qty']
    return n

# Stores last call to get_data
pages = {}


def get_value(item, sort):
    return str(item[1][sort])


# Gets a subset of the inventory based on some flags
def get_data(search_string="", labels=set(), filter_type=set(), sort_type=set(), items_per_page=25):

    # search_string = string used to filter
    # labels = lables used to filter
    # filter_type = determine what filters to apply to the data {"name", "label"}

    # sort_type = how to sort, takes one sort method and one sort direction 
    # {"alpha", "qty", "label", "last_modified", "date_created" || "ascending", "descending"}

    # items_per_page = determines how smany items per page

    print("\nget_data called (" + str(search_string) + ", " + str(labels) + ", " + str(filter_type) + ", " + str(sort_type) + ", " + str(items_per_page) + ")...")

    data = inventory.copy()

    # Filter
    if search_string != "":
        print("Filter by \'name\'")
        for item_name in list(data):
            if search_string not in item_name:
                data.pop(item_name)
    if len(labels) != 0:
        print("Filter by \'label\'")
        for item_name in list(data):
            try:
                item_labels = data[item_name]['labels']
                if not labels.issubset(item_labels):
                    data.pop(item_name)
            except:
                data.pop(item_name)
                continue

    # Convert all set to list to pass as json
    for j in data:
        try:
            data[j]['labels'] = list(data[j]['labels'])
        except:
            continue


    # Sort
    sorted_data = {}
    sorted_keys = {}
    reverse = (not "ascending" in sort_type) and ("descending" in sort_type)

    if "alpha" in sort_type:
        print("Sort by \'alpha\'")
        sorted_keys = sorted(data.keys(), reverse=reverse)
    elif "qty" in sort_type:
        print("Sort by \'qty\'")
        sorted_keys = dict(sorted(data.items(),key=lambda item: get_value(item, "qty"), reverse=reverse))
    elif "last_modified" in sort_type:
        print("Sort by \'last_modified\'")
        sorted_keys = dict(sorted(data.items(),key=lambda item: get_value(item, "last_modified"), reverse=reverse))
    elif "date_created" in sort_type:
        print("Sort by \'date_created\'")
        sorted_keys = dict(sorted(data.items(),key=lambda item: get_value(item, "date_created"), reverse=reverse))
    else:
        print("No Sorting Selected")
        sorted_keys = data.keys()

    for i in sorted_keys:
        sorted_data[i] = data[i]

    # Pages
    # items_per_page = determines how many pages of items there are

    this_pages = {}
    keys = list(sorted_data.keys())
    for i in range(math.ceil(len(keys)/items_per_page)):
        page = {}
        for j in range(items_per_page):
            if len(keys) > 0:
                page.update({keys[0]: sorted_data[keys[0]]})
                keys.pop(0)
        this_pages[i] = page

    pages = this_pages

    return this_pages

def get_page(page=1):
    if pages == {}:
        print("Cannot get page: no pages have been created")
        return 0



# Clears entire inventory on file
def clear_inventory():
    inventory.clear()
    database["inventory"] = inventory
    database.commit()

# Clears local inventory (does not delete inventory on file)
def clear_local_changes():
    inventory = database["inventory"]
    return "Changes ]['Cleared"

# Saves local inventory to file
def save_to_file():
    database["inventory"] = inventory
    database.commit()
    return "Changes Saved"

### Tests

# Test that adds a lot of nouns
# def test_noun():
#     clear_inventory()
#     f = open("data/nounlist.txt", "r")
#     f = f.read().splitlines()
#     for line in f:
#         x = int(random.random()*100) # adds 0-100 of each item
#         addItemQty(line, x)
#     assert 1==1

# Simple IO Test Function
# def test_add_remove():
#     clear_inventory()
#     # Add new item
#     addItemQty("milk")
#     assert database["inventory"] == {'milk': {'qty': 1}}

#     # Add multiple items
#     addItemQty("apple", 4)
#     assert database["inventory"] == {'milk': {'qty': 1}, 'apple': {'qty': 4}}

#     # Remove single item
#     removeItemQty("apple")
#     assert database["inventory"] == {'milk': {'qty': 1}, 'apple':{'qty': 3}}

#     # Remove multiple of an item
#     removeItemQty("apple", 2)
#     assert database["inventory"] == {'milk': {'qty': 1}, 'apple':{'qty': 1}}

#     # Remove more of item than possible
#     removeItemQty("milk", 10)
#     assert database["inventory"] == {'milk': {'qty': 1}, 'apple': {'qty': 1}}

#     # Remove item that doesn't exist
#     removeItemQty("book")
#     assert database["inventory"] == {'milk': {'qty': 1}, 'apple': {'qty': 1}}
#     clear_inventory()    

def test_label():
    print("test_label...")
    # clear_inventory()

    # # Add label to item that doesnt exist
    # assert addLabel("milk", "dairy") == 0
    
    # # Remove label to item that doesnt exist
    # assert removeLabel("milk", "dairy") == 0

    # # Create empty item
    # assert createItem("milk") == 1

    # # Add label to empty item
    # temp = addLabel("milk", "dairy")
    # assert temp == 1

    # # Remove label
    # temp = removeLabel("milk", "dairy")
    # assert temp == 1

    # addLabel("milk", "dairy")
    # addLabel("milk", "food")
    # addLabel("milk", "cold")

    # # Remove label that doesn't exist
    # temp = removeLabel("milk", "expired")
    # assert temp == 0

    # # Get labels
    # temp = getLabels("milk")
    # assert temp == {"dairy", "food", "cold"}
    # clear_inventory()

def test_addItems():
    print("test_addItems...")
    # clear_inventory()
    # addItemQty("Apple" , 2)
    # addItemQty("Pear", 3)
    # addItemQty("Orange", 12)
    # save_to_file()

def test_timestamps():
    print("test_timestamps...")
    # #clear_inventory()

    # # Create and modify timestamp
    # createItem("Milk")
    # assert createTimeStamp("Milk") == 0
    # assert setTimeStamp("Milk") == 1

    # # Modify Item that doesn't exist
    # assert createTimeStamp("Empty") == 0
    # assert setTimeStamp("Empty") == 0

def test_getData():
    print("test_getData...")

    # addItemQty("Apple", 1)
    # addLabel("Apple", "fruit")
    # addLabel("Apple", "food")
    # addLabel("Apple", "kitchen")

    # addItemQty("Banana", 2)
    # addLabel("Banana", "fruit")
    # addLabel("Banana", "food")
    # addLabel("Banana", "kitchen")

    # addItemQty("Clementine", 3)
    # addLabel("Clementine", "fruit")
    # addLabel("Clementine", "food")
    # addLabel("Clementine", "kitchen")

    # addItemQty("Salt", 4)
    # addLabel("Salt", "seasoning")
    # addLabel("Salt", "food")
    # addLabel("Salt", "kitchen")

    # addItemQty("Bread", 5)
    # addLabel("Bread", "bakery")
    # addLabel("Bread", "food")
    # addLabel("Bread", "kitchen")

    # addItemQty("Milk", 6)
    # addLabel("Milk", "dairy")
    # addLabel("Milk", "food")
    # addLabel("Milk", "kitchen")

    # addItemQty("Sauce Pan", 7)
    # addLabel("Sauce Pan", "kitchen")

    search_string = ""
    labels = set({"fruit", "food"})
    filter_type = set({"name"})
    sort_type = set({"qty", "descending"})
    items_per_page = 25
    #get_data(search_string, labels, filter_type, sort_type, items_per_page)

    #get_data("", {"fruit", "kitchen"}, {"label"}, {"alpha", "ascending"}, 25)

    #get_data("a", {"kitchen"}, {"label", "name"}, {"qty", "ascending"}, 25)

    start = time.time()
    pages = get_data("ba", {"ATM"}, {"label", "name"}, {"alpha", "ascending"}, 25)
    end = time.time()

    for i in range(len(pages)):
        print("Page " + str(i) + ": " + str(pages[i].keys()))

    #print(pages)
    print("Time elapsed: " + str(end-start))

    assert 1==2

# def test_createInv():
#     clear_inventory()

#     start = time.time()
#     f = open("data/nounlist.txt", "r")
#     f = f.read().splitlines()
#     nouns = []
#     for line in f:
#         nouns.append(line)
#     for i in range(len(nouns)):
#         noun = nouns[i]
#         addItemQty(noun, int(random.random()*100))
#         addLabel(noun, nouns[int(random.random()*10)])
#         addLabel(noun, nouns[int(random.random()*10)])
#         addLabel(noun, nouns[int(random.random()*10)])

#     end = time.time()
#     print("Time to create inv: " + str(end-start))

#     save_to_file()
#     assert 1==2

def test_getLabels():
    print(getAllLabels())
    assert 1==2
