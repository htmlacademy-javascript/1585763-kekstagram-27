const SERVER = 'https://27.javascript.pages.academy';

const loaderPhotos = (onSuccess, onError) =>
  fetch(`${SERVER}/kekstagram/data`)
    .then((response) => response.json())
    .then(onSuccess)
    .catch(onError);

const uploadPhoto = (formData, onSuccess, onError) =>
  fetch(`${SERVER}/kekstagram`, {
    method: 'POST',
    body: formData,
  }).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onError();
    }
  }).catch(onError);
export {loaderPhotos, uploadPhoto};
