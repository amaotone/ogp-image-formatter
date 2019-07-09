window.onload = function () {
  'use strict';

  var cropper = window.Cropper;
  var URL = window.URL || window.webkitURL;
  var image = document.getElementById('preview');
  var options = {
    aspectRatio: 1200 / 630,
    cropBoxData: { width: 1200, height: 630 },
    preview: '#preview',
    minContainerWidth: 600,
    minContainerHeight: 315,
    minCropBoxWidth: 600,
    minCropBoxHeight: 315,
    autoCropArea: 1,
  }
  var cropper = new Cropper(image, options);

  var upload = document.getElementById('upload');
  upload.onchange = function () {
    var files = this.files;
    var file;
    if (files && files.length) {
      file = files[0];
      if (/^image\/\w+/.test(file.type)) {
        cropper.replace(URL.createObjectURL(file));
      } else {
        window.alert('Please choose an image file.');
      }
    }
  }

  var button = document.getElementById('download');
  button.onclick = function (event) {
    var link = document.createElement("a");
    link.href = cropper.getCroppedCanvas({
      minWidth: 600,
      minHeight: 315,
      maxWidth: 1200,
      maxHeight: 630,
      fillColor: '#ffffff'
    }).toDataURL('image/jpeg');
    link.download = 'image.jpg';
    link.click();
  }
};