import React, { ChangeEvent, useState } from "react";
import { Form, Button } from 'react-bootstrap'

interface PhotoUploadProps {
  onFileSelect: (file: File) => void;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ onFileSelect }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = React.createRef<HTMLInputElement>();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      onFileSelect(file);
    }
  };

  const handleCancel = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="photo-upload">
      {!previewUrl && (
        <Button variant="primary" onClick={() => fileInputRef.current && fileInputRef.current.click()}>
          Upload File
        </Button>
      )}
      <Form.Group controlId="formFileSm" className="mb-3" style={{ display: 'none' }}>
        <Form.Control type="file" size="sm" onChange={handleFileChange} ref={fileInputRef} />
      </Form.Group>
      {previewUrl && (
        <>
          <img src={previewUrl} alt="Preview" width="100" />
          <Button variant="secondary" onClick={handleCancel} className="mt-2">
            Cancel
          </Button>
        </>
      )}
    </div>
  );
};

export default PhotoUpload;
