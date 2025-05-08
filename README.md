# 🚀 NL2SQL
 
NL2SQL API – Natural Language Interface for Databases
A production-ready REST API that translates user-input natural language questions into structured SQL queries, executes them on a relational database (MySQL), and intelligently suggests the most relevant chart type for data visualization. Powered by transformer-based semantic search and designed for seamless integration with business intelligence tools or dashboards.

✨ Key Capabilities
🧠 Semantic Matching: Leverages Sentence Transformers to map questions to the most relevant SQL query using cosine similarity.

🗃️ Dynamic SQL Execution: Securely runs the best-matching SQL query against a MySQL database.

📊 Smart Chart Recommendations: Suggests the most appropriate visualization type (e.g., bar, line, heatmap) based on the user's intent.

🔗 Cross-Origin Support: CORS-enabled backend for smooth integration with web clients.

⚡ Batch Processing: Handles up to 5 questions per request with high performance.

📁 Project Structure
text
Copy
Edit
├── app.py                 # Main Flask application
├── nl2sql.csv             # Natural language questions & corresponding SQL queries
├── requirements.txt       # Python dependencies
├── README.md              # Project documentation
└── .env                   # Environment variables (optional, not committed)
⚙️ Setup Instructions
✅ Prerequisites
Python 3.8+

MySQL Server

nl2sql.csv with question and querry columns

1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/parimalamurugan123/nl2sql-api.git
cd nl2sql-api
2. Create a Virtual Environment and Install Dependencies
bash
Copy
Edit
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
3. Configure Database Connection
Add your database credentials either directly in app.py or via a .env file:

bash
Copy
Edit
# .env (not committed to Git)
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=Parimala&2004
MYSQL_DB=company_db
In app.py, load them using:

python
Copy
Edit
from dotenv import load_dotenv
load_dotenv()
import os

mysql.connector.connect(
    host=os.getenv("MYSQL_HOST"),
    user=os.getenv("MYSQL_USER"),
    password=os.getenv("MYSQL_PASSWORD"),
    database=os.getenv("MYSQL_DB")
)
## 4. Run the Server
bash
Copy
Edit
python app.py
Visit: http://127.0.0.1:5000/

# 🧪 API Usage
Endpoint: POST /predict
Payload Format:

json
Copy
Edit
{
  "inputs": [
    "How many employees are in each department?",
    "Show salary trend over the years",
    "Top 5 departments by revenue",
    "What is the average age of employees?",
    "Distribution of employee experience"
  ]
}
Response:

json
Copy
Edit
[
  {
    "question": "How many employees are in each department?",
    "sql": "SELECT department, COUNT(*) FROM employees GROUP BY department;",
    "chartType": "Stacked Bar",
    "data": [
      {"department": "Sales", "COUNT(*)": 15},
      {"department": "HR", "COUNT(*)": 8}
    ],
    "columns": ["department", "COUNT(*)"]
  },
  ...
]
# 📊 Chart Recommendation Heuristics
Keyword(s)	Suggested Chart
correlation, relation	Heat Map
average, mean	Box Plot
trend, change	Line Chart
compare, comparison	Side-by-Side Bar
percent, share	Donut Chart
total, sum	Stacked Bar
top, ranking	Horizontal Bar
distribution	Histogram
scatter	Scatter Plot
area	Area Chart
(default)	Table

# 🧱 Technology Stack
## Backend Framework: Flask

NLP Model: all-MiniLM-L6-v2

Vector Similarity: Cosine Similarity (sentence-transformers)

Database: MySQL

Language: Python 3.8+

Deployment Ready: CORS-enabled, modularized, API-first

# 🛡️ Security Notes
✅ Database credentials should never be hardcoded in production.

✅ Use .env files with python-dotenv or environment secrets in containers.

✅ Future improvement: parameterize SQL for protection from injection if dynamic SQL is allowed.

# 🚧 Future Enhancements

🔍 Add FAISS or ANN-based semantic search for large datasets.

🧠 Fine-tune transformer model for domain-specific queries.

📈 Add metadata for visualization tools (e.g., column roles: x/y axis).

🔐 Implement token-based authentication.

🌐 Deploy to cloud using Docker & Gunicorn.

## 👩‍💻 Author
Parimala Murugavel
📍 Coimbatore, Tamil Nadu
📧 parimalakavitha0@gmail.com

