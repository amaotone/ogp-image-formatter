window.onload = function () {
  'use strict';

  var cropper = window.Cropper;
  var URL = window.URL || window.webkitURL;
  var image = document.getElementById('preview');
  var aspect = 1200 / 630;
  var options = {
    aspectRatio: aspect,
    preview: '#preview',
    minContainerWidth: 600,
    minContainerHeight: 315,
    minCropBoxWidth: 600,
    minCropBoxHeight: 315,
    autoCropArea: 1,
    ready: function () {
      // adjust width
      if (image.naturalWidth > 1200) {
        cropper.zoomTo(1200 / image.naturalWidth);
        cropper.setCropBoxData({ width: 1200, height: 315 });
      } else if (image.width < 600) {
        cropper.zoomTo(600 / image.naturalWidth);
        cropper.setCropBoxData({ width: 600, height: 315 });
      }
      var cropBox = cropper.getCropBoxData();
      var left = (1200 - cropBox.width) / 2;
      var top = (800 - cropBox.height) / 2;
      cropper.setCropBoxData({ left: left, top: top })
      console.log(cropper.getImageData());
      console.log(cropper.getCropBoxData());
    },
    crop: function (e) {
      console.log(cropper.getCropBoxData());
    }
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
  button.onclick = function () {
    var link = document.createElement("a");
    var cropBox = cropper.getCropBoxData();
    link.href = cropper.getCroppedCanvas({
      width: cropBox.width,
      height: cropBox.height,
      minWidth: 600,
      minHeight: 315,
      maxWidth: 1200,
      maxHeight: 630,
      fillColor: '#ffffff',
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'high',
    }).toDataURL('image/jpeg');
    link.download = 'image.jpg';
    link.click();
  }
};