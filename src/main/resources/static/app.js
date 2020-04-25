var vm = new Vue({
    el: '#vue-main-div',
    data: {
        userlist: [],
        userlisterror: '',
        showModal: false,


        form: {
            _csrf: '',
            firstName: '',
            lastName: '',
            description: ''
        },

        navPage: 1,
        navPageCount: 1,
        navPageSize: 2,
        navSizeOptions: [
            { value: 1, text: '1' },
            { value: 2, text: '2' },
            { value: 4, text: '4' },
        ],

        tableFields: ['firstName', 'lastName', 'description'],

    },
    created: function () { // хук жизненного цикла https://ru.vuejs.org/v2/guide/instance.html
        this.loadEmployers()
    },
    methods: { //методы
        loadEmployers: function () {
            var vm = this

            var data = { 'page': vm.navPage-1, 'size': vm.navPageSize }
            var querystring = (new URLSearchParams(data)).toString()

            axios.get('/api/employees?' + querystring)
                .then(function (response) {
                    vm.userlist = response.data._embedded.employees

                    vm.navPage = response.data.page.number+1
                    vm.navPageCount = response.data.page.totalPages
                    vm.navPageSize = response.data.page.size

                    if (vm.navPageCount < vm.navPage) {vm.navPage = vm.navPageCount}
                })
                .catch(function (error) {
                    vm.userlist = {}
                    vm.userlisterror = 'Ошибка! ' + JSON.stringify(error)
                })
        },
        submitCreateUserForm : function(form){
            //закрываем модальное окно
            this.$bvModal.hide('modal-1')

            form._csrf = vm.$refs.csrfToken.value

            vm.userlisterror = 'created! ' + JSON.stringify(form)
            axios.post('/api/employees', form, {
                headers: { "upgrade-insecure-requests": "1" }
            })
                .then(function (response) {
                    //vm.userlist = response.data._embedded.employees
                    console.log(response);
                })
                .catch(function (error) {
                    vm.userlisterror = 'Ошибка! ' + JSON.stringify(error)
                })

            //очищаем поля для следующего вызова
            for (var key in form) {
              form[key] = ''
            }
        }
    }
})
