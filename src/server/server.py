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

    data = request.json

    if request.method == 'GET':
        return json.dumps(db.get_data(), indent=4)

    return "none"


# @app.route('/add_item', methods=["POST"])
# @app.route('/remove_item', methods=["DELETE"])
@app.route('/item_qty', methods=['GET', 'POST', 'DELETE'])
def item():

    print("get Json")
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

    # if request.method == 'DELETE':
    #     print("delete")
    #     db.removeItem(data['item'], data['qty'])
    #     return data['item'] + ": " + str(db.getItemCount(data['item']))

    return "none"

@app.route('/save_changes', methods=['POST', 'DELETE'])
def save_changes():

    data = request.json
    print(data)

    if request.method == 'POST':
        for keys in data:
            db.setItem(keys, data[keys])
            print(keys, data[keys])
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