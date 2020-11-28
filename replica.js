const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config()

let instance = null;
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
})

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('DB: ' + connection.state)
});

// REDO THIS FOR UNDERSTANDING!! // REDO THIS FOR UNDERSTANDING!!
class DbService {

    static getDbServiceInstance() {
        console.log(instance)
        return instance ? instance : new DbService();
    }

    async getAllData() {
        try {
            const response = await new Promise((rej, res) => {
            const query = "select * from internships"

            connection.query(query, (err, results) => {
                // Now if this section of the code does not work mapp the failure to the parent function!!
                if (err) {
                    rej(new Error(err.message))
                }
                //Now it just so happens that if this function or query goes through succssefully then you are done so now you can just map the success and results to the parent function's resolve!!
                res(results)
            })
        })
        // Now, if the everything worked fine and the response variable is filled, then go ahead and just return it!!
        return response


    } catch (error) {
            
        }
        
}






// async function upload() {
//     photoLoad = new Promise((reject, resolve) => {
//         setTimeout(() => {
//             reject('It Work!');
//         }, 1000)

//     })
    
//     let result = await photoLoad;
//     console.log(result)
// }

// upload();

module.exports = DbService;