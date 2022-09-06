
/**
 * 
 * @param {Array} menuList 
 * @param {Array} routes 
 */
const recursionRoutes = (menuList, routes) => {
    // console.log("menuList", menuList)
    // console.log("routes", routes)
    let userMenu = []; //存储计算结果
    menuList.forEach(menu => {
        routes.forEach(route => {
            if (menu.title === route.meta.title) {
                if (menu.children && menu.children.length) {
                    route.children = recursionRoutes(menu.children, route.children)
                }
                userMenu.push(route)
            }
        })
    })
    // console.log(userMenu)
    return userMenu
}
export default recursionRoutes