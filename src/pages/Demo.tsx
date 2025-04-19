import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Demo = () => {
  const [inputFile, setInputFile] = useState<File | null>(null);
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

    if (isH5 || isImage) {
      setInputFile(file);
    } else {
      toast.error("Please upload a valid .h5 or image file.");
      setInputFile(null);
    }
  };

  const handleSubmit = async () => {
    if (!inputFile) {
      toast.error("Please select a .h5 or image file.");
      return;
    }

    setLoading(true);
    setImages({});
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

  const handleDownload = (base64Url: string | undefined, name: string) => {
    if (!base64Url) return;
    const a = document.createElement("a");
    a.href = base64Url;
    a.download = `${name}.png`;
    a.click();
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50 font-sans">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-900">
          Seismic Image Denoising & Fault Segmentation
        </h1>

        {/* Upload and Submit Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
          <div className="flex flex-col items-center gap-3">
            <label className="inline-block">
              <div className="bg-blue-700 text-white text-sm px-4 py-2 rounded-md cursor-pointer hover:bg-blue-800 transition">
                {inputFile ? inputFile.name : "Choose File"}
              </div>
              <input
                type="file"
                accept=".h5,image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`text-sm px-4 py-2 rounded-md font-semibold text-white transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700"
              }`}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center my-6">
            <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        )}

        {/* Processed Image Section */}
        {!loading && (images.input || images.denoised || images.segmented) && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">
              Processed Results
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Input Image */}
              <div className="flex flex-col justify-between items-center">
                <div className="text-center">
                  <h3 className="text-md font-medium mb-2 text-gray-700">
                    Input Image
                  </h3>
                  {images.input ? (
                    <img
                      src={images.input}
                      alt="Input"
                      className="rounded shadow-md max-h-48 object-contain"
                    />
                  ) : (
                    <div className="h-48 w-full bg-gray-200 rounded flex items-center justify-center text-gray-400">
                      Not Available
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleDownload(images.input, "input_image")}
                  disabled={!images.input}
                  className="mt-4 text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md disabled:opacity-50"
                >
                  Download
                </button>
              </div>

              {/* Denoised Image */}
              <div className="flex flex-col justify-between items-center">
                <div className="text-center">
                  <h3 className="text-md font-medium mb-2 text-gray-700">
                    Denoised Image
                  </h3>
                  {images.denoised ? (
                    <img
                      src={images.denoised}
                      alt="Denoised"
                      className="rounded shadow-md max-h-48 object-contain"
                    />
                  ) : (
                    <div className="h-48 w-full bg-gray-200 rounded flex items-center justify-center text-gray-400">
                      Not Available
                    </div>
                  )}
                </div>
                <button
                  onClick={() =>
                    handleDownload(images.denoised, "denoised_image")
                  }
                  disabled={!images.denoised}
                  className="mt-4 text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md disabled:opacity-50"
                >
                  Download
                </button>
              </div>

              {/* Segmented Image */}
              <div className="flex flex-col justify-between items-center">
                <div className="text-center">
                  <h3 className="text-md font-medium mb-2 text-gray-700">
                    Fault Segmented Image
                  </h3>
                  {images.segmented ? (
                    <img
                      src={images.segmented}
                      alt="Segmented"
                      className="rounded shadow-md max-h-48 object-contain"
                    />
                  ) : (
                    <div className="h-48 w-full bg-gray-200 rounded flex items-center justify-center text-gray-400">
                      Not Available
                    </div>
                  )}
                </div>
                <button
                  onClick={() =>
                    handleDownload(images.segmented, "segmented_image")
                  }
                  disabled={!images.segmented}
                  className="mt-4 text-sm text-white bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded-md disabled:opacity-50"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Demo;
