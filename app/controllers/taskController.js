const { Connection } = require("../../db/connection");
const uuidv1 = require("uuid/v1");

const name = "TaskController";

const create = async (request, response) => {
    // Get the documents collection
    const database = Connection.client.db("resources");

    const result = await getProjectAndUserData(database, request.body.project_id, request.body.author_id);

    console.log(result);

    // const project_tasks = { _id: uuidv1(), name: request.body.name, name: request.body.deadline, assignees: {} };
    // const task = {};

    // // Insert some documents
    // database.collection("project_tasks").insertOne({ key: uuidv1(), a: 3 }, (error, result) => {
    //     if (error === null) {
    //         console.log(result);
    //     } else {
    //         console.log(error);
    //     }
    // });
    // database
    //     .collection("project_tasks")
    //     .find({ a: 3 })
    //     .toArray(function(error, docs) {
    //         if (error === null) {
    //             console.log(docs);
    //         } else {
    //             console.log(error);
    //         }
    //     });
    return response.sendStatus(200);
};

/**
 * executing 2 queries in parallel
 * @param {MongoDB DB} database mongo db database instance
 * @param {UUID} project_id id for the project wanted
 * @param {UUID} user_id id for the user wanted
 */
const getProjectAndUserData = async (database, project_id, user_id) => {
    const author = database
        .collection("users")
        .find({ _id: user_id })
        .toArray();

    const project = database
        .collection("projects")
        .find({ _id: project_id })
        .toArray();

    return {
        author: await author,
        project: await project
    };
};

const addUser = () => {
    const database = Connection.client.db("resources");

    database.collection("users").insertOne(
        {
            _id: uuidv1(),
            auth_id: 3,
            first_name: "test",
            last_name: "user",
            position: undefined,
            company_id: uuidv1(),
            projects: { project_id: uuidv1(), project_name: "proj_1", participants: [] }
        },
        (error, result) => {
            if (error === null) {
                console.log(result);
            } else {
                console.log(error);
            }
        }
    );
};

const add = () => {
    const database = Connection.client.db("resources");
    const comp_id = uuidv1();
    database.collection("companies").insertOne(
        {
            _id: comp_id,
            name: "company_1",
            description: undefined,
            created_at: new Date(),
            updated_at: new Date()
        },
        (error, result) => {
            if (error === null) {
                console.log(result);
            } else {
                console.log(error);
            }
        }
    );

    database.collection("projects").insertOne(
        {
            _id: uuidv1(),
            name: "proj_1",
            description: "desc proj 1",
            company_id: comp_id,
            participants: [
                {
                    _id: "43051c20-135f-11e9-ad94-751fbfa75519",
                    first_name: "test",
                    last_name: "user"
                }
            ],
            created_at: new Date(),
            updated_at: new Date()
        },
        (error, result) => {
            if (error === null) {
                console.log(result);
            } else {
                console.log(error);
            }
        }
    );
};
module.exports = { name, create, addUser, add };
