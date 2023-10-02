describe('Books API suite', ()=>{

    // API variables
    let API_BOOKS_BASE_URL = Cypress.env('API_BOOKS_BASE_URL')
    let API_Orders = `${API_BOOKS_BASE_URL}/orders/`
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
            resolve([authToken,status,response])
        })

    })}

    function resetRandomString() {
        randomString =  Math.random().toString();
    }
    
    function displayToken(responseData){
        cy.log(`Token id: ${responseData[0]}`)
    }

    function displayOrderId(responseData){
        cy.log(`Your order ID is:${responseData[0]}`)
    }

    function checkResponseStatus(responseData,arrPosition,statusCode){
        cy.log(`API status code is: ${responseData[arrPosition]}`)
        expect(responseData[arrPosition]).to.eq(statusCode)
    }

    function testLength(responseData,arrPosition,length){
        expect(responseData[arrPosition]).to.have.lengthOf(length)
    }

    function getTokenOnError(err){
        cy.log(`Error found on getToken API: ${err}`)
    }

    function postOrderOnError(err){
        cy.log(`Error found on postOrderAPI: ${err}`)
    }

    function postOrder(){
            
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


    it('GET Token API. Test if it was created successfully and token length', ()=>{

        async function TokenAPI_ResponseValidation(){
            try {
                const result = await getToken()
                checkResponseStatus(result, 1, 201)
                displayToken(result)
                testLength(result, 0, 64)
            } catch{
                getTokenOnError()
            }finally{
                resetRandomString()
            }
        }
        TokenAPI_ResponseValidation()

    })

    it('POST order. Test if it was created successfully and order id length', ()=>{

        async function PostOrderAPI_ResponseValidation(){
            try {
                const result = await postOrder()
                checkResponseStatus(result, 1, 201)
                displayOrderId(result)
                testLength(result, 0, 21)

            }catch{
                postOrderOnError()

            }finally{
                resetRandomString()
            }
        }

        getToken()
        PostOrderAPI_ResponseValidation()
    })


})