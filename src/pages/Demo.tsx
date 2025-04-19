import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Demo = () => {
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<{
    input?: string;
    denoised?: string;
    segmented?: string;
  }>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isH5 = file.name.endsWith(".h5");
    const isImage = file.type.startsWith("image/");

    if (isH5) {
      setInputFile(file);
      setPreviewImage(null); // clear preview
    } else if (isImage) {
      setInputFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Please upload a valid .h5 or image file.");
      setInputFile(null);
      setPreviewImage(null);
    }
  };

  const handleSubmit = async () => {
    if (!inputFile) {
      toast.error("Please select a .h5 or image file.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", inputFile);

    try {
      const response = await fetch(
        "https://qrhs13ph-8080.inc1.devtunnels.ms/denoise/",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data?.denoised_image || data?.input_image || data?.segmented_image) {
        setImages({
          input: data.input_image
            ? `data:image/png;base64,${data.input_image}`
            : undefined,
          denoised: data.denoised_image
            ? `data:image/png;base64,${data.denoised_image}`
            : undefined,
          segmented: data.segmented_image
            ? `data:image/png;base64,${data.segmented_image}`
            : undefined,
        });

        toast.success("Images received and processed successfully.");
      } else {
        toast.error("Upload successful, but no images returned.");
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      toast.error("Error uploading file. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Seismic Model Upload: Denoising (.h5) or Image
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <label className="block w-full">
              <div className="bg-blue-900 text-white text-center py-4 px-6 rounded-lg cursor-pointer hover:bg-blue-800 transition-colors">
                {inputFile ? inputFile.name : "Choose a .h5 or image file"}
              </div>
              <input
                type="file"
                accept=".h5,image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-4 rounded-lg font-semibold text-white transition-colors ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {loading ? "Processing..." : "Submit"}
          </button>

          {previewImage && (
            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-2">Uploaded Image Preview</h3>
              <img
                src={previewImage}
                alt="Preview"
                className="w-full rounded-lg shadow-md"
              />
            </div>
          )}

          {(images.input || images.denoised || images.segmented) && (
            <div className="mt-10 space-y-8">
              {images.input && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Input Image</h3>
                  <img
                    src={images.input}
                    alt="Input"
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              )}

              {images.denoised && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Denoised Image</h3>
                  <img
                    src={images.denoised}
                    alt="Denoised"
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              )}

              {images.segmented && (
                <div>
                  <h3 className="text-xl font-semibold mb-2">Segmented Image</h3>
                  <img
                    src={images.segmented}
                    alt="Segmented"
                    className="w-full rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Demo;
