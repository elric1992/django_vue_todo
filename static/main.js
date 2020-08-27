function sendRequest(url, method, data) {
    var r = axios({
        method: method,
        url: url,
        data: data,
        xsrfCookieName: 'csrftoken',
        xcrfHeaderName: 'X-CSRFToken',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    return r
}

var app = new Vue({
    el: '#app',
    data: {
        task: '',
        tasks: [
            { title: 'one' }, 
            { title: 'two' }
        ],
    },
    created() {
        var vm = this;
        sendRequest('', 'get')
            .then(function(response) {
                vm.tasks = response.data.tasks;
            })
    },
    methods: {
        createTask() {
            var vm = this;
            var formData = new FormData();
            formData.append('title', vm.task);
            sendRequest('', 'post', formData)
                .then(function(response) {
                    vm.tasks.push(response.data.task);
                    vm.task = '';
                })
        },
        completeTask(id, index) {
            var vm = this;
            sendRequest('' + id + '/complete/', 'post')
                .then(function(response) {
                    vm.tasks.splice(index, 1);
                    vm.tasks.push(response.data.task);
                })
        }
    }
})
