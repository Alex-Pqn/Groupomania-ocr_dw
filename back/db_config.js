// db config export
module.exports.params = {
  host              : process.env.MYSQL_HOST,
  user              : process.env.MYSQL_USER,
  password          : process.env.MYSQL_USER_PASSWORD,
  database          : process.env.MYSQL_DB_NAME,
  connectionLimit   : 10,
  queueLimit        : 0,
  waitForConnection : true,
}