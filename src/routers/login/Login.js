import React from 'react';
import {Redirect} from 'react-router-dom';
import {Form, Icon, Input, Button,message} from 'antd';

import {reqLogin} from '../../api/index';
import './login.less';
import logo from '../../static/images/logo.png';
import storageUtils from '../../utils/storageUtils';
import memoryUtils from '../../utils/memoryUtils';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = e => {
        //阻止事件的默认行为  提交
        e.preventDefault();

        //取出输入的相关数据
        //获取相关属性
        // const form = this.props.form;
        //获取数据值
        // const values = form.getFieldsValue();
        // const username = form.getFieldValue('username');
        // const userpass = form.getFieldValue('password');
        //对表单字段进行统一验证
        this.props.form.validateFields(async (err, values) => {
            const  {username,password} = values;
            if (!err) {
                // console.log(`发送AJAX请求username=${values.username},password=${values.password}`);
                const result =await reqLogin(username,password);
                //登陆成功
                if (result.status === 0){
                    const user = result.data;
                    //将user信息保存到local
                    storageUtils.saveUser(user);
                    //保存到内存中
                    memoryUtils.user = user;
                    //跳转到ADMIN界面
                    this.props.history.replace('/');
                    message.success('登陆成功');
                }else {//登陆失败
                    message.success('登陆失败');
                }
            }else {
                console.log('验证失败');
            }
        });
    };

    render() {
        //读取保存的user,如果存在直接跳转到管理界面
        const user = storageUtils.getUser();
        if (user._id){
            return <Redirect to={'/'}/>;
        }

        const {getFieldDecorator} = this.props.form;
        
        return (
            <div className='login'>
                <div className='login-header'>
                    <img src={logo}/>
                    <h1>React项目:后台管理系统</h1>
                </div>
                <div className='login-content'>
                    <h1>用户登录</h1>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username',{
                                initialValue:'',
                                //配置对象，属性名是特定的名称 对用户名进行验证
                                rules:[//声明式验证：使用插件已经定义好的规则进行验证
                                    {required:true,message:'用户是名必须'},
                                    {min:4,message:'用户名必须大于4位'},
                                    {max:12,message:'用户名必须小于12位'},
                                    {pattern:/^[a-zA-Z0-9_]+$/,message:'必须数字字母下划线'}]
                            })(<Input
                                    prefix={<Icon type="user"
                                                  style={{color: 'rgba(0,0,0,.5)'}}/>}
                                    placeholder="用户名"
                                />)}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password',{
                                initialValue:'',
                                rule: [{validator:this.validatorPwd}]
                            })( <Input
                                prefix={<Icon type="lock"
                                              style={{color: 'rgba(0,0,0,.5)'}}/>}
                                type="password"
                                placeholder="密码"
                            />)}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }

    //对密码进行验证
    validatorPwd = (rule, value, callback)=>{
           value = value.trim();
            if (!value){
                callback('密码必须输入');
            }else if (value.length<4){
                callback('密码不能小于4');
            }else if(value.length>12){
                callback('面膜不能大于12');
            }else if(!/^[A-Za-z0-9_]+$/.test(value)){
                callback('必须数字字母下划线');
            }else {
                callback('验证通过');
            }
    }
}


/*
* FORM组件：包含<FORM/>的组件
* 利用FORM.CREATE()包装FORM组件生成一个新组件
* 新组建会像FORM传递一个强大的属性：属性名form,属性值对象。
*    高阶函数:接收的参数是函数或者返回值是函数
*       常见的：数组的便利方法/定时器/Promise
*       作用：实现一个更强大，动态的功能
*    高阶组件:接收一个组件，返回一个新组件
*    FORM.CREATE传递的就是一个高阶组件
* */
const WrapperForm = Form.create()(Login);
export default WrapperForm;