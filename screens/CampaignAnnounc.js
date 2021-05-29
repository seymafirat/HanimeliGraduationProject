import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import Announcement from './Announcement';
import Campaign from './Campaign';

export default class CampaignAnnounc extends Component {
  render() {
    return (
      <ScrollableTabView
        style={{marginTop: 5}}
        initialPage={0}
        //tabBarActiveTextColor="#009387"
        //tabBarInactiveTextColor="#808080"
        renderTabBar={() => <ScrollableTabBar />}>
        <Campaign tabLabel="KAMPANYALAR" />
        <Announcement tabLabel="DUYURULAR" />
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({});
