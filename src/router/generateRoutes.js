//项目的亮点 => 像nuxt一样可以自动进行配置

//项目的难点 => 扁平路由转换成树形

//require.context('路径','是否递归引入','正则') 一次导入多个模块


let files = require.context('@/pages', true, /\.vue$/)

// console.log(paths.keys())

//创建路由配置 

// {path:"",component:""}

let repeatRoutes = files.keys().map(path => {

    //通过正则,去掉index.vue或者去掉.vue的后缀

    let regExp = /(\/index\.vue|\.vue)$/

    //获取路径对应的每个.vue组件
    let currentComponent = files(path).default;
    //解构组件export default 导出的对象中添加的熟悉感
    let { meta, name, redirect } = currentComponent;

    path = path.substring(1).replace(regExp, '')
    // console.log(path)
    return {
        path: path ? path : '/pages',
        //重定向,name属性,meta路由元信息,
        meta: meta ?? {},
        name: name ?? path.substring(1).split('/').join('-').toLowerCase(),
        redirect: redirect ?? null,
        component: () => import("@/pages" + path)
    }
})

function convertTree(repeatRoutes) {
    repeatRoutes = [...repeatRoutes] //浅拷贝
    let treeRoutes = [];
    //先给数据添加id和pid
    repeatRoutes.forEach(route => {
        //将路径去掉第一个 / 转换成一个数组
        let routePathArr = route.path.substring(1).split('/')
        // console.log(routePathArr)
        //length为1的都是根节点
        //需要添加id和pid

        //正常添加id
        route.id = routePathArr.join('-')

        if (routePathArr.length > 1) {
            //浅拷贝routePathArr;
            let pathArr = [...routePathArr];
            pathArr.pop()
            let pid = pathArr.join("-")
            route.pid = pid;//添加父节点id
        }
    })


    //转换成树形数据

    repeatRoutes.forEach(route => {
        //将所有的路径都变成小写 目的是为了和菜单的高亮效果绑定
        route.path = route.path.toLowerCase()
        //单独对page404进行额外处理
        if (route.path === "/page404") {
            route.path = "*"
        }
        //父亲在哪里
        let parent = repeatRoutes.find(v => route.pid === v.id)
        if (parent) {
            if (!parent.children) {
                parent.children = []
            }
            // console.log(route.path)
            route.path = route.path.substring(1).split("/").pop()
            // console.log(route.path.substring(1).split("/"))
            parent.children.push(route)
        } else {
            treeRoutes.push(route)
        }
    })
    return treeRoutes
}

let res = convertTree(repeatRoutes)

// console.log(res)

export default [...res]