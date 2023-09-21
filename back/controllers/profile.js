const mysql = require('mysql');

// mysql db
const dbConfig = require('../db_config');
const db = mysql.createPool(dbConfig.params);

exports.getAllForums = (req, res, next) => {
  let userId = req.headers.userid;

  if (userId) {
    db.query(
      `SELECT a.id as user_id,
                    a.firstname,
                    a.lastname,
                    a.pic_url,
                    f.id,
                    f.text,
                    f.image_url,
                    f.created_at
            FROM user as a
            INNER JOIN forum as f
            ON a.id = f.user_id
            WHERE f.user_id = ${userId}
            ORDER BY f.created_at DESC
            `,
      (err, result) => {
        if (err) {
          return res.status(400).json({
            sub_err:
              "La récupération du fil d'actualité personnel a échouée, veuillez réessayer dans quelques instants.",
            err,
          });
        }
        // if user doesn't have custom icon, replace by vanilla icon
        result.forEach((userForum) => {
          if (!userForum.pic_url) {
            userForum.pic_url = 'http://localhost:3000/images/user-icon.png';
          }
        });

        return res.status(200).json({ result });
      }
    );
  }
  // fields missing
  else {
    return res.status(400).json({
      sub_err:
        "Validation de donnée: Il semblerait que l'un des champs requis est manquant.",
    });
  }
};
