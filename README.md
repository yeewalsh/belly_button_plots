# Plotting Belly Button Bacteria Data
Plotting data on belly button bacteria with javascript and plotly.

## Overview
In an attempt to find a good source of bacteria for use in alternative-meat products, bacteria was sampled from human belly buttons and analyzed to see the size and content of the bacteria samples. 

Bootstrap elements used for customization:
* Image applied to jumbotron
* Navigation bar used to jump to various charts
* Site optimzed for mobile devises

## Analysis
Visit the site at: https://yeewalsh.github.io/belly_button_plots/

Below the navigation bar, you can click the dropdown for "Test Subject ID No.:" to choose a different subject from the dataset. Review the "Demographic Info" to learn more about the individual's age, ethnicity, gender and location. 

The bar chart, "Top 10 Bacteria Cultures Found", shows the top 10 bacterias identified in the sample individual selected. The bacteria types are arranged in descending order and you can hover over them to see the sample size and names included. 

The "Belly Button Washing Frequency" gauge chart visualizes how frequent the selected test subject washes their belly button per week. 

The bubble chart "Bacteria Cultures Per Sample" illustrates the type of bacteria found and the sample size, exaggerated by size of the bubble. 

## Summary

This site provides a useful resource to the researchers in their quest to find good bacteria sources for their alernative-meat produts. Analysis would include clicking through the various subjects to see how prevelent different types of bacteria are, and if there are similar demographic instances for the subjects who exibit a bacteria sample of interest. 

Further analysis would be to review the number of scrubs per week compared to the sample sizes and types to see if the frequency of washing produces more or less varied bacteria samples. 

The bubble chart is only mapping 2 variables: UTO id number on the x-axis and color scheme, and sample size on the y-axis and bubble size. Since each variable is displayed twice, it negates the purpose of the bubble chart, even though it is pretty and fun to look at.
