/**
 * Created by Xushd on 2016/12/3.
 */
var mysql=require("mysql");
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog',
    port: 3306
});
var query=function(sql,callback){
    pool.getConnection(function(err,conn){
        if(err){
            callback(err,null,null);
        }else{
            conn.query(sql,function(qerr,vals,fields){
                //�ͷ�����
                conn.release();
                //�¼������ص�
                callback(qerr,vals,fields);
            });
        }
    });
};

module.exports=query;