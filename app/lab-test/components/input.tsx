import React from 'react';
import Image from 'next/image';

interface InputProps {
  message: string;
  file: File | null;
  setMessage: (value: string) => void;
  setFile: (file: File | null) => void;
}

const Input: React.FC<InputProps> = ({ message, file, setMessage, setFile }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }

    e.target.value = '';
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <div className={`flex items-center bg-zinc-100 w-1/2 h-12 rounded-full px-4 py-2 relative ${file && "mt-12"}`}>
      {/* Attachment Icon with File Input */}
      <label className="text-black hover:bg-gray-300 cursor-pointer rounded-full" title="attach file">
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        {/* <FontAwesomeIcon className="w-6 h-6 px-1 py-1" icon={faPaperclip} /> */}
      </label>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Шинжилгээний үр дүнг оруулна уу?"
        value={message}
        disabled={file !== null}
        onChange={(e) => setMessage(e.target.value)}
        className={`flex-1 bg-transparent outline-none text-black placeholder-gray-500 ml-3 ${file && "cursor-not-allowed"}`}
      />

      {/* File Review */}
      {file && (
        <div className="absolute left-16 bottom-full mb-2 bg-zinc-100 text-black rounded-lg p-2 flex items-center shadow-md">
          {file.type.startsWith("image/") ? (
            <Image
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-12 h-12 rounded-lg object-cover mr-3"
            />
          ) : (
            <span className="mr-3">{file.name}</span>
          )}
          <button
            onClick={handleRemoveFile}
            className="text-red-400 hover:text-red-600"
          >
            {/* <FontAwesomeIcon icon={faTimes} className="h-5 w-5" /> */}
          </button>
        </div>
      )}
    </div>
  );
};

export default Input;