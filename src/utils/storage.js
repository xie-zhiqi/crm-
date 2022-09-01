// 取需要转换为正常的对象
let get = (key, value) => {
    let res = localStorage.getItem(key);
    try {
        let result = JSON.parse(res)
        return result
    } catch (e) {
        console.log(e)
        return res
    }
}
let set = (key, value) => {
    // console.log(key, value)
    if (key && value) {
        // 吧value转换为json
        try {
            localStorage.setItem(key, JSON.stringify(value))
            // localStorage.setItem(key, json)
            // console.log(key,value)
        } catch (e) {
            console.error(e)
        }
    } else {
        console.error("key 和 value 必须传")
    }
}
export default {
    get,
    set
}

// export let storage = () => {
//     // 存需要转换为json

//     return {
//         set,
//         get
//     }
// }