import puppeteer from 'puppeteer';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { Webhook } from 'webhook-discord';
import { timeout } from "./helpers";
dotenv.config();
checkForStock();

// (async () => {
//     console.log('hello');
//     const productID = 30042;
//     const axiosResponse = await axios.get('https://api.nvidia.partners/edge/product/search?page=1&limit=9&locale=en-us');

//     const products: any[] = axiosResponse.data?.searchedProducts?.productDetails;
//     if (products) {
//         const desiredProduct = products.find(product => product.productID === productID);
//         let isInStockNvidia = isInStockNvidiaa(desiredProduct);
//         let isInStockBestBuy = isInStockBestBuyy(desiredProduct);

//         while (isInStockBestBuy === false && isInStockNvidia === false) {
//             const productID = 30042;
//             const axiosResponse = await axios.get('https://api.nvidia.partners/edge/product/search?page=1&limit=9&locale=en-us');

//             const products: any[] = axiosResponse.data?.searchedProducts?.productDetails;
//             if (products) {
//                 const desiredProduct = products.find(product => product.productID === productID);
//                 isInStockNvidia = isInStockNvidiaa(desiredProduct);
//                 isInStockBestBuy = isInStockBestBuyy(desiredProduct);
//             }
//             else {
//                 console.log('No products found on Nvidia site');
//                 const myWebHook = new Webhook(process.env.myWebHookNotificationURL!);
//                 myWebHook.err('errorBot', 'Specified product not found');
//                 break;
//             }
//             await timeout(10000);
//         }

//         if (isInStockBestBuy) {
//             const myWebHook = new Webhook(process.env.jacob!);
//             myWebHook.info('bestBuyBot', '3080 in Stock!!--- https://www.bestbuy.com/site/nvidia-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card-titanium-and-black/6429440.p?skuId=6429440')


//         }
//         if (isInStockNvidia) {
//             const myWebHook = new Webhook(process.env.myWebHookNotificationURL!);
//             myWebHook.info('NvidiaBot', '3080 in Stock Go make sure to reload the page once!!--- https://www.nvidia.com/en-us/shop/geforce')
//         }
//     }
//     else {
//         console.log('No products found on Nvidia site');
//         const myWebHook = new Webhook(process.env.myWebHookNotificationURL!);
//         myWebHook.err('errorBot', 'Specified product not found');
//     }

// })();

async function checkForStock() {
    console.log('hello');
    const productID = 30042;
    const axiosResponse = await axios.get('https://api.nvidia.partners/edge/product/search?page=1&limit=9&locale=en-us');

    const products: any[] = axiosResponse.data?.searchedProducts?.productDetails;
    if (products) {
        const desiredProduct = products.find(product => product.productID === productID);
        let isInStockNvidia = isInStockNvidiaa(desiredProduct);
        let isInStockBestBuy = isInStockBestBuyy(desiredProduct);

        while (isInStockBestBuy === false && isInStockNvidia === false) {
            const productID = 30042;
            const axiosResponse = await axios.get('https://api.nvidia.partners/edge/product/search?page=1&limit=9&locale=en-us');

            const products: any[] = axiosResponse.data?.searchedProducts?.productDetails;
            if (products) {
                const desiredProduct = products.find(product => product.productID === productID);
                isInStockNvidia = isInStockNvidiaa(desiredProduct);
                isInStockBestBuy = isInStockBestBuyy(desiredProduct);
            }
            else {
                console.log('No products found on Nvidia site');
                const myWebHook = new Webhook(process.env.myWebHookNotificationURL!);
                myWebHook.err('errorBot', 'Specified product not found');
                break;
            }
            await timeout(10000);
        }

        if (isInStockBestBuy) {
            const myWebHook = new Webhook(process.env.jacob!);
            myWebHook.info('bestBuyBot', '3080 in Stock!!--- https://www.bestbuy.com/site/nvidia-geforce-rtx-3080-10gb-gddr6x-pci-express-4-0-graphics-card-titanium-and-black/6429440.p?skuId=6429440')


        }
        if (isInStockNvidia) {
            const myWebHook = new Webhook(process.env.myWebHookNotificationURL!);
            myWebHook.info('NvidiaBot', '3080 in Stock Go make sure to reload the page once!!--- https://www.nvidia.com/en-us/shop/geforce')
        }
    }
    else {
        console.log('No products found on Nvidia site');
        const myWebHook = new Webhook(process.env.myWebHookNotificationURL!);
        myWebHook.err('errorBot', 'Specified product not found');
    }
    await timeout(500);
    checkForStock();
}

function isInStockNvidiaa(desiredProduct) {
    const isInStockNvidia: boolean = desiredProduct.retailers[0].isAvailable;
    return isInStockNvidia;
}

function isInStockBestBuyy(desiredProduct) {
    const isInStockBestBuy: boolean = desiredProduct.retailers[1].isAvailable;
    return isInStockBestBuy;
}

// ( async ()  => {

//     const browser = await puppeteer.launch({
//         headless: false

//     });
//     const page = await browser.newPage();
//     await page.goto('https://www.nvidia.com/en-us/shop/geforce/gpu/?page=1&limit=9&locale=en-us&category=GPU&gpu=RTX%203080');


//     await browser.close();


// })();