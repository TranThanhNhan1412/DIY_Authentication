function callbackExample(val, callback) {
    console.log("---")
    console.log("input: ", val);
    setTimeout(() => {
        console.log("in timeout")


        callback()
    }, 200)
    console.log("end")
    return "output callbackExample"
}

callbackExample('the first', function () {
    console.log("callback 1")

    callbackExample("the second", function () {
        console.log("callback 2")

        callbackExample("the third", function () {
            console.log("callback 3")

        })
    })
    return "output callback"

})


callbackExample("nested", (err, val) => {
    if (err) {
        console.log("err", err)
    } else {
        console.log('val', val)
    }
})


var promiseExample = new Promise(function (resolve, reject) {
    //  chỉ 1 trong 2
    resolve("resolve ")  // tương đương success -> chạy các hàm then
    reject("reject")    // tương đương error -> bỏ qua các hàm then, chạy hàm catch
})

promiseExample.then((val_1) => {
    // do somethings
    return "the first then"
}).then((val_2) => {
    // do somethings
    return "the seconde then"
}).then((val_3) => {
    // do somethings
    return "the third then"
}).catch((err) => {
    // do somethings

}).finally(() => {
    // do somethings
    // giống finally trong try -> catch
})

new Promise(function (resolve, reject) {
    resolve("resolve ")
}).then(() => {
    console.log("then 1")
    return new Promise((resolve_1, reject_1) => {
        setTimeout(() => {
            console.log("the first then (timeout 2000)  ");
            resolve_1("output of timeout 2000 ( 1st )")
        }, 2000);
    })

}).then(val2 => {
    console.log("then 2")
    return new Promise((resolve_2, reject_2) => {

        setTimeout(() => {
            console.log("the second then (timeout 1000) ", val2);
            resolve_2("output of timeout 1000 ( 2nd )")
        }, 1000);
    })

}).then(val3 => {
    console.log("then 3")

    return new Promise((resolve_3, reject_3) => {

        setTimeout(() => {
            console.log("the third then (timeout 3000)  ", val3);
            resolve_3("output of timeout 3000 ( 3rd )")
        }, 3000);
    })

}).then(val4 => {
    console.log("then 4")

    setTimeout(() => {
        console.log("the 4th then (timeout 500)  ", val4);
        return "output of timeout 500 ( 4th )"
    }, 500);
})



Promise.allSettled([
    new Promise(resolve => setTimeout(() => {
        console.log("Promise 1")
        resolve(1)
    }, 3000)), // 1
    new Promise((resolve, reject) => setTimeout(() => {
        console.log("Promise 2")
        reject(2)
    }, 2000)), // 2
    new Promise(resolve => setTimeout(() => {
        console.log("Promise 3")
        resolve(3)
    }, 1000))  // 3
]).then((val) => {
    console.log("result: ", val);
}).catch(err => {
    console.log("error: ", err);
    return "error"
})

Promise.race([
    new Promise(resolve => setTimeout(() => {
        console.log("Promise 1")
        resolve(1)
    }, 3000)), // 1
    new Promise((resolve, reject) => setTimeout(() => {
        console.log("Promise 2")
        reject(2)
    }, 2000)), // 2
    new Promise(resolve => setTimeout(() => {
        console.log("Promise 3")
        resolve(3)
    }, 1000))  // 3
]).then((val) => {
    console.log("result: ", val);
}).catch(err => {
    console.log("error: ", err);
    return "error"
})

Promise.resolve()
    .then(() => console.log("promise done!"))
    .then(() => console.log("code finished"));

async function f() {
    return 1;
}

const f = new Promise((function (resolve, reject) {
    resolve("resolve ")
}))

async function awaitExample() {
    try {


        let promise_1 = new Promise((resolve, reject) => {
            setTimeout(() => reject("reject 1 error!"), 2000)
        });

        let result = await promise_1;
        console.log("result 1st (2000s)", result, typeof (result));

        let promise_2 = new Promise((resolve2, reject2) => {
            setTimeout(() => resolve2("done!"), 1000)
        });

        let result2 = await promise_2;
        console.log("result 2nd (1000s)", result2, typeof (result2));


        let promise_3 = new Promise((resolve3, reject3) => {
            setTimeout(() => reject3("reject 3 error!"), 500)
        });

        let result3 = await promise_3;
        console.log("result 3rd (500s)", result3, typeof (result3));
    } catch (error) {
        console.log("error ", error);
    }
}

awaitExample();