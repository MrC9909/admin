import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {Layout} from 'antd';

//设置缓存
import memoryUtils from '../../utils/memoryUtils';
import LeftNav from "../../components/LeftNav/LeftNav";
import Header from "../../components/Header/Header";
import Home from "../home/Home";
import Category from "../category/Category";
import Product from "../product/Product";
import Role from "../role/Role";
import User from "../user/User";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";


const {Footer, Sider, Content} = Layout;
export default class Admin extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //读取保存的数据 user,如果不存在，自动跳转到登陆界面

        const user = memoryUtils.user;
        if (!user._id) {
            //事件函数中进行路由跳转
            // this.props.history.replace('/login');
            return <Redirect to={'/login'}/>
        }
        return (
            <Layout style={{height: '100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header/>
                    <Content style={{background: "#fff"}}>
                        <Switch>
                            <Route path={'/home'} component={Home}/>
                            <Route path={'/category'} component={Category}/>
                            <Route path={'/product'} component={Product}/>
                            <Route path={'/role'} component={Role}/>
                            <Route path={'/user'} component={User}/>
                            <Route path={'/charts/bar'} component={Bar}/>
                            <Route path={'/charts/line'} component={Line}/>
                            <Route path={'/charts/pie'} component={Pie}/>
                            <Redirect to={'/home'}/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center', color: 'rgba(0,0,0,.5)'}}>推介使用谷歌浏览器获取更佳的浏览器体验</Footer>
                </Layout>
            </Layout>
        );
    }

}