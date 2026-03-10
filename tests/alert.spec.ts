import test from '@playwright/test'

//removed test.only method 

test("alert handling", async ({ page}) => {
    page.once ('dialog', alertType => {

        const type = alertType.type()
        console.log("Alert type is:", type)

        const message = alertType.message()
        console.log("Alert message is:", message)

        alertType.accept("")
    })

    await page.goto("https://www.leafground.com/alert.xhtml")
    await page.locator("//span[text()='Show']").first().click()
    await page.waitForTimeout(3000)
    await page.locator("(//span[text()='Show'])[2]").click()
})

test("confirmation handling", async ({ page}) => {
    page.on('dialog', confirmType => {
        const type = confirmType.type()
        console.log("Confirmation type is:", type)

        const message = confirmType.message()
        console.log("Confirmation message is:", message)

        if(type === 'confirm'){
            confirmType.accept()
        }else if (type === 'alert'){
            confirmType.accept()
        }else if (type === 'prompt'){
            confirmType.dismiss()
        }
    })

     await page.goto("https://www.leafground.com/alert.xhtml")
    await page.locator("//span[text()='Show']").first().click()
    await page.waitForTimeout(5000)
    await page.locator("(//span[text()='Show'])[2]").click()
    await page.waitForTimeout(5000)


})

test("Prompt handling", async ({ page}) => {
    page.on('dialog', promptType=> {
        const type = promptType.type()
        console.log("Prompt type is:", type)

        const message = promptType.message()
        console.log("Prompt message is:", message)

        if(type === 'confirm'){
            promptType.accept()
        }else if (type === 'alert'){
            promptType.accept()
        }else if (type === 'prompt'){
            promptType.accept("Playwright")
        }
        
        



    })

    await page.goto("https://www.leafground.com/alert.xhtml")
    await page.locator("//span[text()='Show']").first().click()
    await page.waitForTimeout(7000)
    await page.locator("(//span[text()='Show'])[2]").click()
    await page.waitForTimeout(7000)
    await page.locator("(//span[text()='Show'])[5]").click()
    await page.waitForTimeout(7000)

})

test("Sweet Alert handling", async ({ page}) => {
await page.goto("https://www.leafground.com/alert.xhtml")
await page.locator("(//span[@class='ui-button-text ui-c'])[3]").click()
await page.waitForTimeout(7000)
await page.getByRole('button', { name: 'Dismiss' }).click();


})

test ("confirmation sweet alert", async ({page}) =>{


await page.goto("https://www.leafground.com/alert.xhtml")
await page.locator("(//span[@class='ui-button-text ui-c'])[7]").click()
await page.waitForTimeout(7000)
await page.getByRole('button', { name: 'Yes' }).click();

})

test ("Minimize and Maximize handling", async ({page}) =>{
await page.goto("https://www.leafground.com/alert.xhtml")
await page.locator("(//span[@class='ui-button-text ui-c'])[8]").click()
await page.waitForTimeout(7000)
await page.locator("//span[@class='ui-icon ui-icon-minus']").click()
})
