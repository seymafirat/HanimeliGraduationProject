import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
//import colors from 'res/colors';
import ReadMore from 'react-native-read-more-text';

const PostDescription = ({post}) => {
  <Text>hello</Text>;

  return (
    <View style={styles.container}>
      <ReadMore
        numberOfLines={2}
        renderTruncatedFooter={this.renderTruncatedFooter}
        renderRevealedFooter={this.renderRevealedFooter}>
        <Text style={styles.username}>{post.username}</Text>
        <Text style={styles.text}>{' ' + post.text}</Text>
      </ReadMore>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    paddingStart: 20,
    paddingEnd: 20,
  },
  username: {
    color: 'black',
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
  },
  readMoreText: {
    color: 'black',
    marginTop: 5,
  },
});

export default PostDescription;
