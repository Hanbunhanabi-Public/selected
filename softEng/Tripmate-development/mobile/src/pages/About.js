import React, {Component} from 'react';
import styles from '../styles/Style';
import {View, Text, ScrollView} from 'react-native';
import {Card, CardItem} from 'native-base';

export default class About extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.homeHeader}>
          <Text style={styles.pageHeader}> About </Text>
        </View>
        <Card>
          <CardItem>
            <Text style={styles.BodyText}>Developed by Soft Eng 2 Group 3</Text>
          </CardItem>
        </Card>
      </ScrollView>
    );
  }
}
