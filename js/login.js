async function login(e) {
    e.preventDefault()

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    await fetch(
        'http://localhost:5264/api/apiuser/auth',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
    )
        .then(res => {
            if(res.status == 400){
                alert("Incorrect email or password")
                throw new Error('Fail to get token ...')
            }
            return res.json()
        }
        )
        .then(data => {
            localStorage.setItem("token", data.token)
            document.getElementById("move").submit()
        }
        )
        .catch(err => console.log(err))
}