const mysql = require('mysql');

// mysql db
const dbConfig = require('../db_config');
const db = mysql.createPool(dbConfig.params);

module.exports = (req, res, next) => {
  try {
    let userId = req.headers.userid;

    db.query(
      `SELECT is_mod, is_admin FROM user WHERE id=${userId}`,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            sub_err:
              "L'authentification avec la base de donnée a échouée, veuillez réessayer dans quelques instants.",
            err,
          });
        }

        let userIsMod = result[0].is_mod;
        let userIsAdmin = result[0].is_admin;
        modToolsAuth(userIsMod, userIsAdmin);
      }
    );

    function modToolsAuth(userIsMod, userIsAdmin) {
      if (userIsMod != 1 && userIsAdmin != 1) {
        throw "Vous n'avez pas accès aux outils de modération.";
      }
      //valid token, call the next module
      else {
        next();
      }
    }
  } catch (err) {
    res.status(401).json({
      sub_err: "Vous n'avez pas accès aux outils de modération.",
      err,
    });
  }
};
