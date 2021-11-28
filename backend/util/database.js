const {Sequelize} = require('sequelize')

const sequelize=new Sequelize('node-complete','root','Koshysugi18@',{
    dialect:'mysql',
    host: 'localhost'
})

module.exports=sequelize;