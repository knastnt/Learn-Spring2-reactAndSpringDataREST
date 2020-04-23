

// Определяем компонент
Vue.component('user-table', {
    props: ['userlist'],
    template: '<table>\n' +
        '                <tbody>\n' +
        '                <tr>\n' +
        '                    <th>First Name</th>\n' +
        '                    <th>Last Name</th>\n' +
        '                    <th>Description</th>\n' +
        '                </tr>\n' +
        '                <tr v-for="user in userlist">\n' +
        '                    <td>{{user.firstName}}</td>\n' +
        '                    <td>{{user.lastName}}</td>\n' +
        '                    <td>{{user.description}}</td>\n' +
        '                </tr>\n' +
        '                </tbody>\n' +
        '            </table>'
})


var vm = new Vue({
    el: '#vue-main-div',
    data: {
        userlist: [],
        userlisterror: ''
    },
    created: function () { // хук жизненного цикла https://ru.vuejs.org/v2/guide/instance.html
        this.getAnswer()
    },
    methods: { //методы
        getAnswer: function () {
            var vm = this
            axios.get('/api/employees')
                .then(function (response) {
                    vm.userlist = response.data._embedded.employees
                })
                .catch(function (error) {
                    vm.userlist = {}
                    vm.userlisterror = 'Ошибка! ' + JSON.stringify(error)
                })
        }
    }
})
