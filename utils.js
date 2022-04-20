export function numFormatter(num) {
  if(num > 999 && num < 1000000){
      return (num/1000).toFixed(2) + 'K'; // convert to K for number from > 1000 < 1 million 
  }else if(num > 1000000){
      return (num/1000000).toFixed(2) + 'M'; // convert to M for number from > 1 million 
  }else if(num < 900){
      return num; // if value < 1000, nothing to do
  }
}

export const RANDOM_IMAGES = [
  'https://i.ibb.co/h9Kc5Xh/pexels-andy-kuzma-3070970.jpg',
  'https://i.ibb.co/vBLCTLy/pexels-daria-shevtsova-1095550.jpg',
  'https://i.ibb.co/gRWp5jg/pexels-lisa-fotios-1279330.jpg',
  'https://www.linkpicture.com/q/panipuri_gupchup_indian_food.jpg',
];

export const getRandomImages = () => {
  const randomIndex = Math.floor(Math.random() * RANDOM_IMAGES.length);
  return RANDOM_IMAGES[randomIndex];
};