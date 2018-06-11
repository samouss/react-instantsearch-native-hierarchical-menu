import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  InstantSearch,
  connectHierarchicalMenu,
} from 'react-instantsearch-native';

const Menu = ({ items, refine }) => (
  <View>
    {items.map(item => (
      <View key={item.label}>
        <TouchableOpacity onPress={() => refine(item.value)}>
          <Text style={{ fontWeight: item.isRefined ? 'bold' : 'normal' }}>
            {item.label} ({item.count})
          </Text>
        </TouchableOpacity>

        {item.items && (
          <View style={{ marginLeft: 25 }}>
            {item.items.map(nest => (
              <View key={nest.label}>
                <TouchableOpacity onPress={() => refine(nest.value)}>
                  <Text
                    style={{ fontWeight: nest.isRefined ? 'bold' : 'normal' }}
                  >
                    {nest.label} ({nest.count})
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>
    ))}
  </View>
);

const ConnectedHierarchicalMenu = connectHierarchicalMenu(Menu);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <InstantSearch
          appId="DGZW8B2ESG"
          apiKey="c422522bd6b85de6527a1cdaa0ea1e57"
          indexName="dev_locations"
        >
          <ConnectedHierarchicalMenu attributes={['area', 'district']} />
        </InstantSearch>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
