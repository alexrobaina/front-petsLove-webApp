import { useCallback, useRef, useEffect, useState } from 'react';
import c from 'classnames';
import { Tooltip } from '@mui/material';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdCancel } from 'react-icons/md';
import styles from './inputUploadImage.module.scss';

const InputUploadImage = ({
  setFieldValue,
  oldImage,
  marginTop,
  marginBottom,
  inputName,
}: any) => {
  const [previewImage, setPreviewImage] = useState<any>([]);
  const [newPreviewsImage] = useState<any>([]);
  const fileUpload: any = useRef();

  const handleChangeImage = useCallback((e) => {
    e.preventDefault();
    const fileList = Array.from(e.target.files);

    const mappedFiles = fileList.map((file: any) => ({
      ...file,
      preview: URL.createObjectURL(file),
      imageName: file,
    }));
    setPreviewImage(mappedFiles);

    setFieldValue('images', e.target.files);
  }, []);

  const removePreviewImage = useCallback(
    (image: any) => {
      console.log(image);

      console.log(previewImage);

      const imagePreview = previewImage.filter((preview: any) => {
        return preview.preview !== image.preview;
      });
      setPreviewImage(imagePreview);
      // this.imageService.deleteImage(image)
    },
    [previewImage],
  );

  const removeNewPreviewImage = useCallback((image) => {
    console.log(image);
  }, []);

  const onClickFileUpload = useCallback(() => {
    fileUpload.current.click();
  }, []);

  useEffect(() => {
    // if (oldImage.length > 0 && inputUploadImageStore.previewImage.length === 0) {
    //   inputUploadImageStore.setPreviewsImage(oldImage)
  }, [oldImage]);

  return (
    <div>
      <div className={styles.containerImagePreview}>
        {previewImage &&
          previewImage.map((image: any) => {
            return (
              <div key={image} className={styles.containerImage}>
                <img
                  alt="pets"
                  className={styles.imagePreview}
                  src={image.preview}
                  // src={image ? `${AWS_STORAGE}/${PET_BUCKET}/${image}` : noImage}
                />
                <Tooltip title="deleteImage">
                  <div className={styles.middle}>
                    <div
                      onClick={() => removePreviewImage(image)}
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
                    onClick={() => removeNewPreviewImage(image)}
                    className={styles.containerIcon}
                  >
                    <MdCancel className={styles.iconImage} size={20} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {true && (
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
            {/* <span>{t('addFile')}</span> */}
            <span>addFile</span>
          </label>
        </div>
      )}
    </div>
  );
};

export default InputUploadImage;
