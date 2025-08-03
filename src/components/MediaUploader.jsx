
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../utils/cropImage';
import { useDispatch } from 'react-redux';
import { setBannerUrl } from '../features/eventCreationSlice';


const MediaUploader = ({  setStep }) => {
  const [mediaType, setMediaType] = useState('image');
  const [file, setFile] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

  const dispatch=useDispatch()

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile({
      raw: file,
      preview: URL.createObjectURL(file),
    });
    setCroppedImageUrl(null);
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropSave = async () => {
    const croppedImage = await getCroppedImg(file.preview, croppedAreaPixels);
    setCroppedImageUrl(croppedImage);
    dispatch(setBannerUrl(croppedImage))
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white border  rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Select Media Type:</label>
        <select
          value={mediaType}
          onChange={(e) => setMediaType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
      </div>

      <input
        type="file"
        accept={mediaType === 'image' ? 'image/*' : 'video/*'}
        onChange={handleMediaChange}
        className="block w-full mb-4 border border-gray-300 rounded p-2"
      />

      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setZoom(zoom + 0.5)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
        >
          +
        </button>
        <button
          onClick={() => zoom >= 1 && setZoom(zoom - 0.5)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
        >
          -
        </button>
        <span className="text-gray-600 font-semibold">Zoom: {zoom}</span>
      </div>

      {file && mediaType === 'image' && !croppedImageUrl && (
        <div>
          <div className="relative w-full h-56 mb-4">
            <Cropper
              image={file.preview}
              crop={crop}
              zoom={zoom}
              aspect={16 / 16}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <button
            onClick={handleCropSave}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            ✅ Save Cropped Image
          </button>
        </div>
      )}

      {file && mediaType === 'image' && croppedImageUrl && (
        <div className="mt-4  flex justify-center h-50">
          <img src={croppedImageUrl} alt="Cropped" className="rounded border-black h-full w-full max-w-xs" />
        </div>
      )}

      {file && mediaType === 'video' && (
        <div className="mt-4">
          <p className="font-medium text-gray-700 mb-2">Video Preview:</p>
          <video src={file.preview} controls className="rounded w-full max-w-md" />
        </div>
      )}

      {croppedImageUrl&&<button
        onClick={() => setStep(5)}
        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded"
      >
        Next
      </button>}
</div>
  );
};

export default MediaUploader;
