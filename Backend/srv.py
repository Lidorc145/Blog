from flask import Flask, request, abort, make_response, jsonify
import mysql.connector as mysql
import json
import html
import datetime
import bcrypt
import uuid
import os
from flask import render_template

db = mysql.connect(
	host = "",
	user = "admin",
	passwd = "",
	database = "myblog")


#######################################################################################
# How to use this REST API:
#######################################################################################
# to get all users u can send GET reques to /users/
# to get users by any attribute send GET request to /users/<attribute>/<value>
# and replace "<attribute>" and "<value>" with your required attribute and value.
#
# to get all posts u can send GET reques to /posts/
# to get users by any attribute send GET request to /posts/<attribute>/<value>
# and replace "<attribute>" and "<value>" with your required attribute and value.
#
# to add user, send POST request with the required attributes and values to /users/,
# for exmaple:
# send POST request to "/users/"
# with this body:
# {
# 	"full_name": "Demo User",
#	"username": "demoAuther",
#	"password": "demo",
#	"type": "auther"
# }
#
#
# to add post, send POST request with the required attributes and values to /posts/,
# for exmaple:
# send POST request to "/posts/"
# with this body:
# {
# 	"title": "Title text",
#	"summary": "This is the summary..",
#	"content": "content text..",
#	"image": "imgURL",
#	"auther_id": "6",
#	"last_update_date": "2020-06-22 22:59",
#	"publish_date": "2020-06-26 07:02",
#	"tags_list": "{ json tags list }"
# }
#####################################################################################

app = Flask(__name__,
	static_folder='../build',
	static_url_path='')

#######################################
# Routes:
#######################################
@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def page_not_found(e):
    return app.send_static_file('index.html')

@app.route('/users/<attribute>/<value>', methods=['GET', 'POST'])
@app.route('/users/', methods=['GET', 'POST'])
def users(attribute=None, value=None):
	if request.method == 'GET':
		return getUsers(attribute, value)
	else:
		data = request.get_json()
		return addUser(data)

@app.route('/posts/<attribute>/<value>', methods=['GET', 'POST'])
@app.route('/posts/', methods=['GET', 'POST'])
def posts(attribute=None, value=None):
	if request.method == 'GET':
		return getPosts(attribute, value)
	else:
		data = request.get_json()
		return addPost(data)

@app.route('/auther/id/<value>', methods=['GET'])
def auther(attribute=None, value=None):
	if request.method == 'GET':
		return getAuther(value)

@app.route('/logging/', methods=['POST'])
def login():
	if request.method == 'POST':
		return loginCheck()

@app.route('/sessionCheck/', methods=['POST'])
def sessions():
	if request.method == 'POST':
		return sessionCheck()

#######################################
# Functions:
#######################################
def addPost(data):
	query = "insert into posts (title, summary, content, image, auther_id, last_update_date, publish_date, num_of_views, tags_list) values (%s,%s,%s,%s,%s,STR_TO_DATE(%s,'%Y-%m-%d %H:%i'),STR_TO_DATE(%s,'%Y-%m-%d %H:%i'),0,%s)"
	values = (data['title'],data['summary'],str(data['content']),data['image'],data['auther_id'], data['last_update_date'], data['publish_date'],data['tags_list'])
	return postQuery(query, values)

def addUser(data):
	query = "insert into users (full_name, username, password, type) values (%s,%s,%s,%s)"
	values = (data['full_name'],data['username'],data['password'],data['type'])
	return postQuery(query, values)

def getUsers(attribute, value):
	query = "select * from users"
	header = ['id', 'full_name', 'username', 'password', 'type']
	return selectValidation(attribute, header, value, query, "users")

def getPosts(attribute, value):
	query = "select posts.*,users.full_name from users left join posts on users.id=posts.auther_id  where CURRENT_TIMESTAMP()>=posts.publish_date ORDER BY posts.publish_date DESC"
	header = ['id', 'title', 'summary', 'content', 'image', 'auther_id', 'creation_date', 'last_update_date', 'publish_date', 'num_of_views', 'tags_list','auther_name']
	return selectValidation(attribute, header, value, query, "posts")

def getAuther(value):
	query = "select `full_name` from users where id=%s"
	header = ['full_name']
	values=(value,)
	data = getQuery(query, values, header)
	return json.dumps(data)


def selectValidation(attribute, header, value, query, table):
	values=()
	if (attribute is not None) and (value is not None):
		if(attribute in header):
			if table == 'posts':
				print(table)
				print(attribute)
				print(value)
				query ="select posts.*,users.full_name from users left join posts on users.id=posts.auther_id where CURRENT_TIMESTAMP()>=posts.publish_date && "+table+"."+attribute+" = %s ORDER BY posts.publish_date DESC"
			else:
				query = "select * from "+table+" where "+attribute+"=%s"
			values = (value, )
		else:
			print(query)
			return "Invalid argument!", 404
	print(query)
	data = getQuery(query,values, header)
	return json.dumps(data)

def postQuery(query, values):
	user = permissionCheck("auther")
	cursor = db.cursor()
	print(query)
	print(values)
	cursor.execute(query, values)
	db.commit()
	new_post_id = cursor.lastrowid
	cursor.close()
	return "Added: "+str(new_post_id)

def getQuery(query, values, header):
	print(query)
	print(values)
	cursor = db.cursor()
	cursor.execute(query,values)
	records = cursor.fetchall()
	cursor.close()
	data = []
	print(str(records))
	for row in records:
		tmp = []
		for col in row:
			tmp.append((html.escape(str(col))))   #because of the datetime Object(Json Unsupport)
		data.append(dict(zip(header, tmp)))
	return data

def loginCheck():
	data = request.get_json()
	if 'username' in data and 'password' in data:
		print(data)
		query = "select id, full_name, password, type from users WHERE username = %s"
		values = (data['username'],)
		cursor = db.cursor()
		print(query)
		print(values)
		cursor.execute(query, values)
		record = cursor.fetchone()
		if not record:
			abort(401)

		userID=record[0]
		fullName=record[1]
		hashedPwd=record[2].encode('utf-8')
		type=record[3]

		if bcrypt.hashpw(data['password'].encode('utf-8'), hashedPwd) != hashedPwd:
			abort(401)

		sessionID = str(uuid.uuid4())
		query = "insert into sessions (user_id, session_id) values (%s, %s) on duplicate key update session_id = %s"
		print(sessionID)
		values = (userID, sessionID, sessionID)

		cursor.execute(query, values)

		db.commit()
		cursor.close()
		print(jsonify({'id': userID, 'full_name': fullName, 'username': data['username'], 'type': type }))
		resp = make_response(jsonify({'id': userID, 'full_name': fullName, 'username': data['username'], 'type': type }))
		resp.set_cookie("sessionID", sessionID)
		return resp
	abort(400)

def sessionCheck():
	print(request.cookies['sessionID'])
	if 'sessionID' in request.cookies:
		sessionID=request.cookies['sessionID']
		query = "select user_id from sessions where session_id = %s"
		values = (sessionID, )
		cursor = db.cursor()
		cursor.execute(query, values)
		record = cursor.fetchone()
		if not record:
			abort(401)
		userID=record[0]
		query = "select * from users where id = %s"
		values = (userID, )
		cursor.execute(query, values)
		record = cursor.fetchone()
		if not record:
			abort(401)
		user = {'id': str(record[0]), 'full_name': record[1], 'username': record[2], 'type': record[4]}
		print(user)
		cursor.close()
		return user
	abort(401)

def permissionCheck(type):
	user = sessionCheck()
	print(user['type'])
	print(type)
	if type == "All" or user['type']=="admin" or user['type'] == type:
		return user
	abort(403)

if __name__ == "__main__":
	app.run(host='0.0.0.0', debug=True)