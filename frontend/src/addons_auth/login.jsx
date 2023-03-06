const API_URL = "http://localhost:8000/api/auth/login";

export async function login(username, password, csrftoken) {
    const config = {
        headers: {
            'X-CSRFToken': csrftoken
        }
    };
    console.log(csrftoken)

    let body = new FormData;
    body.append("username", username);
    body.append("password", password);

    let response = await fetch(API_URL, {
        method: 'post',
        headers: config,
        mode: "no-cors",
        body: body
    });
    return response.ok;
}