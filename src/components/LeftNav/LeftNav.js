import React from 'react';
import {Link} from 'react-router-dom';
import {Menu, Icon} from 'antd';

import logo from '../../static/images/logo.png';
import menuList from '../../config/menuConfig';

/*import css*/
import './nav.less';

//左侧导航组件
const {SubMenu} = Menu;
export default class LeftNav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'left-nav'}>
                <Link to={'/home'} className={'left-nav-link'}>
                    <img src={logo}/>
                    <h1>硅谷后台</h1>
                </Link>
                <Menu
                    defaultSelectedKeys={['/home']}
                    mode="inline"
                    theme="dark"
                >
                    {this.getMenuNodes(menuList)}
                </Menu>
            </div>
        );
    }

    //根据指定的menu数据生成ITEM和SUBMENU的数组
    getMenuNodes = (menuList) => {
        return menuList.map((item, key) => {
            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>);
            }
            return (
                <SubMenu
                    key={item.key}
                    title={
                        <span>
                    <Icon type={item.icon}/>
                    <span>{item.title}</span>
                    </span>
                    }
                >
                    {this.getMenuNodes(item.children)}
                </SubMenu>
            );
        });
    }

}