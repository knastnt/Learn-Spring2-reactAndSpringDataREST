

// Определяем компонент
Vue.component('user-table', {
    props: ['userlist'],
    template: '<table class="table">\
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
                </table>'
})


var vm = new Vue({
    el: '#vue-main-div',
    data: {
        userlist: [],
        userlisterror: '',
        showModal: false,

        perPage: 3,
        currentPage: 1,
        items: [
            { id: 1, first_name: 'Fred', last_name: 'Flintstone' },
            { id: 2, first_name: 'Wilma', last_name: 'Flintstone' },
            { id: 3, first_name: 'Barney', last_name: 'Rubble' },
            { id: 4, first_name: 'Betty', last_name: 'Rubble' },
            { id: 5, first_name: 'Pebbles', last_name: 'Flintstone' },
            { id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble' },
            { id: 7, first_name: 'The Great', last_name: 'Gazzoo' },
            { id: 8, first_name: 'Rockhead', last_name: 'Slate' },
            { id: 1, first_name: 'Fred', last_name: 'Flintstone' },
            { id: 2, first_name: 'Wilma', last_name: 'Flintstone' },
            { id: 3, first_name: 'Barney', last_name: 'Rubble' },
            { id: 4, first_name: 'Betty', last_name: 'Rubble' },
            { id: 5, first_name: 'Pebbles', last_name: 'Flintstone' },
            { id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble' },
            { id: 7, first_name: 'The Great', last_name: 'Gazzoo' },
            { id: 8, first_name: 'Rockhead', last_name: 'Slate' },
            { id: 1, first_name: 'Fred', last_name: 'Flintstone' },
            { id: 2, first_name: 'Wilma', last_name: 'Flintstone' },
            { id: 3, first_name: 'Barney', last_name: 'Rubble' },
            { id: 4, first_name: 'Betty', last_name: 'Rubble' },
            { id: 5, first_name: 'Pebbles', last_name: 'Flintstone' },
            { id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble' },
            { id: 7, first_name: 'The Great', last_name: 'Gazzoo' },
            { id: 8, first_name: 'Rockhead', last_name: 'Slate' },
            { id: 1, first_name: 'Fred', last_name: 'Flintstone' },
            { id: 2, first_name: 'Wilma', last_name: 'Flintstone' },
            { id: 3, first_name: 'Barney', last_name: 'Rubble' },
            { id: 4, first_name: 'Betty', last_name: 'Rubble' },
            { id: 5, first_name: 'Pebbles', last_name: 'Flintstone' },
            { id: 6, first_name: 'Bamm Bamm', last_name: 'Rubble' },
            { id: 7, first_name: 'The Great', last_name: 'Gazzoo' },
            { id: 8, first_name: 'Rockhead', last_name: 'Slate' },
            { id: 9, first_name: 'Pearl', last_name: 'Slaghoople' }
        ],

        form: {
            firstName: '',
            lastName: '',
            description: ''
        },

        navvalue: 3,
        navnop: 12
    },
    created: function () { // хук жизненного цикла https://ru.vuejs.org/v2/guide/instance.html
        this.loadEmployers(1, 1)
    },
    methods: { //методы
        navinp: function(page){
          console.log(page)
            this.loadEmployers(page,1)
        },
        linkGen(page){
            return ''
            //return page  === 1 ? '?' : '?page=${page}'
        },
        loadEmployers: function (page, size) {
            page=page-1
            var data = { 'page': page, 'size': size }
            //if(page<2){ delete data.page }
            var querystring = (new URLSearchParams(data)).toString()

            var vm = this
            axios.get('/api/employees?' + querystring)
                .then(function (response) {
                    vm.userlist = response.data._embedded.employees
                    vm.navnop = response.data.page.totalPages
                    vm.navvalue = response.data.page.number+1
                })
                .catch(function (error) {
                    vm.userlist = {}
                    vm.userlisterror = 'Ошибка! ' + JSON.stringify(error)
                })
        },
        submitCreateUserForm : function(form){
            //закрываем модальное окно
            this.$bvModal.hide('modal-1')
            
            vm.userlisterror = 'created! ' + JSON.stringify(form)

            //очищаем поля для следующего вызова
            for (var key in form) {
              form[key] = ''
            }
        }
    },
    computed: {
        rows() {
            return this.items.length
        }
    }
})
