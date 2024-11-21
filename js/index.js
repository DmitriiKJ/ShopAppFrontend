const url_server = 'http://localhost:5264'

function logout(){
    localStorage.removeItem("token")
    loadProducts()
}

async function loadProducts() {
    const url_products = `${url_server}/api/apiproducts`
    const token = localStorage.getItem("token")
    return await fetch(
        url_products,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    ).then(response => {
        if(response.status == "401"){
            document.getElementById("move").submit()
            throw new Error('Fail to get products ...')
        }
        else if(!response.ok)
            throw new Error('Fail to get products ...')
        return response.json()
    }).then(products => {
        let result = ''
        products.forEach(p => {
            result += 
            `
                <div class="card" style="width: 18rem;">
                    <img src="./img/image.png" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 id="titleId" class="card-title">${p.name}</h5>
                        <p id="descriptionId" class="card-text">${p.description}</p>
                        <p id="priceId" class="card-text">${p.price}</p>
                        <a href="#" class="btn btn-primary">buy</a>
                    </div>
                </div>
            `
        });
        document.getElementById("parentProducts")
        .innerHTML = result
    })
    .catch(err => console.log(err))
}
loadProducts()