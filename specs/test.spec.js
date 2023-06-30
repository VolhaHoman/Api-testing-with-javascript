const {sendRequest} = require("../helpers/api.helper");
const testData = require("../config/data.json");

describe("Api Test Suite", () => {
    it('GET post/1', async () => {
        const response = await sendRequest("posts/1");

        expect(response.data.userId).to.equal(1);
        expect(response.status).to.equal(200);
    });

    it('POST posts', async () => {
        const response = await sendRequest("posts", testData, "post");
        expect(response.status).to.equal(201);
    });
    
    it('UPDATE a post', async () => {
        const dataToUpdate = {
            title: "Updated title"
        }
        const response = await sendRequest("posts/1", dataToUpdate, "put");

        console.log(response.data);
        expect(response.status).to.equal(200);
    });

    it('GET updated post', async () => {
        const response = await sendRequest("posts/1");

        expect(response.status).to.equal(200);
        // this check fails because "resource will not be really updated on the server but it will be faked as if" from the documentation
        expect(response.data.title).to.equal("Updated title");
    });

    it('GET comments', async () => {
        const response = await sendRequest("posts/1/comments");

        expect(response.status).to.equal(200);
    });

    it('GET albums', async () => {
        const response = await sendRequest("albums");

        console.log(response);
        expect(response.status).to.equal(200);
    });

    it('GET albums resource', async () => {
        const response = await sendRequest("albums/1/photos");

        expect(response.status).to.equal(200);
    });

    it('GET users', async () => {
        const response = await sendRequest("users");

        console.log(response);
        expect(response.status).to.equal(200);
    });

    it('GET user"s albums', async () => {
        const response = await sendRequest("users/1/albums");

        expect(response.status).to.equal(200);
    });

    it('GET user"s albums filtering', async () => {
        const response = await sendRequest("users?username=Samantha");

        console.log(response);
        expect(response.status).to.equal(200);
    });

    it('GET todos', async () => {
        const response = await sendRequest("users/1/todos");

        expect(response.status).to.equal(200);
    });

    it('GET posts', async () => {
        const response = await sendRequest("users/1/posts");

        expect(response.status).to.equal(200);
    });

    it('DELETE post', async () => {
        const response = await sendRequest("posts/1", "delete");

        expect(response.status).to.equal(200);
    });
});
