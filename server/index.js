import app from './server.js';
import { setMode } from './mode.js'; 

const mode = process.env.NODE_ENV || 'development';
setMode(mode);

console.log(`Server starting in ${mode} mode`);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});