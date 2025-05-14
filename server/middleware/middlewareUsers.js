const db_pool = require('../database');
const promisePool = db_pool.pool.promise(); // ✅ לפי מה שמיוצא בקובץ database.js

function addSlashes(str) {
    return str.replace(/'/g, "\\'");
}

// 📌 הוספת משתמש חדש
async function AddUser(req, res, next) {
    let { name, uname, passwd, email, type_id, tz } = req.body;
    name = addSlashes(name);
    uname = addSlashes(uname);
    passwd = addSlashes(passwd);
    email = addSlashes(email);
    tz = addSlashes(tz);

    const Query = `
        INSERT INTO users (name, uname, passwd, email, type_id, tz)
        VALUES ('${name}', '${uname}', '${passwd}', '${email}', '${type_id}', '${tz}')
    `;

    try {
        await promisePool.query(Query);
    } catch (err) {
        console.log(err);
    }

    next();
}

// 📌 עדכון משתמש
async function UpdateUser(req, res, next) {
    let id = parseInt(req.params.id);
    if (id <= 0) {
        req.GoodOne = false;
        return next();
    }
    req.GoodOne = true;

    let { name, uname, passwd, email, type_id, tz } = req.body;
    name = addSlashes(name);
    uname = addSlashes(uname);
    passwd = addSlashes(passwd);
    email = addSlashes(email);
    tz = addSlashes(tz);

    const Query = `
        UPDATE users
        SET name='${name}', uname='${uname}', passwd='${passwd}', email='${email}', type_id='${type_id}', tz='${tz}'
        WHERE id='${id}'
    `;

    try {
        await promisePool.query(Query);
    } catch (err) {
        console.log(err);
    }

    next();
}

// 📌 שליפת כל המשתמשים
async function GetAllUsers(req, res, next) {
    const Query = "SELECT * FROM users";
    req.users_data = [];

    try {
        const [rows] = await promisePool.query(Query);
        req.users_data = rows;
    } catch (err) {
        console.log(err);
    }

    next();
}

// 📌 שליפת משתמש בודד לפי ID
async function GetOneUser(req, res, next) {
    let id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        req.GoodOne = false;
        return next();
    }

    req.GoodOne = true;
    const Query = `SELECT * FROM users WHERE id='${id}'`;
    req.one_user_data = {};

    try {
        const [rows] = await promisePool.query(Query);
        if (rows.length > 0) {
            req.one_user_data = rows[0];
        }
    } catch (err) {
        console.log(err);
    }

    next();
}

// 📌 מחיקת משתמש
async function DeleteUser(req, res, next) {
    let id = parseInt(req.body.id);
    if (id > 0) {
        const Query = `DELETE FROM users WHERE id='${id}'`;
        try {
            await promisePool.query(Query);
        } catch (err) {
            console.log(err);
        }
    }

    next();
}

// ✅ ייצוא הפונקציות לשימוש בנתיבים
module.exports = {
    AddUser,
    GetAllUsers,
    GetOneUser,
    DeleteUser,
    UpdateUser
};
