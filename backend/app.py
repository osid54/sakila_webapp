
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import mysql.connector

app = Flask(__name__)
CORS(app, supports_credentials=True)

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
    cursor.execute("""SELECT * FROM sakila.film_list;""")
    films = cursor.fetchall()
    return jsonify(films)

@app.route('/customers', methods=['GET'])
def get_cust():
    cursor.execute("""SELECT customer_id as ID, first_name as "FIRST", last_name as "LAST", email as EMAIL FROM sakila.customer;""")
    customers = cursor.fetchall()
    return jsonify(customers)

@app.route('/top5films', methods=['GET'])
def get_t5f():
    cursor.execute("""select f.film_id as ID, f.title as TITLE, c.name as GENRE, count(r.rental_id) as RENTALS from rental as r
join inventory as i
on r.inventory_id = i.inventory_id
join film as f
on i.film_id = f.film_id
join film_category as fc
on f.film_id = fc.film_id
right join category as c
on fc.category_id = c.category_id
group by i.film_id, c.name
order by RENTALS desc
limit 5;""")
    films = cursor.fetchall()
    response = jsonify(films)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,OPTIONS"
    return response

@app.route('/top5actors', methods=['GET'])
def get_t5a():
    cursor.execute("""select a.actor_id as ID, a.first_name as FIRST, a.last_name as LAST, count(fa.film_id) as FILMCOUNT from actor as a
        join film_actor as fa
        on a.actor_id = fa.actor_id
        group by fa.actor_id
        order by filmCount desc
        limit 5;""")
    actors = cursor.fetchall()
    response = jsonify(actors)
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,OPTIONS"
    return response

if __name__ == '__main__':
    app.run(port=5000, debug=True)