from flask import Flask, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database connection parameters
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "educast - login"
DB_USER = "postgres"
DB_PASSWORD = "Kq)44Ne@"

def get_db_connection():
    conn = psycopg2.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
    return conn

@app.route('/fetch_podcasts', methods=['GET'])
def fetch_podcasts():
    conn = get_db_connection()
    cur = conn.cursor()
    categories = ['popular', 'recommended', 'new']
    podcasts_by_category = {}
    for category in categories:
        cur.execute("SELECT id, title, description, author, genre, link, platform FROM podcasts WHERE category = %s", (category,))
        podcasts = cur.fetchall()
        podcasts_list = []
        for podcast in podcasts:
            podcasts_list.append({
                'id': podcast[0],
                'title': podcast[1],
                'description': podcast[2],
                'author': podcast[3],
                'genre': podcast[4],
                'link': podcast[5],
                'platform': podcast[6]
            })
        podcasts_by_category[category] = podcasts_list
    cur.close()
    conn.close()
    return jsonify(podcasts_by_category)

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Change the port if needed
