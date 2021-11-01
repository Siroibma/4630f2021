from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.config["DEBUG"] = True

app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_POOL_RECYCLE"] = 299
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False



db = SQLAlchemy(app)

ma = Marshmallow(app)


class Product(db.Model):

    __tablename__ = "Product"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    fullname = db.Column(db.String(4096))
    designer = db.Column(db.String(4096))
    videolink = db.Column(db.String(4096))
    price = db.Column(db.Integer)

    def __init__(self, fullname, designer, videolink, price):
        self.fullname = fullname
        self.designer = designer
        self.videolink = videolink
        self.price = price

class ProductSchema(ma.Schema):
    class Meta:
        fields = ('id', 'fullname', 'designer', 'videolink', 'price')

Product_schema = ProductSchema()
Product_schemas = ProductSchema(many = True)


@app.route('/', methods=['GET'])
def getAllFurniture():
    all_product = Product.query.all()
    result = Product_schemas.dump(all_product)
    return jsonify(result)

@app.route('/add', methods=['POST'])
def createProduct():
    fullname = request.json['fullname']
    designer = request.json['designer']
    videolink = request.json['videolink']
    price = request.json['price']

    new_product = Product(fullname, designer, videolink, price)
    db.session.add(new_product)
    db.session.commit()

    return Product_schema.jsonify(new_product)


@app.route('/update/<id>', methods=['PUT'])
def updateProduct(id):
    product = Product.query.get(id)

    fullname = request.json['fullname']
    designer = request.json['designer']
    videolink = request.json['videolink']
    price = request.json['price']

    product.fullname = fullname
    product.designer = designer
    product.videolink = videolink
    product.price = price

    db.session.commit()

    return Product_schema.jsonify(product)

@app.route('/delete/<id>', methods=['DELETE'])
def deleteProduct(id):
    product = Product.query.get(id)
    db.session.delete(product)
    return Product_schema.jsonify(product)


@app.route('/product/<id>', methods=['GET'])
def getSingleProduct(id):
    product = Product.query.get(id)
    return Product_schema.jsonify(product)

