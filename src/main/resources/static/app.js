let stompClient = null;

var vm = new Vue({
    el: '#vue-main-div',
    data: {
        userlist: [],
        userlisterror: '',
        showModal: false,


        form: {
            // _csrf: '',
            firstName: '',
            lastName: '',
            description: ''
        },
        formTypeEdit: false,

        navPage: 1,
        navPageCount: 1,
        navPageSize: 2,
        navSizeOptions: [
            { value: 1, text: '1' },
            { value: 2, text: '2' },
            { value: 4, text: '4' },
        ],

        tableFields: [
            'firstName',
            'lastName',
            'description',
            { key: 'changeColumn', label: 'Change' }
        ],

        currentEditedEmployeer: null,

    },
    mounted: function () {
        this.$nextTick(function () {
            let socket = new SockJS('/payroll');
            stompClient = Stomp.over(socket);
            stompClient.connect({}, function (frame) {
                console.log('Connected: ' + frame);

                stompClient.subscribe('/topic/newEmployee', function (val) {
                    console.log(val);
                    //console.log(JSON.parse(val.body));
                    // vm.list1 = JSON.parse(val.body);
                    vm.loadEmployers();
                });

                stompClient.subscribe('/topic/deleteEmployee', function (val) {
                    vm.loadEmployers();
                });

                stompClient.subscribe('/topic/updateEmployee', function (val) {
                    vm.loadEmployers();
                });
            });

            // let socket2 = new SockJS('/payroll');
            // stompClient2 = Stomp.over(socket2);
            // stompClient2.connect({}, function (frame) {
            //     console.log('Connected: ' + frame);
            //
            //     stompClient2.subscribe('/stock/price-fast', function (val) {
            //         console.log(val);
            //         console.log(JSON.parse(val.body));
            //         vm.list2 = JSON.parse(val.body);
            //     });
            // });
        });
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

            // form._csrf = vm.$refs.csrfToken.value

            vm.userlisterror = 'created! ' + JSON.stringify(form)
            // axios.post('/api/employees', form, {
            //     headers: { "upgrade-insecure-requests": "1" }
            // })
            axios({
                url: '/api/employees',
                method: 'post',
                data: form,
                // headers: {
                //     "content-type": "application/json",
                //     "Accept": "application/hal+json"
                // }
            })
                .then(function (response) {
                    // vm.userlist.push(response.data)
                    // console.log(response);
                    vm.loadEmployers()
                })
                .catch(function (error) {
                    vm.userlisterror = 'Ошибка! ' + JSON.stringify(error)
                })
        },
        submitEditUserForm : function(form){
            //закрываем модальное окно
            this.$bvModal.hide('modal-1')

            // form._csrf = vm.$refs.csrfToken.value

            vm.userlisterror = 'edited! ' + JSON.stringify(form)

            axios({
                url: vm.currentEditedEmployeer._links.self.href,
                method: 'put',
                data: vm.form,
                headers: {
                    'If-Match': vm.currentEditedEmployeer.ETag
                }
            })
                .then(function (response) {
                    // vm.userlist.push(response.data)
                    // console.log(response);
                    vm.loadEmployers()
                })
                .catch(function (error) {
                    if (error.status === 412) {
                        vm.userlisterror = 'Ошибка! Данный работник уже кем-то изменён, сохранение не возможно. Попробуйте снова' + JSON.stringify(error)
                    }else{
                        vm.userlisterror = 'Ошибка! ' + JSON.stringify(error)
                    }

                })
        },
        openCreateUserForm : function(form){
            var vm = this

            vm.formTypeEdit = false

            //очищаем поля
            for (var key in vm.form) {
                vm.form[key] = ''
            }

            //открываем модальное окно
            vm.$bvModal.show('modal-1')
        },
        deleteEmp: function (url) {
            // console.log(url)
            axios({
                url: url,
                method: 'delete'
            })
                .then(function (response) {
                    vm.loadEmployers()
                })
                .catch(function (error) {
                    vm.userlisterror = 'Ошибка! ' + JSON.stringify(error)
                })
        },
        editEmp: function (url) {
            var vm = this

            console.log(url)
            // axios({
            //     url: url,
            //     method: 'delete'
            // })
            //     .then(function (response) {
            //         vm.loadEmployers()
            //     })
            //     .catch(function (error) {
            //         vm.userlisterror = 'Ошибка! ' + JSON.stringify(error)
            //     })


            //Получаем объект работника из API
            axios({
                url: url,
                method: 'get'
            })
                .then(function (response) {
                    vm.formTypeEdit = true

                    vm.currentEditedEmployeer = response.data
                    vm.currentEditedEmployeer.ETag = response.headers.etag
                    // vm.userlist.push(response.data)
                    console.log(JSON.stringify(vm.currentEditedEmployeer));
                    //vm.loadEmployers()
                    vm.form.firstName = vm.currentEditedEmployeer.firstName
                    vm.form.lastName = vm.currentEditedEmployeer.lastName
                    vm.form.description = vm.currentEditedEmployeer.description
                    //открываем модальное окно
                    vm.$bvModal.show('modal-1')

                })
                .catch(function (error) {
                    vm.userlisterror = 'Ошибка! ' + JSON.stringify(error)
                })
        },
    }
})
