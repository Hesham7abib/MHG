import React, { useState } from 'react';
import { ScrollView, Text, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { w, h, moderateScale } from '../../Dimenstions/Metrices.js';
import styles from './Styles';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CostReport = () => {
  const widthAndHeight = 200;
  const label = ['Aswan', 'Qena', 'Nubaria', 'Beliana', 'Fashn'];
  const series = [123, 321, 123, 789, 537];
  const sliceColor = ['#fbd203', '#ffb300', '#ff9100', '#ff6c00', '#ff3c00'];


  const Aswan = series[0];
  const Qena = series[1];
  const Nubaria = series[2];
  const Beliana = series[3];
  const Fashn = series[4];

  const tableHead = ['Project', 'Earned Value', 'Percentage'];

  // Split the label array into two separate arrays for Project1 and Project2
  const project1Label = [label[0]];
  const project2Label = [label[1]];
  const project3Label = [label[2]];
  const project4Label = [label[3]];
  const project5Label = [label[4]];

  const tableTitle = [...project1Label, ...project2Label, ...project3Label, ...project4Label, ...project5Label];

  const tableData = [
    [Aswan.toString(), '10%'],
    [Qena.toString(), '5%'],
    [Nubaria.toString(), '4%'],
    [Beliana.toString(), '3%'],
    [Fashn.toString(), '2%'],
  ];

  // State to manage the visibility of the table under Earned Value chart
  const [tableVisible, setTableVisible] = useState(false);

  // Function to toggle the visibility of the table under Earned Value chart
  const toggleTableVisibility = () => {
    setTableVisible((prevVisible) => !prevVisible);
  };

  // State to manage the visibility of the table under Doughnut chart
  const [doughnutTableVisible, setDoughnutTableVisible] = useState(false);

  // Function to toggle the visibility of the table under Doughnut chart
  const toggleDoughnutTableVisibility = () => {
    setDoughnutTableVisible((prevVisible) => !prevVisible);
  };

  const ToggleButton = ({ visible, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.toggleButton}>
      {visible ? (
        <>
          <MaterialCommunityIcons
            name="menu-down-outline"
            size={24}
            color="#64CCC5"
          />
          <Text style={styles.toggleButtonText}>Hide Table</Text>
        </>
      ) : (
        <>
          <MaterialCommunityIcons
            name="menu-right-outline"
            size={24}
            color="#64CCC5"
          />
          <Text style={styles.toggleButtonText}>Show Results in Table</Text>
        </>
      )}
    </TouchableOpacity>
  );

  // Calculate the total sum of series values for percentage calculation
  const totalSum = series.reduce((acc, value) => acc + value, 0);

  const ColorLegend = ({ labels, colors }) => {
    return (
      <View style={styles.colorLegendContainer}>
        {labels.map((label, index) => (
          <View key={label} style={styles.colorLegendItem}>
            <View style={[styles.colorIndicator, { backgroundColor: colors[index % colors.length] }]} />
            <Text style={styles.colorLegendLabel}>{label}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ImageBackground
      style={styles.Background}
      source={{
        uri: 'https://i.postimg.cc/6qYTQ48D/asdasd.jpg',
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={styles.Logo}
          source={{ uri: 'https://i.postimg.cc/hvNbWJqn/MHG-logo.png' }}
        />
      </View>
      <Text style={styles.Header}>Pie Chart</Text>
      <Text style={styles.subtitle}>* Data Below Total For All Projects </Text>

      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Earned Value</Text>
          <PieChart 
          widthAndHeight={widthAndHeight} 
          series={series} 
          sliceColor={sliceColor} 
          valueDisplayMode="onSlice"
          
          />

          {/* Color legend for the Earned Value pie chart */}
          <ColorLegend labels={label} colors={sliceColor} />
        </View>

        {/* Toggle button to show/hide the Earned Value table */}
        <View style={styles.toggleButtonContainer}>
          <ToggleButton visible={tableVisible} onPress={toggleTableVisibility} />
        </View>

        {/* Conditionally render the Earned Value table based on tableVisible state */}
        {tableVisible && (
          <View style={styles.Tablecontainer}>
            <Table borderStyle={{ borderWidth: 1 }}>
              <Row data={tableHead} flexArr={[0.7, 1, 1]} style={styles.head} textStyle={styles.Tabletext} />
              <TableWrapper style={styles.wrapper}>
                <Col data={tableTitle} style={styles.Tabletitle} heightArr={[28, 28]} textStyle={styles.Tabletext} />
                <Rows data={tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.TextColumn} />
              </TableWrapper>
            </Table>
          </View>
        )}

        <View style={styles.container}>
          <Text style={styles.title}>Doughnut</Text>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
            coverRadius={0.6}
            coverFill={'#FFF'}
          />
          {/* Toggle button to show/hide the Doughnut chart table */}
          <View style={styles.toggleButtonContainer}>
            <ToggleButton visible={doughnutTableVisible} onPress={toggleDoughnutTableVisibility} />
          </View>
        </View>

        {/* Conditionally render the Doughnut chart table based on doughnutTableVisible state */}
        {doughnutTableVisible && (
          <View style={styles.Tablecontainer}>
            <Table borderStyle={{ borderWidth: 1 }}>
              <Row data={tableHead} flexArr={[0.7, 1, 1]} style={styles.head} textStyle={styles.Tabletext} />
              <TableWrapper style={styles.wrapper}>
                <Col data={tableTitle} style={styles.Tabletitle} heightArr={[28, 28]} textStyle={styles.Tabletext} />
                <Rows data={tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.TextColumn} />
              </TableWrapper>
            </Table>
          </View>
        )}

      </ScrollView>
    </ImageBackground>
  );
};

export { CostReport };
