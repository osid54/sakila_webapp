
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# Connect to MySQL
db = mysql.connector.connect(
    host="127.0.0.1",
    user="root",
    password="awesomeness54",
    database="sakila"
)
cursor = db.cursor(dictionary=True)

@app.route('/films/top5', methods=['GET'])
def get_top5_films():
    cursor.execute("""select f.film_id, f.title, c.name, count(r.rental_id) as rentalCount from rental as r
    join inventory as i
    on r.inventory_id = i.inventory_id
    join film as f
    on i.film_id = f.film_id
    join film_category as fc
    on f.film_id = fc.film_id
    right join category as c
    on fc.category_id = c.category_id
    group by i.film_id, c.name
    order by rentalCount desc
    limit 5;""")
    films = cursor.fetchall()
    return jsonify(films)

if __name__ == '__main__':
    app.run(debug=True)
