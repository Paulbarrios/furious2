module.exports = {

    'secret': 'pqldifndhjsaof4d5s2d58d5e8d5ad',
    'BBDD' : 'furious',
    'usuarioBD' : process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'root',
    'passwordBD' : process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'root',
    'hostBD' :  process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
    'portBD'  :  process.env.OPENSHIFT_MYSQL_DB_PORT || 3306
};
