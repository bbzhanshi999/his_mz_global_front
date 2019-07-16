import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {
            id: '',
            username:'',
            employee:{
                id:'',
                employeeName:'',
                phone:'',
                gender:'',
                age:0,
                employeeType:''
            }
        }
    },
    getters:{
        userInfo (state) {
            return state.userInfo;
        }
    },
    mutations: {
        //更新userInfo的数据（比如登陆成功后更新）
        updateUserInfo (state,userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {}
})
