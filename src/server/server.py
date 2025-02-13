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


@app.route('/get_data', methods=['GET', 'POST', 'DELETE'])
def get_data():

    if request.method == 'GET':
        return json.dumps(db.get_data(), indent=4)

    return "none"


# @app.route('/add_item', methods=["POST"])
# @app.route('/remove_item', methods=["DELETE"])
@app.route('/item', methods=['GET', 'POST', 'DELETE'])
def item():

    print("get Json")
    data = request.json
    print("item " + data["item"])

    if request.method == 'GET':
        if not db.isItem(data['item']):
            return "Item not in database"
        return json.dumps(data['item'] + ": " + str(db.getItemCount(data['item']))) 

    if request.method == 'POST':
        if(data['qty'] <= 0):
            db.removeItem(data['item'], abs(data['qty']))
        if(data['qty'] > 0):
            db.addItem(data['item'], data['qty'])
        return json.dumps(data['item'] + ": " + str(db.getItemCount(data['item'])))

    # if request.method == 'DELETE':
    #     print("deletle")
    #     db.removeItem(data['item'], data['qty'])
    #     return data['item'] + ": " + str(db.getItemCount(data['item']))

    return "none"

# @app.route('/get_item_count', mehtods=["GET"])
# @app.route('/get_total_item_count', methods=["GET"])
# @app.route('/get_data', methods=["GET"])
# @app.route('/clear_inventory', methods=["DELETE"])
# @app.route('/clear_local_changes', methods=["DELETE"])
# @app.route('/save_local_changes', methods=["POST"])


if __name__ == '__main__':
    app.run()