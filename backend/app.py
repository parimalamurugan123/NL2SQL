import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import mysql.connector
from sentence_transformers import SentenceTransformer, util

# --- Flask App Initialization ---
app = Flask(__name__)
CORS(app)

# --- Load Model & Data Once at Startup ---
MODEL_PATH = 'all-MiniLM-L6-v2'
NL2SQL_CSV = 'nl2sql.csv'

print("Loading NL2SQL data and model...")
df_nl2sql = pd.read_csv(NL2SQL_CSV).dropna().drop(columns=['Unnamed: 0'], errors='ignore')
df_nl2sql['question'] = df_nl2sql['question'].astype(str)
model = SentenceTransformer(MODEL_PATH)
embeddings = model.encode(df_nl2sql['question'].tolist(), convert_to_tensor=True)
print("Model and data loaded.")

# --- Database Connection Helper ---
def get_sql_result(query):
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Parimala&2004",  # Change to your MySQL password
            database="company_db"      # Change to your database name
        )
        cur = conn.cursor()
        cur.execute(query)
        rows = cur.fetchall()
        cols = [d[0] for d in cur.description]
        return pd.DataFrame(rows, columns=cols)
    except Exception as e:
        print(f"SQL Error: {e}")
        return pd.DataFrame()
    finally:
        try:
            cur.close()
            conn.close()
        except:
            pass

# --- Chart Type Decision ---
def smart_chart_type(question, df):
    q = question.lower()
    if "correlation" in q or "relation" in q:
        return "Heat Map"
    if "average" in q or "mean" in q:
        return "Box Plot"
    if "distribution" in q:
        return "Histogram"
    if "change" in q or "trend" in q:
        return "Line Chart"
    if "comparison" in q or "compare" in q:
        return "Side-by-Side Bar"
    if "total" in q or "sum" in q:
        return "Stacked Bar"
    if "percent" in q or "share" in q:
        return "Donut Chart"
    if "ranking" in q or "top" in q:
        return "Horizontal Bar"
    if "scatter" in q:
        return "Scatter Plot"
    if "area" in q:
        return "Area Chart"
    return "Table"

# --- Main NL2SQL Logic ---
def process_question(question):
    user_emb = model.encode(question, convert_to_tensor=True)
    best_idx = util.cos_sim(user_emb, embeddings).argmax().item()
    sql = df_nl2sql.loc[best_idx, 'querry']
    result_df = get_sql_result(sql)
    chart_type = smart_chart_type(question, result_df)
    return sql, result_df, chart_type

# --- API Endpoints ---

@app.route('/')
def home():
    return "NL2SQL Flask backend running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        questions = data.get('inputs', [])
        if not isinstance(questions, list) or len(questions) != 5:
            return jsonify({'error': 'Please provide a list of 5 questions as "inputs".'}), 400

        results = []
        for question in questions:
            sql, result_df, chart_type = process_question(question)
            results.append({
                'question': question,
                'sql': sql,
                'chartType': chart_type,
                'data': result_df.to_dict(orient='records'),
                'columns': list(result_df.columns)
            })

        return jsonify(results)
    except Exception as e:
        print(f"Error in /predict: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
