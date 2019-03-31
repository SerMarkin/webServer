const Koa = require('koa');
const json = require('koa-json');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
router = require('./router')

app.use(json());
app.use(bodyParser())
render(app,{
    root : path.join(__dirname,'views'),
    layout: 'layout',
    viewExt : 'html',
    cache:false,
    debug:false
});


app.use(router.routes()).use(router.allowedMethods());


app.listen('3000',()=>{console.log('Its work')});
