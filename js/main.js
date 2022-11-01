import './util.js';
import './render-posts.js';
import './render-fullsize-photo.js';
import'./data.js';
import {renderFullSizePhoto} from './render-fullsize-photo.js';
import {randomPosts} from './render-posts.js';

renderFullSizePhoto(randomPosts[1]);
