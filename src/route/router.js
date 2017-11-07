const Index = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/index/index.vue'))
    }, 'index')
}
// example
const Example = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/example/example.vue'))
    }, 'example')
}


export default [{
        name: 'index',
        meta: {
            title: 'index'
        },
        path: '/',
        component: Index
    },
    {
        name: 'example',
        meta: {
            title: 'example'
        },
        path: '/example',
        component: Example
    },
    {
        path: '*',
        redirect: '/'
    }
]
