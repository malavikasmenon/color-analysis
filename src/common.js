export function doColorAnalysis (eyeColor, skinColor, hairColor) {
    console.log("I am here")
    console.log(eyeColor, skinColor, hairColor)
    // let skin_categories = {
    //   warm: (1, 2, 3),
    //   cool: (1, 2, 3),
    //   neutral: (1, 2, 3),
    //   olive: (1, 2, 3),
    // };
    // let eye_categories = {
    //   cool: (1, 2, 3),
    //   warm: (1, 2, 3),
    // };
    // let hair_categories = {
    //   cool: (1, 2, 3),
    //   warm: (1, 2, 3),
    //   grey: (1, 2, 3),
    // };
    // console.log(skin_categories, eye_categories, hair_categories);
    // seasonal_color_analysis(hairColor, skinColor, eyeColor)
}


// function determine_undertone(hue){
//     // Determine if a color is warm or cool based on hue.
//     // Define a range of warm and cool hues
//     if ((0 <= hue <= 50) | (330 <= hue <= 360)) {  // Reds, yellows (warm)
//         return 'warm'
//     }
//     else if (50 < hue <= 180) { // Greens, cyans (cool)
//         return 'cool'
//     }  
        
//     else if (180 < hue < 330){  // Blues, purples (cool)
//         return 'cool'
//     }
//     else {
//         return 'warm'
//     }
// }

// function determine_lightness_category(lightness){
//     // Classify lightness into light, medium, or dark.
//     if (lightness > 70){
//         return 'light'
//     }
//     else if (40 < lightness <= 70){
//         return 'medium'
//     }
//     else {
//         return 'dark'
//     }
// }

// function rgb_to_hsl(color){
//     return color
// }

// function seasonal_color_analysis(hair_rgb, skin_rgb, eye_rgb){

//     hair_l = rgb_to_hsl(hair_rgb)
//     skin_h = rgb_to_hsl(skin_rgb)
//     eye_l = rgb_to_hsl(eye_rgb)

//     // # Determine undertones
//     // hair_undertone = determine_undertone(hair_h)
//     skin_undertone = determine_undertone(skin_h)
//     // eye_undertone = determine_undertone(eye_h)

//     // # Determine lightness categories
//     hair_lightness = determine_lightness_category(hair_l)
//     // skin_lightness = determine_lightness_category(skin_l)
//     eye_lightness = determine_lightness_category(eye_l)

//     // # Seasonal decision based on undertones and lightness
//     if (skin_undertone == 'cool'){
//         if ((hair_lightness == 'light') & (eye_lightness == 'light')){
//             return 'Summer'
//         }
//         else if ((hair_lightness == 'dark') & (eye_lightness == 'dark')){
//             return 'Winter'
//         }
//         else if ((hair_lightness == 'light') & (eye_lightness == 'dark')){
//             if (skin_lightness == 'light'){
//                 return 'Winter'
//             }
//             else{
//                 return 'Summer'
//             }
//         }
//     }
//     else if (skin_undertone == 'warm'){
//         if (hair_lightness == 'light' & eye_lightness == 'light'){
//             return 'Spring'
//         }
//         else if (hair_lightness == 'dark' & eye_lightness == 'dark'){
//             return 'Autumn'
//         }
//         else if (hair_lightness == 'light' & eye_lightness == 'dark'){
//             if (skin_lightness == 'light'){
//                 return 'Spring' 
//             }
//             else {
//                 'Autumn'
//             }
//         }
//     }

//     // Default if no exact match
//     return 'Neutral'
// }