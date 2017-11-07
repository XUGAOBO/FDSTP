const Index = resolve => {
    require.ensure([], () => {
        resolve(require('../pages/index/index.vue'))
    }, 'index')
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
        path: '*',
        redirect: '/'
    }
]
