import './util.js';
import './render-posts.js';
import { renderFullSizePhoto } from './render-fullsize-photo.js';
import'./data.js';
import './upload-photo-form.js';
import {randomPosts} from './render-posts.js';

renderFullSizePhoto(randomPosts[3]);
