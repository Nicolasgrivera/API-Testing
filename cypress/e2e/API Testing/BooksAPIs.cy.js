describe('Books API', ()=>{

    // API variables
    let API_BOOKS_BASE_URL = Cypress.env('API_BOOKS_BASE_URL')
    let API_Orders = `${API_BOOKS_BASE_URL}/orders`
    let API_Clients = `${API_BOOKS_BASE_URL}/api-clients`;

    // Response from APIs variables 
    let authToken
    let status
    let orderId
    let responseIsOrderCreated

    // variable to pass to post json body
    let randomString = Math.random().toString()


    function getToken(){
        return new Promise((resolve, reject)=>{

            let dataClientPost = {
                clientName: randomString,
                clientEmail: `${randomString}@test.com`
            }

        cy.request({
            method: "POST",
            url: API_Clients,
            headers: { 'Content-Type': 'application/json'},
            body: dataClientPost

        }).then((response)=>{
            authToken = response.body.accessToken;
            status = response.status
            resolve([authToken,status])
        })

    })}

    function checkResponseStatus(responseData){
        cy.log(`Your status code is: ${responseData[1]}`)
        expect(responseData[1]).to.eq(201)
    }
    
    function displayToken(responseData){
        cy.log(`Token id: ${responseData[0]}`)
    }

    function onError(err){
        cy.log(`Error: ${err}`)
    }

    
    function postOrderId(){
            
        return new Promise((resolve, reject)=>{

            randomString = Math.random().toString()

            let dataOrders = {
                bookId: 1,
                customerName: randomString
            }

            cy.request({
                method: "POST",
                url: API_Orders,
                headers: {'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`},
                body: dataOrders

            }).then((response)=>{
                orderId = response.body.orderId
                status = response.status
                responseIsOrderCreated = response.body.created
                resolve([orderId,status,responseIsOrderCreated])
            })
        })
    }
    
    function checkOrderIdLength(responseData){
        cy.log(`Your order id is: ${responseData[0]}`)
        expect(jsonData[0]).to.have.lengthOf(21)
    }

    function isOrderCreated(responseData){
        cy.log(`Is created: ${responseData[2]}`)
        expect(jsonData[2]).to.eq(true)
    }


    it('Validate response status from API getToken', ()=>{

        getToken()
        .then(checkResponseStatus)
        .catch(onError)
        .finally(()=>{
        // finally is used to clean up randomString so it can be used again
        // on the next POST without repeating its value 
            randomString =  Math.random().toString();
        })

    })

    it('Get API Client Token for random user.', ()=>{

        getToken()
        .then(displayToken)
        .catch(onError)
        .finally(()=>{
            randomString =  Math.random().toString();
        })
        
    })

    it('Validate response status from PostOrderId API', ()=>{
        getToken()
        .then(postOrderId)
        .then(checkResponseStatus)
        .catch(onError)
    })

    it('postOrderId API, is order created assertion', ()=>{

        getToken()
        .then(postOrderId)
        .then(isOrderCreated)
        .catch(onError)

})

it('POST a book order using authToken and validates if orderId has expected length.', ()=>{

        getToken()
        .then(postOrderId)
        .then(checkOrderIdLength)
        .catch(onError)

})

})