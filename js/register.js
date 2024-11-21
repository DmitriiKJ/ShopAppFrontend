async function register(e) {
    e.preventDefault()
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    await fetch(
        'http://localhost:5264/api/apiuser/register',
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
            if (!res.ok) {
                alert("Fail with register")
                throw new Error('Fail to register ...')
            }
            res.json()
        })
        .then(data => {
            alert("You was register successsfully")
            document.getElementById("move").submit()
        }
        )
        .catch(err => console.log(err))


}