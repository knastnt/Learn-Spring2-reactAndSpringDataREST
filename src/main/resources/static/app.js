

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
        },
        createEmployer: function (form) {
            this.show = false
            vm.userlisterror = 'Создано! ' + JSON.stringify(form)
        },
        submitCreateUserForm : function(form){
            vm.userlisterror = 'test'
            this.$refs.createUserForm.submit()
            createEmployer(form);
        }
    },
    computed: {
        rows() {
            return this.items.length
        }
    }
})
