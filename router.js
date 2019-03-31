
const Router = require('koa-router');
const router = new Router();

const users = require('./db/users');

//Index page
router.get('/', async ctx=> {
    await ctx.render('users',{
        title: 'Список пользователей',
        users: users
    })
});
//Add page
router.get('/add', async ctx=> {
    await ctx.render('add_user')
});


router.post('/add',async ctx=>{
    const body = ctx.request.body
    const users_filt = users.filter((user)=> !!user)
    users.push({id:(users_filt[users_filt.length-1]||{id:-1}).id+1,name:body.name,age:body.age});
    ctx.redirect('/')
});

router.get('/del/:id',async ctx=>{
    const id = ctx.params.id;
    const user = Object.assign({},users[id])
    delete users[id];
    await ctx.render('delete_page',{
        title:'Пользователь ' + user.name +' с id : '+user.id+ ' был удален',
    })
})
router.get('/edit/:id',async ctx=>{
    const id = ctx.params.id;
    await ctx.render('edit_user',{
        title:'Edit user ',
        users:users,
        user_id: id
    })
});
router.post('/edit',async ctx=>{
    const body = ctx.request.body;
    console.log(body);
    users[body.id].name = body.name;
    users[body.id].age = body.age;
    ctx.redirect('/')
});
router.get('/user/:id',async ctx=>{
    const id = ctx.params.id;
    await ctx.render('show_user',{
        title:'User',
        users:users,
        user_id: id
    })
});
module.exports = router;
