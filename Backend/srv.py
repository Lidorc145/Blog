from flask import Flask, request, abort, make_response, session, jsonify, gimport mysql.connectorimport mysql.connector.poolingimport jsonimport htmlimport datetimeimport bcryptimport uuidfrom config import *db = mysql.connector.pooling.MySQLConnectionPool(host = str(host),                                                             user = str(user),                                                             password = str(password),                                                             database = str(database),                                                             pool_name='my_connection_pool',                                                             pool_size=30)######################################################################################## How to use this REST API:######################################################################################## to get all users u can send GET reques to /users/# to get users by any attribute send GET request to /users/<attribute>/<value># and replace "<attribute>" and "<value>" with your required attribute and value.## to get all posts u can send GET reques to /posts/# to get users by any attribute send GET request to /posts/<attribute>/<value># and replace "<attribute>" and "<value>" with your required attribute and value.## to add user, send POST request with the required attributes and values to /users/,# for exmaple:# send POST request to "/users/"# with this body:# {# 	"full_name": "Demo User",#	"username": "demoAuther",#	"password": "demo",#	"type": "auther"# }### to add post, send POST request with the required attributes and values to /posts/,# for exmaple:# send POST request to "/posts/"# with this body:# {# 	"title": "Title text",#	"summary": "This is the summary..",#	"content": "content text..",#	"image": "imgURL",#	"auther_id": "6",#	"last_update_date": "2020-06-22 22:59",#	"publish_date": "2020-06-26 07:02",#	"tags_list": "{ json tags list }"# }#####################################################################################app = Flask(__name__,	static_folder='../build',	static_url_path='')######################################## Routes:#######################################@app.before_requestdef before_request():	g.db = db.get_connection()@app.teardown_requestdef teardown_request(exception):	g.db.close()@app.route('/')def index():	return app.send_static_file('index.html')@app.errorhandler(404)def page_not_found(e):	return app.send_static_file('index.html')@app.route('/users/<attribute>/<value>', methods=['GET', 'POST'])@app.route('/users/', methods=['GET', 'POST'])def users(attribute=None, value=None):	if request.method == 'GET':		return getUsers(attribute, value)	else:		data = request.get_json()		return addUser(data) @app.route('/posts/page/<value>', methods=['GET'])@app.route('/posts/page/', methods=['GET'])def postsPage(value=None):	if request.method == 'GET':		if value!=None:			return getPostsPage(value)		else:					return countPages()@app.route('/posts/update/<postID>', methods=['POST'])def postUpdate(postID=None):	data = request.get_json()	return updatePost(postID, data)	@app.route('/posts/delete/<postID>', methods=['GET'])def postDelete(postID=None):	data = request.get_json()	return deletePost(postID)@app.route('/posts/<attribute>/<value>', methods=['GET', 'POST'])@app.route('/posts/', methods=['GET', 'POST'])def posts(attribute=None, value=None):	if request.method == 'GET':		return getPosts(attribute, value)	else:		data = request.get_json()		return addPost(data)@app.route('/auther/id/<value>', methods=['GET'])def auther(value=None):	if request.method == 'GET':		return getAuther(value)@app.route('/tags/id/<tagID>', methods=['GET'])@app.route('/tags/', methods=['GET'])def tags(tagID=None):	if tagID != None:		return getTagPosts(tagID)	return getTags()@app.route('/logging/', methods=['POST'])def login():	if request.method == 'POST':		return loginCheck()@app.route('/sessionCheck/', methods=['POST'])def sessions():	if request.method == 'POST':		return sessionCheck()		@app.route('/register/', methods=['POST'])def register():	if request.method == 'POST':		return registerCheck()@app.route('/logout/', methods=['POST'])def logoutRoute():	if request.method == 'POST':		return logout()######################################## Functions:#######################################def addPost(data):	query = "insert into posts (title, summary, content, image, auther_id, last_update_date, publish_date, num_of_views) values (%s,%s,%s,%s,%s,STR_TO_DATE(%s,'%Y-%m-%d %H:%i'),STR_TO_DATE(%s,'%Y-%m-%d %H:%i'),0)"	values = (data['title'],data['summary'],str(data['content']),data['image'],data['auther_id'], data['last_update_date'], data['publish_date'])	user = permissionCheck("auther")	cursor = g.db.cursor()	cursor.execute(query, values)	#add tags:	newPostID=cursor.lastrowid	for tag in json.loads(data['tags_list']):		query = "insert into tags (tag_name) values (%s) ON DUPLICATE KEY UPDATE tag_name=%s"		values = (tag, tag)		cursor.execute(query, values)		query = "select id from tags where tag_name=%s"		values = (tag,)		cursor.execute(query, values)		newTagID = cursor.fetchone()[0]		print("tagID:")		print(newTagID)		query = "insert into postsTags (post_id, tag_id) values (%s, %s)"		values = (newPostID,newTagID)		print(query)		print(values)		cursor.execute(query, values)	g.db.commit()	cursor.close()	return str(newPostID)	def updatePost(postID, data):	user = sessionCheck()	userJson = json.loads(user)	postAutherID = getPostAuther(postID)	if(userJson['type'] == "admin" or postAutherID==userJson['id']):		cursor = g.db.cursor()		query = "update posts set `title`=%s, `summary`=%s, `content`=%s, `image`=%s, `last_update_date`=STR_TO_DATE(%s,'%Y-%m-%d %H:%i'), `publish_date`=STR_TO_DATE(%s,'%Y-%m-%d %H:%i') where `id`=%s"		values =  (data['title'],str(data['summary']),str(data['content']),data['image'], data['last_update_date'], data['publish_date'], postID)		cursor.execute(query, values)		query = "delete from postsTags where post_id=%s"		values = (postID,)		cursor.execute(query, values)		for tag in json.loads(data['tags_list']):			print("tag name: ")			print(tag)			query = "insert into tags (tag_name) values (%s) ON DUPLICATE KEY UPDATE tag_name=%s"			values = (tag, tag)			cursor.execute(query, values)			query = "select id from tags where tag_name=%s"			values = (tag,)			cursor.execute(query, values)			newTagID = cursor.fetchone()[0]			print("tagID:")			print(newTagID)			query = "INSERT INTO `myblog`.`postsTags` (`tag_id`, `post_id`) VALUES (%s, %s)"			values = (newTagID,postID)			print(query)			print(values)			cursor.execute(query, values)		g.db.commit()		cursor.close()		return "secuess"	else:		abort(403)		def deletePost(postID):	user = sessionCheck()	userJson = json.loads(user)	postAutherID = getPostAuther(postID)	if (userJson['type'] == "admin" or postAutherID == userJson['id']):		cursor = g.db.cursor()		# delete tags:		query = "delete from postsTags where post_id=%s"		values = (postID,)		cursor.execute(query, values)		#delete post		query = "delete from posts where id=%s"		values =  (postID, )		cursor.execute(query, values)		g.db.commit()		cursor.close()		return "secuess"	else:		abort(403)def addUser(data):	query = "insert into users (full_name, username, password, type) values (%s,%s,%s,%s)"	values = (data['full_name'],data['username'],data['password'],data['type'])	return Query(query, values)def getUsers(attribute, value):	query = "select id, full_name, username, email, type from users"	header = ['id', 'full_name', 'username', 'email', 'type']	return selectValidation(attribute, header, value, query, "users")def getPosts(attribute, value):	query = "select posts.*,users.full_name from users left join posts on users.id=posts.auther_id  where  ADDTIME(CURRENT_TIMESTAMP(),'3:00')>=posts.publish_date ORDER BY posts.publish_date DESC"	header = ['id', 'title', 'summary', 'content', 'image', 'auther_id', 'creation_date', 'last_update_date', 'publish_date', 'num_of_views', 'tags_list','auther_name']	return selectValidation(attribute, header, value, query, "posts")def getAuther(value):	query = "select `full_name` from users where id=%s"	header = ['full_name']	values=(value,)	data = getQuery(query, values, header)	return json.dumps(data) def getPostsPage(offset):	query = "select posts.*,users.full_name from users left join posts on users.id=posts.auther_id  where  ADDTIME(CURRENT_TIMESTAMP(),'3:00')>=posts.publish_date ORDER BY posts.publish_date DESC LIMIT 10  OFFSET %s"	header = ['id', 'title', 'summary', 'content', 'image', 'auther_id', 'creation_date', 'last_update_date', 'publish_date', 'num_of_views', 'tags_list','auther_name']	offset=((int(offset)-1)*10)	values=(offset,)	data = getQuery(query, values, header)	return json.dumps(data)def getPostsTags(postID):	query = "select tags.id, tags.tag_name from postsTags left join tags on tags.id=postsTags.tag_id  where post_id=%s"	values=(postID,)	cursor = g.db.cursor()	cursor.execute(query, values)	records = cursor.fetchall()	cursor.close()	data = []	header = ['tag_id', 'tag_name']	print(str(records))	for row in records:		tmp = []		for col in row:			tmp.append((str(col)))		data.append(dict(zip(header, tmp)))	return json.dumps(data)def countPages():	query = "select count(*) from users left join posts on users.id=posts.auther_id  where  ADDTIME(CURRENT_TIMESTAMP(),'3:00')>=posts.publish_date"	conn = db.get_connection()	cursor = g.db.cursor()	cursor.execute(query)	record = cursor.fetchone()	print(record)	g.db.commit()	cursor.close()	return json.dumps(record)def selectValidation(attribute, header, value, query, table):	if (attribute is not None) and (value is not None):		if(attribute in header):			if table == 'posts':				increasePostView(value)				query ="select posts.*,users.full_name from users left join posts on users.id=posts.auther_id where ADDTIME(CURRENT_TIMESTAMP(),'3:00')>=posts.publish_date && "+table+"."+attribute+"="+value+" ORDER BY posts.publish_date DESC"				values = ()#(table+"."+attribute+"="+value,)				data = getQuery(query, values, header)				if (len(data) == 0):					return "Invalid argument!", 404				print("data")				print(data)				print("data[id]")				data.append(getPostsTags(data[0]['id']))				return json.dumps(data)			elif table == 'users':				query = "select id, full_name, username, email, type from users where "+attribute+"=%s"				values = (value, )			else:				values = (value,)		else:			return "Invalid argument!", 404	data = getQuery(query,values, header)	if(len(data)==0):		return "Invalid argument!", 404	else:		return json.dumps(data)def Query(query, values):	cursor = g.db.cursor()	cursor.execute(query, values)	g.db.commit()	cursor.close()	return "secuess"def postQuery(query, values):	user = permissionCheck("auther")	cursor = g.db.cursor()	cursor.execute(query, values)	g.db.commit()	cursor.close()	return "secuess"def increasePostView(postID):	query = "UPDATE posts SET num_of_views = num_of_views + 1 WHERE id=%s"	values=(postID,)	cursor = g.db.cursor()	cursor.execute(query, values)	g.db.commit()	cursor.close()	return "secuess"	def getPostAuther(postID):	query="select auther_id from posts WHERE id=%s"	values=(postID,)	cursor = g.db.cursor()	cursor.execute(query, values)	record = cursor.fetchone()	if not record:		abort(401)	return record[0]def getTags():	query="SELECT tags.id, tags.tag_name, count(*) as count FROM tags RIGHT JOIN postsTags ON tags.id = postsTags.tag_id group by tag_id"	cursor = g.db.cursor()	cursor.execute(query)	records = cursor.fetchall()	cursor.close()	data = []	header = ['tag_id','tag_name', 'count']	print(str(records))	for row in records:		tmp = []		for col in row:			tmp.append((html.escape(str(col))))  # because of the datetime Object(Json Unsupport)		data.append(dict(zip(header, tmp)))	return json.dumps(data)def getTagPosts(tagID):	query = "select tag_id,tags.tag_name,posts.* from postsTags right join tags on postsTags.tag_id=tags.id right join posts on postsTags.post_id=posts.id where tag_id=%s and ADDTIME(CURRENT_TIMESTAMP(),'3:00')>=posts.publish_date ORDER BY posts.publish_date DESC"	values=(tagID,)	cursor = g.db.cursor()	cursor.execute(query,values)	records = cursor.fetchall()	cursor.close()	data = []	header = ['tag_id','tag_name', 'id', 'title', 'summary', 'content', 'image', 'auther_id', 'creation_date', 'last_update_date',			  'publish_date', 'num_of_views', 'auther_name']	print(str(records))	for row in records:		tmp = []		for col in row:			tmp.append((html.escape(str(col))))  # because of the datetime Object(Json Unsupport)		data.append(dict(zip(header, tmp)))	return json.dumps(data)def getQuery(query, values, header):	print(query)	print(values)		cursor = g.db.cursor()	cursor.execute(query,values)	records = cursor.fetchall()	g.db.commit()	cursor.close()	data = []	#print(str(records))	for row in records:		tmp = []		for col in row:			tmp.append((html.escape(str(col))))   #because of the datetime Object(Json Unsupport)		data.append(dict(zip(header, tmp)))	return datadef loginCheck():	data = request.get_json()	if 'username' in data and 'password' in data:		print(data)		query = "select id, full_name, password, type from users WHERE username = %s"		values = (data['username'],)				cursor = g.db.cursor()		print(query)		print(values)		cursor.execute(query, values)		record = cursor.fetchone()		if not record:			abort(401)		userID=record[0]		fullName=record[1]		hashedPwd=record[2].encode('utf-8')		type=record[3]		if bcrypt.hashpw(data['password'].encode('utf-8'), hashedPwd) != hashedPwd:			abort(401)		sessionID = str(uuid.uuid4())		query = "insert into sessions (user_id, session_id) values (%s, %s) on duplicate key update session_id = %s"		print(sessionID)		values = (userID, sessionID, sessionID)		cursor.execute(query, values)				g.db.commit()		cursor.close()		print(jsonify({'id': userID, 'full_name': fullName, 'username': data['username'], 'type': type }))		resp = make_response(jsonify({'id': userID, 'full_name': fullName, 'username': data['username'], 'type': type }))		resp.set_cookie("sessionID", sessionID, expires="1")		return resp	abort(400)def sessionCheck():	if 'sessionID' in request.cookies:		sessionID=request.cookies['sessionID']		query = "select user_id from sessions where session_id = %s"		values = (sessionID, )				cursor = g.db.cursor()		cursor.execute(query, values)		record = cursor.fetchone()		if not record:			abort(401)		userID=record[0]		query = "select id, full_name, username, type from users where id = %s"		values = (userID, )		cursor.execute(query, values)		record = cursor.fetchone()		if not record:			abort(401)		user = {'id': str(record[0]), 'full_name': record[1], 'username': record[2], 'type': record[3]}		print(user)		g.db.commit()		cursor.close()		print(user)		return json.dumps(user)	abort(401)def registerCheck():	data = request.get_json()	print(data)	query = "insert into users (`full_name`, `username`, `password`, `email`, `type`) values (%s,%s,%s,%s,%s)"	hashedPwd = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())			values = (data['firstName']+" "+data['lastName'], data['username'],hashedPwd,data['email'], "auther")		cursor = g.db.cursor()	print(query)	print(values)	cursor.execute(query, values)	new_user_id = cursor.lastrowid	g.db.commit()		sessionID = str(uuid.uuid4())	query = "insert into sessions (user_id, session_id) values (%s, %s) on duplicate key update session_id = %s"	print(sessionID)	values = (new_user_id, sessionID, sessionID)	cursor.execute(query, values)		g.db.commit()	cursor.close()	resp = make_response("Added User with ID: "+str(new_user_id))	resp.set_cookie("sessionID", sessionID, expires="1")	return respdef permissionCheck(type):	user = sessionCheck()	userJson = json.loads(user)	if type == "All" or userJson['type']=="admin" or userJson['type'] == type:		return user	abort(403)def logout():	print(request.cookies['sessionID'])	if 'sessionID' in request.cookies:		sessionID=request.cookies['sessionID']		query = "delete from sessions where session_id = %s"		values = (sessionID, )				cursor = g.db.cursor()		cursor.execute(query, values)				g.db.commit()		cursor.close()		resp = make_response()		resp.set_cookie("sessionID", value='', expires=0)		return resp	abort(401)if __name__ == "__main__":	app.run(host='0.0.0.0', debug=true)