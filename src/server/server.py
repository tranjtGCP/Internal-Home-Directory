import databaseIO as db
from flask import Flask
from flask import request
import json
app = Flask(__name__)

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response


@app.route('/get_data', methods=['GET'])
def get_data():

    data = request.args

    print(data)

    if request.method == 'GET':
        search_string = data['search_string']

        labels = set()
        filter_type = set()
        sort_type = set()

        i = 0
        while i>=0:
            try:
                labels.add(data['labels[' + str(i) + ']'])
                i+=1
            except:
                i = -1

        for i in range(2):
            try:
                filter_type.add(data['filter_type[' + str(i) + ']'])
            except:
                continue
        
        for i in range(2):
            try:
                sort_type.add(data['sort_type[' + str(i) + ']'])
            except:
                continue

        items_per_page = data['items_per_page']

        result = db.get_data(search_string, labels, filter_type, sort_type, int(items_per_page))
        return json.dumps(result, indent=4)

    return "none"


@app.route('/item', methods=['POST', 'DELETE'])
def item():
    data = request.args

    if request.method == 'POST' and db.createItem(data['item']):
        return "200 OK"

    if request.method == 'DELETE' and db.removeItem(data['item']):
        return "200 OK"
    return 'none'

@app.route('/item_qty', methods=['GET', 'POST', 'DELETE'])
def item_qty():

    data = request.json

    if request.method == 'GET':
        if not db.isItem(data['item']):
            return "Item not in database"
        return json.dumps(data['item'] + ": " + str(db.getItemCount(data['item']))) 

    if request.method == 'POST':
        if(data['qty'] < 0):
            if db.removeItemQty(data['item'], abs(data['qty'])):
                db.save_to_file()
                return "200 OK"
        if(data['qty'] > 0):
            if db.addItemQty(data['item'], data['qty']):
                db.save_to_file()
                return "200 OK"
        return json.dumps(data['item'] + ": " + str(db.getItemCount(data['item'])))

    return 'none'

@app.route('/labels', methods=['GET'])
def labels():

    if request.method == 'GET':
        return json.dumps(db.getAllLabels(), indent=4)
    return 'none'

@app.route('/item_labels', methods=['GET', 'POST', 'DELETE'])
def update_labels():
    data = request.args

    if not db.isItem(data['item']):
        return "item is not in database"

    if request.method == 'GET':
        return db.getlabels(data['item'])

    if request.method == 'POST' and db.addLabel(data['item'], data['label']):
        return "200 OK"
    
    if request.method == 'DELETE' and db.removeLabel(data['item'], data['label']):
        return "200 OK"

    return "none"




@app.route('/save_changes', methods=['GET', 'POST', 'DELETE'])
def save_changes():

    data = request.args

    if request.method == 'GET':

        changes = {}

        # Put labels in a set
        labels = set()
        i = 0
        while i>=0:
            try:
                labels.add(data['labels[' + str(i) + ']'])
                i+=1
            except:
                i = -1
        if len(labels) != 0:
            changes['labels'] = labels

        try:
            qty = data['qty']
            changes['qty'] = qty
        except:
            print("Qty not updated")

        if db.updateItem(data['item'], changes):
            db.save_to_file()
            return "200 OK"


    # if request.method == 'POST':
    #     return db.save_local_changes()
    # if request.method == 'DELETE':
    #     return db.clear_local_changes()

    return "none"

# @app.route('/get_item_count', mehtods=["GET"])
# @app.route('/get_total_item_count', methods=["GET"])
# @app.route('/get_data', methods=["GET"])
# @app.route('/clear_inventory', methods=["DELETE"])
# @app.route('/clear_local_changes', methods=["DELETE"])
# @app.route('/save_local_changes', methods=["POST"])


if __name__ == '__main__':
    app.run()