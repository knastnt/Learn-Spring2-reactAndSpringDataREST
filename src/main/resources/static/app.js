

// Определяем компонент
Vue.component('user-table', {
    props: ['userlist'],
    template: '<div>\
                <table class="table">\
                    <thead class="thead-light">\
                        <tr>\
                            <th>#</th>\
                            <th>First Name</th>\
                            <th>Last Name</th>\
                            <th>Description</th>\
                        </tr>\
                        </thead>\
                        <tbody>\
                        <tr v-for="(user, index) in userlist">\
                            <th scope="row">{{index}}</th>\
                            <td>{{user.firstName}}</td>\
                            <td>{{user.lastName}}</td>\
                            <td>{{user.description}}</td>\
                        </tr>\
                        </tbody>\
                </table>\
                <nav>\
                  <ul class="pagination pagination-sm">\
                    <li class="page-item disabled">\
                      <a class="page-link" href="#" tabindex="-1">Previous</a>\
                    </li>\
                    <li class="page-item"><a class="page-link" href="#">1</a></li>\
                    <li class="page-item"><a class="page-link" href="#">2</a></li>\
                    <li class="page-item"><a class="page-link" href="#">3</a></li>\
                    <li class="page-item">\
                      <a class="page-link" href="#">Next</a>\
                    </li>\
                  </ul>\
                </nav>\
               </div>'
})


var vm = new Vue({
    el: '#vue-main-div',
    data: {
        userlist: [],
        userlisterror: '',
        showModal: false
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
