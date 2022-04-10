import { useCallback, useRef, useEffect, useState } from 'react';
import c from 'classnames';
import { Tooltip } from '@mui/material';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';
import styles from './inputUploadImage.module.scss';

const InputUploadImage = ({
  marginTop,
  inputName,
  oldImages,
  marginBottom,
  setFieldValue,
  handleDeleteImages,
}: any) => {
  const [previewImage, setPreviewImage] = useState<any>(oldImages);
  const [newPreviewsImage, setNewPreviewsImage] = useState<any>([]);
  const fileUpload: any = useRef();

  const handleChangeImage = useCallback((e) => {
    e.preventDefault();
    const fileList = Array.from(e.target.files);

    const mappedFiles = fileList.map((file: any) => ({
      ...file,
      preview: URL.createObjectURL(file),
      imageName: file,
    }));
    setNewPreviewsImage(mappedFiles);

    setFieldValue('newImages', e.target.files);
  }, []);

  const removeNewPreviewImage = useCallback(
    (image: any) => {
      const imagePreview = newPreviewsImage.filter((preview: any) => {
        return preview.preview !== image;
      });
      setNewPreviewsImage(imagePreview);
    },
    [newPreviewsImage],
  );

  const removeOldImage = useCallback(
    (image) => {
      handleDeleteImages(image, oldImages);
    },
    [oldImages],
  );

  const onClickFileUpload = useCallback(() => {
    fileUpload.current.click();
  }, []);

  useEffect(() => {
    if (oldImages) {
      if (oldImages.length > 0 && previewImage.length === 0) {
        setPreviewImage(oldImages);
      }
    }
  }, [oldImages]);

  return (
    <div>
      <div className={styles.containerImagePreview}>
        {oldImages &&
          oldImages.map((image: any) => {
            return (
              <div key={image} className={styles.containerImage}>
                <img
                  alt="pets"
                  className={styles.imagePreview}
                  src={`${'https://petslove-bucket-2.s3.amazonaws.com/pets/'}${image}`}
                />
                <Tooltip title="deleteImage">
                  <div className={styles.middle}>
                    <div
                      onClick={() => removeOldImage(image)}
                      className={styles.containerIcon}
                    >
                      <MdCancel className={styles.iconImage} size={20} />
                    </div>
                  </div>
                </Tooltip>
              </div>
            );
          })}
        {newPreviewsImage &&
          newPreviewsImage.map((image: any) => {
            return (
              <div key={image.preview} className={styles.containerImage}>
                <img className={styles.imagePreview} src={image.preview} alt="pets" />
                <div className={styles.middle}>
                  <div
                    onClick={() => removeNewPreviewImage(image.preview)}
                    className={styles.containerIcon}
                  >
                    <MdCancel className={styles.iconImage} size={20} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div
        style={{ marginTop, marginBottom, width: '100%' }}
        className={styles.colInputImage}
      >
        <input
          multiple
          type="file"
          name={inputName}
          ref={fileUpload}
          className={styles.inputFile}
          onChange={handleChangeImage}
          placeholder="placeholderImages"
        />
        <label
          onClick={onClickFileUpload}
          className={c(styles.textInput, styles.btnTertiary)}
        >
          <AiOutlineCloudUpload className={styles.icon} size={18} />
          <span>addFile</span>
        </label>
      </div>
    </div>
  );
};

export default InputUploadImage;
