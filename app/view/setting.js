/**
 * home page
 */
'use strict'

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ListView,
  TouchableOpacity,
  Animated
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Tabbar from 'react-native-tabbar';

export default class SettingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  componentWillUnMount() {

  }

  // get data from server
  _fetchData() {
    var data = [
      "账号名称",
      "修改密码",
      "退出登录"
    ];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(data),
    })
  }

  renderRow(rowData){
    return (<Text>{rowData}</Text>);
  }

  onTabSelect(tab){
    if(tab === 'home'){
      this.props.navigator.push({id: 'home'});
    }else if(tab === 'setting'){
      this.props.navigator.push({id: 'setting'});
    }
  }

  renderTabs(){
    return (
        <View style={{ flex: 1, flexDirection: 'row', borderTopWidth: 1, borderTopColor: 'blue' }}>
        <TouchableOpacity style={styles.tabItem} onPress={() => this.onTabSelect('home')}>
          <View>
            <Text>首页</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}  onPress={() => this.onTabSelect('setting')}>
          <View>
            <Text>设置</Text>
          </View>
        </TouchableOpacity>
      </View>
      )
  }

  render() {
    return (
      <View style={{ flex: 1, }}>
        <NavigationBar
          title={{title:'个人设置'}}
          style={styles.topNav}
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}
        />
        <Tabbar show={true}
                disable={false}
                ref={(ref) => this.tabarRef = ref}
                style={{ backgroundColor: 'green' }}>
          {this.renderTabs()}
        </Tabbar>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  tabItem:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})