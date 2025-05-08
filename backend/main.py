import pandas as pd
import mysql.connector
from sentence_transformers import SentenceTransformer, util
import plotly.express as px
import random

# LOAD DATA

def load_nl2sql_data():
    df = pd.read_csv("nl2sql.csv").dropna().drop(columns=['Unnamed: 0'], errors='ignore')
    df['question'] = df['question'].astype(str)
    return df

def load_model():
    return SentenceTransformer('all-MiniLM-L6-v2')

def get_sql_result(query):
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Parimala&2004",
            database="company_db"
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

# CHART DECISION LOGIC

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
    return random.choice([
        "Pie Chart", "Donut Chart", "Side-by-Side Bar", "Stacked Bar",
        "Horizontal Bar", "Heat Map", "Line Chart", "Scatter Plot",
        "Area Chart", "Box Plot", "Histogram"
    ])

# CHART PLOTTING FUNCTION

def plot_chart(df, chart_type, user_color, title=""):
    if df.empty:
        return None

    num_cols = df.select_dtypes(include='number').columns.tolist()
    cat_cols = df.select_dtypes(include='object').columns.tolist()
    palette = px.colors.qualitative.Alphabet + px.colors.qualitative.Pastel
    random.shuffle(palette)
    use_color = user_color if user_color else palette[0]

    if chart_type == "Pie Chart" and cat_cols and num_cols:
        return px.pie(df, names=cat_cols[0], values=num_cols[0], color_discrete_sequence=[use_color])
    elif chart_type == "Donut Chart" and cat_cols and num_cols:
        return px.pie(df, names=cat_cols[0], values=num_cols[0], hole=0.4, color_discrete_sequence=[use_color])
    elif chart_type == "Side-by-Side Bar" and cat_cols and num_cols:
        return px.bar(df, x=cat_cols[0], y=num_cols[0], barmode="group", color=cat_cols[0], color_discrete_sequence=palette)
    elif chart_type == "Stacked Bar" and cat_cols and num_cols:
        return px.bar(df, x=cat_cols[0], y=num_cols[0], barmode="stack", color=cat_cols[0], color_discrete_sequence=palette)
    elif chart_type == "Horizontal Bar" and cat_cols and num_cols:
        return px.bar(df, x=num_cols[0], y=cat_cols[0], orientation='h', color=cat_cols[0], color_discrete_sequence=palette)
    elif chart_type == "Heat Map" and len(num_cols) >= 2:
        return px.density_heatmap(df, x=num_cols[0], y=num_cols[1], color_continuous_scale="Viridis")
    elif chart_type == "Line Chart" and cat_cols and num_cols:
        return px.line(df, x=cat_cols[0], y=num_cols[0], color=cat_cols[0], color_discrete_sequence=palette)
    elif chart_type == "Scatter Plot" and len(num_cols) >= 2:
        return px.scatter(df, x=num_cols[0], y=num_cols[1], color_discrete_sequence=[use_color])
    elif chart_type == "Area Chart" and cat_cols and num_cols:
        return px.area(df, x=cat_cols[0], y=num_cols[0], color=cat_cols[0], color_discrete_sequence=palette)
    elif chart_type == "Box Plot" and cat_cols and num_cols:
        return px.box(df, x=cat_cols[0], y=num_cols[0], color=cat_cols[0], color_discrete_sequence=palette)
    elif chart_type == "Histogram" and num_cols:
        return px.histogram(df, x=num_cols[0], color_discrete_sequence=[use_color])
    return None

# MAIN LOGIC FUNCTION

def process_question(question, model, df_nl2sql, embeddings):
    user_emb = model.encode(question, convert_to_tensor=True)
    best_idx = util.cos_sim(user_emb, embeddings).argmax().item()
    sql = df_nl2sql.loc[best_idx, 'querry']
    result_df = get_sql_result(sql)
    chart_type = smart_chart_type(question, result_df)
    return sql, result_df, chart_type

if __name__ == "__main__":
    # For testing only
    pass
