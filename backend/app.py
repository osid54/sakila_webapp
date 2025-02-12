
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Connect to MySQL
db = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="pass",
    database="sakila"
)
cursor = db.cursor(dictionary=True)

@app.route('/films', methods=['GET'])
def get_films():
    cursor.execute("""select f.film_id as ID, f.title as TITLE, c.name as GENRE, ft.description as "DESC" from film as f
left join film_category as fc
on f.film_id = fc.film_id
left join category as c
on fc.category_id = c.category_id
join film_text as ft
on f.film_id = ft.film_id;""")
    films = cursor.fetchall()
    return jsonify(films)

@app.route('/customers', methods=['GET'])
def get_cust():
    cursor.execute("""SELECT customer_id as ID, first_name as "FIRST", last_name as "LAST", email as EMAIL FROM sakila.customer;""")
    customers = cursor.fetchall()
    return jsonify(customers)

if __name__ == '__main__':
    app.run(debug=True)
