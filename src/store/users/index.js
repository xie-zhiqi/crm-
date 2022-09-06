import storage from "@/utils/storage";
export default {
    namespaced: "users",
    state: {
        userInfo: storage.get("userInfo")
    },
    getters: {},
    mutations: {
        SET_USERINFO(state, payload) {
            state.userInfo = payload
        }
    },
    actions: {},
};
