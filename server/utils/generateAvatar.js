const { createCanvas } = require('canvas');

const generateAvatar = (name, width = 200, height = 200) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  const firstLetter = name.charAt(0).toUpperCase();

  const gradient = ctx.createLinearGradient(0, 0, width, height); 
  gradient.addColorStop(0, getRandomColor());
  gradient.addColorStop(1, getRandomColor());

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height); 

  ctx.font = `bold ${Math.floor(width / 2)}px Arial`;
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.fillText(firstLetter, width / 2, height / 2);
 
  return canvas.toBuffer('image/png');
} 


function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


module.exports = generateAvatar;
